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
  const noteCategory = await fetchNoteById(Number((await params).id));

  return {
    title: `Деталі нотатки: ${noteCategory.title}`,
    description: `Деталі нотатки: ${noteCategory.title}`,
    openGraph: {
      title: `Нотатка - ${noteCategory.title}`,
      description: `Деталі нотатки: ${noteCategory.title}.`,
      url: `https://notehub.app/notes/${(await params).id}`,
      images: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
    },
  };
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const queryClient = new QueryClient();
  const response = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", response.id],
    queryFn: () => fetchNoteById(Number(response.id)),
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
