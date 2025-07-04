
import { fetchNoteById } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from 'next';

// Параметри для компонента
type NoteDetailsProps = {
    params: { id: string };
};

// Генерація метаданих
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

    const baseUrl = ''; // Вкажіть правильний базовий URL

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

// Асинхронний компонент для завантаження даних
const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const { id } = params;
  const queryClient = new QueryClient();
  const parseId = Number(id);

  // Завантажуємо дані через React Query
  await queryClient.prefetchQuery({
    queryKey: ['note', parseId],
    queryFn: () => fetchNoteById(parseId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;


// import { fetchNoteById } from "@/lib/api";
// import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
// import NoteDetailsClient from "./NoteDetails.client";
// import { Metadata } from 'next';

// type NoteDetailsProps = {
//     note:{ id: string; title: string; content: string  };
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   const noteId = Number(params.id);

//   try {
//     const note = await fetchNoteById(noteId);

//     const title = `${note.title} – NoteHub`;
//     const description =
//       note.content.length > 150
//         ? note.content.slice(0, 147) + '...'
//         : note.content;

//     // const baseUrl = 'https://your-vercel-project.vercel.app';
//     const baseUrl = '';

//     return {
//       title,
//       description,
//       openGraph: {
//         title,
//         description,
//         url: `${baseUrl}/notes/${noteId}`,
//         images: [
//           {
//             url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
//             width: 1200,
//             height: 630,
//             alt: 'NoteHub Note Details',
//           },
//         ],
//       },
//     };
//   } catch {
//     return {
//       title: 'Note not found – NoteHub',
//       description: 'Note does not exist or failed to load.',
//     };
//   }
// }

// export async function getServerSideProps({ params }: { params: { id: string } }) {
//   const noteId = Number(params.id);
//   const note = await fetchNoteById(noteId);

//   return {
//     props: {
//       note,
//     },
//   };
// }

// const NoteDetails = ({ note }: NoteDetailsProps) => {
//     const queryClient = new QueryClient();
//     const parseId = Number(note.id);
//     queryClient.prefetchQuery({
//         queryKey: ['note',  parseId],
//         queryFn: () => fetchNoteById(parseId),
//     });

//     return (
//         <>
//             <HydrationBoundary state={dehydrate(queryClient)}>
//                 <NoteDetailsClient />
//             </HydrationBoundary>
//         </>
//     )
// };

// export default NoteDetails;