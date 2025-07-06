import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Tags } from "../../types/note";

interface Draft {
  title: string;
  content: string;
  tag: Tags;
}

interface NoteStore {
  draft: Draft;
  setDraft: (partial: Partial<Draft>) => void;
  clearDraft: () => void;
}

enum Tag {
  Todo = "Todo",
  Work = "Work",
  Personal = "Personal",
  Meeting = "Meeting",
  Shopping = "Shopping",
}

const initialDraft: Draft = {
  title: "",
  content: "",
  tag: Tag.Todo,
};

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (partial) =>
        set((state) => ({
          draft: { ...state.draft, ...partial },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: "note-draft-storage",
    },
  ),
);