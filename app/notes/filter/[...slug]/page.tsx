import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import FilterPageClient from "./Notes.client";


interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
  
}


export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const query = "";
  const currentPage = 1;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", { search: "", tag: category, page: 1 }],
    queryFn: () => fetchNotes({
        page: currentPage,
        search: query,
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