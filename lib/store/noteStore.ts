import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

export type Note = {
  title: string;
  content: string;
  tag: 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';
};

type NoteStore = {
  draft: Note;
  setDraft: (note: Partial<Note>) => void;
  clearDraft: () => void;
};

const initialDraft: Note = {
  title: '',
  content: '',
  tag: 'Todo',
};

export const useNoteStore = create<NoteStore>((set) => ({
  draft: initialDraft,
  setDraft: (note) =>
    set((state) => ({
      draft: { ...state.draft, ...note },
    })),
  clearDraft: () => set({ draft: initialDraft }),
}));
