import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import { NoteTag, noteTags } from '@/types/note';
import { Metadata } from 'next';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tagFromSlug = slug?.[0];

  const tag =
    tagFromSlug &&
    tagFromSlug !== 'All' &&
    noteTags.includes(tagFromSlug as NoteTag)
      ? (tagFromSlug as NoteTag)
      : undefined;

  return {
    title: tag ? `Notes filtered by ${tag}` : 'All Notes',
    description: tag
      ? `Browse notes filtered by the "${tag}" category.`
      : 'Browse all available notes.',
    openGraph: {
      title: tag ? `Notes filtered by ${tag}` : 'All Notes',
      description: tag
        ? `Discover all notes that match the "${tag}" filter.`
        : 'Discover all available notes without filters.',
      url: tag ? `/notes/filter/${tag}` : '/notes',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: tag ? `Notes filtered by ${tag}` : 'All Notes',
        },
      ],
    },
  };
}

export default async function FilteredNotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tagFromSlug = slug?.[0];

  const tag =
    tagFromSlug &&
    tagFromSlug !== 'All' &&
    noteTags.includes(tagFromSlug as NoteTag)
      ? (tagFromSlug as NoteTag)
      : undefined;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, 12, '', tag),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Notes tag={tag} />
    </HydrationBoundary>
  );
}
