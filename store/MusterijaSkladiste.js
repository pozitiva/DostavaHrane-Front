import { create } from "zustand";

const useMusterijaSkladiste = create((set) => ({
  korisnik: null,
  setKorisnik: (korisnik) => set({ korisnik }),
  clearKorisnik: () => set({ korisnik: null }),
}));

export default useMusterijaSkladiste;
