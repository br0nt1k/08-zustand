import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

type NoteDetailsProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: NoteDetailsProps): Promise<Metadata> {
  const { id } = await params;
  const noteCategory = await fetchNoteById(Number(id));

  return {
    title: `Деталі нотатки: ${noteCategory.title}`,
    description: `Деталі нотатки: ${noteCategory.title}`,
    openGraph: {
      title: `Нотатка - ${noteCategory.title}`,
      description: `Деталі нотатки: ${noteCategory.title}.`,
      url: `https://notehub.app/notes/${id}`,
      images: [{ url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg" }],
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(Number(id)),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;