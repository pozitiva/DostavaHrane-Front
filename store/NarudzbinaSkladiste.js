import { create } from "zustand";
import {
  izmeniNarudzbinu,
  napraviNarudzbinu,
  vratiNarudzbinuoId,
  vratiSveNarudzbine,
} from "../api/narudzbinaApi";

const useNarudzbinaSkladiste = create((set, get) => ({
  narudzbine: [],
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
      const izmenjenaNarudzbina = await izmeniNarudzbinu(narudzbinaId);
      const narudzbine = get().narudzbine.map((n) =>
        n.id === narudzbinaId ? izmenjenaNarudzbina : n
      );
      set({ narudzbine });
      if (get().trenutnaNarudzbina?.id === narudzbinaId) {
        set({ trenutnaNarudzbina: izmenjenaNarudzbina });
      }
    } catch (error) {
      console.error("Greška prilikom izmene narudžbine:", error);
    }
  },

  setTrenutnaNarudzbina: (narudzbina) =>
    set({ trenutnaNarudzbina: narudzbina }),
}));

export default useNarudzbinaSkladiste;
