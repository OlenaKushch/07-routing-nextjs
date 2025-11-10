import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FilterPageClient from "./Notes.client";
import { NoteTag } from "@/types/note";


interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
  
}


export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const filtered = slug?.[0];
  const category: NoteTag | undefined =
    filtered && filtered !== "all" ? (filtered as NoteTag) : undefined;

 

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () => fetchNotes({
        page: 1,
        search: '',
        perPage: 12,
        tag: category,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FilterPageClient category={category} />
    </HydrationBoundary>
  );
}