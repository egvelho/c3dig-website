import "reflect-metadata";
import { useState, useEffect, Dispatch } from "react";
import { ContactForm } from "@egvelho/next-mui/components/contact-form";
import { plainToClass, ClassConstructor } from "class-transformer";
import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  Length,
  validate,
  ValidationError,
} from "class-validator";
import { Trim, Whitelist } from "class-sanitizer";
import appConfig from "app.json";
import { useContext, ContextProps } from "app/context";
import contactFormData from "./contact-form-data.json";

const texts = {
  nameLengthMessage(min: number, max: number) {
    return `O nome deve conter pelo menos ${min} letras e no máximo ${max} letras`;
  },
  messageLengthMessage(min: number, max: number) {
    return `A mensagem deve conter pelo menos ${min} letras e no máximo ${max} letras`;
  },
  isEmailMessage: "Este email é inválido",
  isPhoneNumberMessage: "Este número de celular é inválido",
  error: "Houve um erro ao enviar o formulário. Por favor, tente novamente.",
  success: "Mensagem enviada com sucesso.",
};

export type FormState<T> = {
  [key in keyof T]: {
    value: T[key];
    errors: string[];
    focus: boolean;
    touched: boolean;
  };
};

export type UseForm<T> = {
  state: T;
  form: FormState<T>;
  reset: () => Promise<FormState<T>>;
  setFormErrors: (errors?: ValidationError[]) => Promise<FormState<T>>;
  setFormState: Dispatch<Partial<T>>;
  setFormFocus: (key: keyof T) => void;
  setFormBlur: (key: keyof T) => void;
};

class ValidContactForm {
  @Trim()
  @IsString()
  @Length(2, 16, {
    message: ({ constraints: [min, max] }) => texts.nameLengthMessage(min, max),
  })
  name!: string;

  @Trim()
  @IsString()
  @Length(10, 800, {
    message: ({ constraints: [min, max] }) =>
      texts.messageLengthMessage(min, max),
  })
  message!: string;

  @IsEmail(undefined, {
    message: () => texts.isEmailMessage,
  })
  email!: string;

  @Whitelist(/\d+/g)
  @IsPhoneNumber("BR", {
    message: () => texts.isPhoneNumberMessage,
  })
  phoneNumber!: string;
}

type ContactFormState = UseForm<{
  name: string;
  message: string;
  email: string;
  phoneNumber: string;
}>;

export function ContactFormSection() {
  const { setContext } = useContext();
  const [loading, setLoading] = useState(false);

  const contactFormState = useForm(ValidContactForm, {
    name: "",
    message: "",
    email: "",
    phoneNumber: "",
  });

  return (
    <section id="contato">
      <NetlifyFakeForm />
      <ContactForm
        title={contactFormData.title}
        submitButtonLabel={contactFormData.label}
        titleColor={appConfig.backgroundColor}
        loading={loading}
        onSubmit={() => onSubmit({ contactFormState, setContext, setLoading })}
        background={appConfig.primaryColor}
        form={getForm(contactFormState)}
      />
      <style jsx global>{`
        #contato .MuiInputBase-root,
        #contato button {
          font-family: Roboto Mono !important;
        }

        #contato button {
          color: ${appConfig.primaryColor} !important;
          background-color: ${appConfig.backgroundColor} !important;
        }
      `}</style>
    </section>
  );
}

function NetlifyFakeForm() {
  return (
    <form
      name="Contato"
      data-netlify="true"
      style={{
        display: "none",
      }}
    >
      <input name="nome" />
      <input name="email" />
      <input name="celular" />
      <input name="mensagem" />
    </form>
  );
}

function mapToContactForm(
  contactFormState: ContactFormState,
  key: keyof ContactFormState["form"]
) {
  return {
    error:
      (contactFormState.form[key]?.touched &&
        !!contactFormState.form[key]?.errors?.length) ??
      false,
    helperText: contactFormState.form[key]?.touched
      ? contactFormState.form[key]?.errors[0] ?? ""
      : "",
    onBlur: () => contactFormState.setFormBlur(key),
    onChange: (value: unknown) =>
      contactFormState.setFormState({ [key]: value }),
    onFocus: () => contactFormState.setFormFocus(key),
    value: contactFormState.form[key]?.value ?? "",
  };
}

