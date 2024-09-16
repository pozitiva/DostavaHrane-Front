import { create } from "zustand";
import {
  izmeniAdresu,
  kreirajAdresu,
  vratiSveAdreseMusterije,
} from "../api/adresaApi";
import { napraviNarudzbinu } from "../api/narudzbinaApi";
import { izmeniKorisnika } from "../api/musterijaApi";

const useKorisnikSkladiste = create((set) => ({
  korisnik: null,
  tipKorisnika: null,
  setKorisnik: (korisnik) => set({ korisnik }),
  setTipKorisnika: (tipKorisnika) => set({ tipKorisnika }),
  dodajNarudzbinu: async (novaNarudzbina) => {
    try {
      await napraviNarudzbinu(novaNarudzbina);
      set((state) => ({
        korisnik: {
          ...state.korisnik,
          narudzbine: [novaNarudzbina, ...state.korisnik.narudzbine],
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
          ...state.korisnik,
          adrese: adreseKorisnika,
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
          adrese: state.korisnik.adrese.map((adresa) =>
            adresa.id === id ? izmenjenaAdresa : adresa
          ),
        },
      }));
    } catch (error) {
      console.error("Greška prilikom izmene adrese:", error);
    }
  },
  izmeniKorisnika: async (izmenjeniKorisnik) => {
    try {
      await izmeniKorisnika(izmenjeniKorisnik);
      set((state) => ({
        korisnik: {
          ...state.korisnik,
          ime: izmenjeniKorisnik.ime,
          brojTelefona: izmenjeniKorisnik.brojTelefona,
        },
      }));
    } catch (error) {
      console.error("Greška prilikom izmene korisnika:", error);
    }
  },
}));

export default useKorisnikSkladiste;
