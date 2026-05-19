import { create } from "zustand";
import { persist } from "zustand/middleware";

type Team = {
  id: string | null;
  name: string | null;
};

type TeamStore = {
  selectedTeam: Team;
  setSelectedTeam: (team: Team) => void;
  resetTeam: () => void;
};

export const useTeamStore = create<TeamStore>()(
  persist(
    (set) => ({
      selectedTeam: { id: null, name: null },

      setSelectedTeam: (team) => set({ selectedTeam: team }),

      resetTeam: () => set({ selectedTeam: { id: null, name: null } }),
    }),
    {
      name: "selectedTeam",
    }
  )
);
