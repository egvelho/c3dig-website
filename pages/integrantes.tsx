import { pages } from "app/url";

export { Members as default } from "app/members/members";

export const priority = pages.members.priority(0.8);
export const disallow = pages.members.disallow(false);
export const changeFrequency = pages.members.changeFrequency("weekly");
export const getLastModificationDate = pages.members.getLastModificationDate(
  async () => new Date()
);
