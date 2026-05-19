import { create } from "zustand";

interface ProjectRowViewStateProps {
  activeRow: any;
  setActiveRow: (newData: any) => void;
}

export const ProjectRowViewState = create<ProjectRowViewStateProps>((set) => ({
  activeRow: null,
  setActiveRow: (newData) => set({ activeRow: newData }),
}));
