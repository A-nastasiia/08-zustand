import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { NotesHttpResponse } from '@/types/note';
import { Metadata } from 'next';

type NotesProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const tag = params.slug[0] === 'all' ? 'All notes' : params.slug[0];

  const title = `${tag} – NoteHub`;
  const description = `Browse notes filtered by tag: ${tag}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // url: `https://your-vercel-url.vercel.app/notes/filter/${params.slug.join('/')}`,
      url: ``,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub Filter',
        },
      ],
    },
  };
}

const Notes = async ({ params }: NotesProps) => {
  const queryClient = new QueryClient();
  const { slug } = await params;
  const initialQuery: string = '';
  const initialPage: number = 1;
  const initialPerPage: number = 12;
  const tag = slug[0] === 'all' ? '' : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery, initialPage, initialPerPage, tag],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: initialPerPage,
        searchQuery: initialQuery,
        tag,
      }),
  });

  const initialData = queryClient.getQueryData([
    'notes',
    initialQuery,
    initialPage,
    initialPerPage,
    tag,
  ]) as NotesHttpResponse;
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient
        query={initialQuery}
        page={initialPage}
        initialData={initialData}
        perPage={initialPerPage}
        tag={tag}
      />
    </HydrationBoundary>
  );
};

export default Notes;

export const dynamic = 'force-dynamic';