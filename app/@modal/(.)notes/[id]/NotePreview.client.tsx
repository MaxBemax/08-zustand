'use client';

import Modal from '@/components/Modal/Modal';
import { fetchNoteById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import css from './NotePreview.module.css';

type NotePreviewClientProps = {
  noteId: string;
};

export default function NotePreviewClient({ noteId }: NotePreviewClientProps) {
  const router = useRouter();

  const handleClose = () => router.back();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', noteId],
    queryFn: () => fetchNoteById(noteId),
    enabled: !!noteId,
    refetchOnMount: false,
  });

  if (!noteId) return null;

  return (
    <Modal onClose={handleClose}>
      {isLoading && <p>Loading note...</p>}
      {error && <p>Something went wrong</p>}
      {note && (
        <div className={css.container}>
          <button className={css.backBtn} onClick={handleClose}>
            Close
          </button>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>Created at: {note.createdAt}</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