function getForm(contactFormState: ContactFormState) {
  return {
    name: {
      label: "Nome",
      ...mapToContactForm(contactFormState, "name"),
    },
    email: {
      label: "Email",
      ...mapToContactForm(contactFormState, "email"),
    },
    phoneNumber: {
      label: "Celular (opcional)",
      ...mapToContactForm(contactFormState, "phoneNumber"),
    },
    message: {
      label: "Mensagem",
      ...mapToContactForm(contactFormState, "message"),
    },
  };
}

async function onSubmit({
  contactFormState,
  setContext,
  setLoading,
}: {
  contactFormState: ContactFormState;
  setLoading: (loading: boolean) => void;
  setContext: (context: Partial<ContextProps>) => void;
}) {
  const { email, name, phoneNumber, message } =
    await contactFormState.setFormErrors();
  if (
    email.errors.length > 0 ||
    name.errors.length > 0 ||
    (phoneNumber.value.length > 0 && phoneNumber.errors.length > 0) ||
    message.errors.length > 0
  ) {
    return;
  }

  setLoading(true);

  const formData = new FormData();

  formData.append("form-name", "Contato");
  formData.append("nome", name.value);
  formData.append("email", email.value);
  formData.append("celular", phoneNumber.value);
  formData.append("mensagem", message.value);

  if (process.env.NODE_ENV !== "production") {
    setLoading(false);
    setContext({
      snackbarContent: {
        message: texts.success,
        severity: "success",
      },
    });

    await contactFormState.reset();
  } else {
    try {
      await fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData as any).toString(),
      });

      setLoading(false);
      setContext({
        snackbarContent: {
          message: texts.success,
          severity: "success",
        },
      });

      await contactFormState.reset();
    } catch {
      setLoading(false);
      setContext({
        snackbarContent: {
          message: texts.error,
          severity: "error",
        },
      });
    }
  }
}

async function mapStateToForm<T extends Object>(
  state: T,
  values: FormState<T>,
  classConstructor: ClassConstructor<T>,
  errors?: ValidationError[]
): Promise<FormState<T>> {
  if (errors === undefined) {
    errors = await validate(plainToClass(classConstructor, state));
  }
  const errors_ = errors.reduce(
    (stack, { property, constraints }) => ({
      ...stack,
      [property]: Object.values(constraints ?? {}),
    }),
    {} as Partial<{ [key in keyof T]: string[] }>
  );
  return Object.keys(state).reduce((stack, key) => {
    return {
      ...stack,
      [key]: {
        ...values[key as keyof T],
        value: state[key as keyof T],
        errors: errors_[key as keyof T] ?? [],
      },
    };
  }, {} as FormState<T>);
}

function getInitialForm<T>(state: T) {
  return Object.keys(state).reduce((stack, key) => {
    return {
      ...stack,
      [key]: {
        value: state[key as keyof T],
        focus: false,
        touched: false,
        errors: [],
      },
    };
  }, {} as FormState<T>);
}

export function useForm<T extends Object>(
  classConstructor: ClassConstructor<T>,
  initialState: T
): UseForm<T> {
  const [state, setState] = useState(initialState);
  const [form, setForm] = useState(getInitialForm(initialState));
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    mapStateToForm(state, form, classConstructor).then(setForm);
  }, []);

  useEffect(() => {
    if (resetFlag === true) {
      setResetFlag(false);
    } else {
      mapStateToForm(state, form, classConstructor).then(setForm);
    }
  }, [state]);

  return {
    state,
    form,
    async reset() {
      const initialForm = Object.keys(form).reduce(
        (stack, key) => ({
          ...stack,
          [key]: {
            touched: false,
            focus: false,
            value: initialState[key as keyof T],
            errors: [],
          },
        }),
        {} as FormState<T>
      );

      const nextForm = await mapStateToForm(
        initialState,
        initialForm,
        classConstructor,
        []
      );

      setResetFlag(true);
      setState(initialState);
      setForm(nextForm);
      return nextForm;
    },
    async setFormErrors(errors) {
      const touchedValues = Object.keys(form).reduce(
        (stack, key) => ({
          ...stack,
          [key]: { ...form[key as keyof T], touched: true },
        }),
        {} as FormState<T>
      );

      const values = await mapStateToForm(
        state,
        touchedValues,
        classConstructor,
        errors
      );
      setForm(values);
      return values;
    },
    setFormState: (nextState) => setState({ ...state, ...nextState }),
    setFormFocus: (key) =>
      setForm({ ...form, [key]: { ...form[key], focus: true } }),
    setFormBlur: (key) =>
      setForm({
        ...form,
        [key]: { ...form[key], focus: false, touched: true },
      }),
  };
}
