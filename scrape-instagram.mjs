import axios from "axios";
import fs from "fs";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());
(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setViewport({ width: 1366, height: 768 });
  await page.goto("https://www.instagram.com/c3dig/");

  await page.waitForSelector("main article a");

  const posts = await page.evaluate(() => {
    return [...document.querySelectorAll("main article a")]
      .slice(0, 9)
      .map((link) => {
        return {
          href: link.href,
          image: link.querySelector("img").src,
        };
      });
  });

  for (const index in posts) {
    const post = posts[index];
    const imageBody = await page.goto(post.image);
    const image = await imageBody.buffer();
    await fs.promises.writeFile(
      `public/instagram-posts/instagram-${index}.jpg`,
      image
    );
    posts[index].image = `/instagram-posts/instagram-${index}.jpg`;
  }

  await fs.promises.writeFile(
    "app/home/instagram-posts.json",
    JSON.stringify(
      {
        date: new Date().toISOString(),
        posts,
      },
      undefined,
      2
    )
  );
  await browser.close();
})();
