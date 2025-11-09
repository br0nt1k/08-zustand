import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notehub - Create Note",
  description: "Create a new note to organize your tasks.",
  openGraph: {
    title: "Notehub - Create Note",
    description: "Create a new note to organize your tasks.",
    url: "https://08-zustand-umber.vercel.app/notes/action/create",
    images: [
      {
        url: "https://08-zustand-umber.vercel.app/notes/action/create",
        width: 1200,
        height: 630,
        alt: "Create Note",
      },
    ],
  },
};

const CreateNote = () => {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
};

export default CreateNote;
