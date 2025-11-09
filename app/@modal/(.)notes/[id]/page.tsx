import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import NotePreview from "./NotePreview.client";

type Props = {
  params: { id: string };
};

export default async function ModalNotePage({ params }: Props) {

  const { id } = await params;
  const client = new QueryClient();

  await client.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(client)}>
      <NotePreview id={id} />
    </HydrationBoundary>
  );
}