import { create } from "zustand";

const useKorisnikSkladiste = create((set) => ({
  korisnik: null,
  tipKorisnika: null,
  setKorisnik: (korisnik) => set({ korisnik }),
  setTipKorisnika: (tipKorisnika) => set({ tipKorisnika }),
  clearKorisnik: () => set({ korisnik: null }),
}));

export default useKorisnikSkladiste;
