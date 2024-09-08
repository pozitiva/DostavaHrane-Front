import { create } from "zustand";
import {
  izmeniAdresu,
  kreirajAdresu,
  vratiSveAdreseMusterije,
} from "../api/adresaApi";
import { napraviNarudzbinu } from "../api/narudzbinaApi";

const useKorisnikSkladiste = create((set) => ({
  korisnik: null,
  tipKorisnika: null,
  setKorisnik: (korisnik) => set({ korisnik }),
  setTipKorisnika: (tipKorisnika) => set({ tipKorisnika }),
  clearKorisnik: () => set({ korisnik: null }),
  dodajNarudzbinu: async (novaNarudzbina) => {
    try {
      await napraviNarudzbinu(novaNarudzbina);
      set((state) => ({
        korisnik: {
          ...state.korisnik, // Zadrži ostala polja korisnika
          narudzbine: [novaNarudzbina, ...state.korisnik.narudzbine], // Dodaj ili ažuriraj polje 'adrese'
        },
      }));
    } catch (error) {
      console.error("Greška prilikom kreiranja adrese:", error);
    }
  },
  dodajAdresu: async (novaAdresa) => {
    try {
      await kreirajAdresu(novaAdresa);
      const adreseKorisnika = await vratiSveAdreseMusterije();
      set((state) => ({
        korisnik: {
          ...state.korisnik, // Zadrži ostala polja korisnika
          adrese: adreseKorisnika, // Dodaj ili ažuriraj polje 'adrese'
        },
      }));
    } catch (error) {
      console.error("Greška prilikom kreiranja adrese:", error);
    }
  },
  izmeniAdresu: async (id, izmenjenaAdresa) => {
    try {
      await izmeniAdresu(id, izmenjenaAdresa);

      set((state) => ({
        korisnik: {
          ...state.korisnik,
          // Ažuriramo adresu u korisniku
          adrese: state.korisnik.adrese.map((adresa) =>
            adresa.id === id ? izmenjenaAdresa : adresa
          ),
        },
      }));
    } catch (error) {
      console.error("Greška prilikom izmene adrese:", error);
    }
  },
}));

export default useKorisnikSkladiste;
