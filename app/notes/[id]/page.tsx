
// import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

// import { fetchNoteById} from '@/lib/api';
// import NoteDetailsClient from './NoteDetails.client';


// type NotesPageProps = {
//   params: Promise<{ id: string }>;
// }

// export default async function NotesPage({
//   params,
// }: NotesPageProps) {
//   const queryClient = new QueryClient();
//   const { id } = await params;

//   await queryClient.prefetchQuery({
//     queryKey: ["note", id],
//     queryFn: () => fetchNoteById(id),
//   });
// return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//         <NoteDetailsClient/>
//     </HydrationBoundary>
// )
// }
  
import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";

interface NoteDetailsPageProps {
  params: Promise<{ id: string }>;
}
export default async function NoteDetailsPage({
  params,
}: NoteDetailsPageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}