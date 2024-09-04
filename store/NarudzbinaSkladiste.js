import { create } from "zustand";
import {
  izmeniNarudzbinu,
  napraviNarudzbinu,
  vratiNarudzbinuoId,
  vratiSveNarudzbine,
} from "../api/narudzbinaApi";

const useNarudzbinaSkladiste = create((set) => ({
  narudzbine: [],
  trenutnaNarudzbina: null,

  ucitajNarudzbine: async () => {
    try {
      const response = await vratiSveNarudzbine();

      set({ narudzbine: response });
    } catch (error) {
      console.error("Greška prilikom učitavanja jela:", error);
    }
  },

  ucitajNarudzbinuPoId: async (narudzbinaId) => {
    try {
      const response = await vratiNarudzbinuoId(narudzbinaId);
      set({ trenutnaNarudzbina: response });
    } catch (error) {
      console.error("Greška prilikom učitavanja narudžbine:", error);
    }
  },

  dodajNarudzbinu: async (novaNarudzbina) => {
    try {
      await napraviNarudzbinu(novaNarudzbina);
    } catch (error) {
      console.error("Greška prilikom dodavanja narudzbine:", error);
    }
  },

  izmeniNarudzbinu: async (narudzbinaId) => {
    try {
      await izmeniNarudzbinu(narudzbinaId);
    } catch (error) {
      console.error("Greška prilikom izmene jela:", error);
    }
  },
}));

export default useNarudzbinaSkladiste;
