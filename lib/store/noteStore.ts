import { CreateNoteFields, NoteTag } from '@/types/note';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NewNoteDraft {
  title: string;
  content: string;
  tag: NoteTag;
}

const initialDraft: CreateNoteFields = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteDraftStore = {
  draft: CreateNoteFields;
  setDraft: (note: CreateNoteFields) => void;
  clearDraft: () => void;
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    set => ({
      draft: initialDraft,
      setDraft: note => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: 'note-draft',
      partialize: state => ({ draft: state.draft }),
    }
  )
);
