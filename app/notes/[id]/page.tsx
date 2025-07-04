import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from 'next';

type NoteDetailsProps = {
    params:{ id: string };
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const noteId = Number(params.id);

  try {
    const note = await fetchNoteById(noteId);

    const title = `${note.title} – NoteHub`;
    const description =
      note.content.length > 150
        ? note.content.slice(0, 147) + '...'
        : note.content;

    // const baseUrl = 'https://your-vercel-project.vercel.app';
    const baseUrl = '';

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `${baseUrl}/notes/${noteId}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub Note Details',
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Note not found – NoteHub',
      description: 'Note does not exist or failed to load.',
    };
  }
}

const NoteDetails = async ({ params }: NoteDetailsProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();
    const parseId = Number(id);
    queryClient.prefetchQuery({
        queryKey: ['note', parseId],
        queryFn: () => fetchNoteById(parseId),
    });

    return (
        <>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NoteDetailsClient />
            </HydrationBoundary>
        </>
    )
};

export default NoteDetails;