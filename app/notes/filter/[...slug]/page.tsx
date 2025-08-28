import { fetchNotes } from '@/lib/api';
import Notes from './Notes.client';
import { NoteTag, noteTags } from '@/types/note';

interface NotesPageProps {
  params: Promise<{ slug?: string[] }>;
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

  const initialData = await fetchNotes(1, 10, '', tag);

  return <Notes initialData={initialData} tag={tag} />;
}
