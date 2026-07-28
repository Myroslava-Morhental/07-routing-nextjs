import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

const PER_PAGE = 12;
const page: number = 1;
const search: string = '';

interface Props {
  params: Promise<{ slug: string[] }>;
}

async function Notes({ params }: Props) {
  const { slug } = await params;
  const selectedTag = slug[0];
  const tag = selectedTag === 'all' ? undefined : selectedTag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', page, search, PER_PAGE, tag],
    queryFn: () => fetchNotes(page, search, PER_PAGE, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? 'all'} tag={tag} />
    </HydrationBoundary>
  );
}

export default Notes;
