import css from "./Home.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Сторінку не знайдено",
  description: "Сторінку, яку ви шукаєте, не існує",
  openGraph: {
    title: "Сторінку не знайдено",
    description: "Сторінку, яку ви шукаєте, не існує",
    url: "https://notehub.app/not-found",
    images: [
      {
        url: "/page-note-found.jpeg",
        width: 1200,
        height: 630,
        alt: "page not found",
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFound;
