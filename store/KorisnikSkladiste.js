import { create } from "zustand";

const useKorisnikSkladiste = create((set) => ({
  korisnik: null,
  setKorisnik: (korisnik) => set({ korisnik }),
  clearKorisnik: () => set({ korisnik: null }),
}));

export default useKorisnikSkladiste;
