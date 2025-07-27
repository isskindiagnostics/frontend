import { create } from "zustand";

type CommentStore = {
  comment: string;
  setComment: (val: string) => void;
};

export const useCommentStore = create<CommentStore>((set) => ({
  comment: "",
  setComment: (val) => set({ comment: val }),
}));
