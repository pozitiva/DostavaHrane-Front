import { create } from "zustand";
import {
  izmeniAdresu,
  obrisiAdresu,
  vratiSveAdreseMusterije,
} from "../api/adresaApi";

const useAdresaSkladiste = create((set) => ({
  adrese: [],

  ucitajAdrese: async () => {
    try {
      const response = await vratiSveAdreseMusterije();
      set({ adrese: response });
    } catch (error) {
      console.error("Greška prilikom učitavanja jela:", error);
    }
  },

  izmeniAdresu: async (id, izmenjenaAdresa) => {
    try {
      await izmeniAdresu(id, izmenjenaAdresa);
      set((state) => ({
        adrese: state.adrese.map((adresa) =>
          adresa.id === id ? { ...adresa, ...izmenjenaAdresa } : adresa
        ),
      }));
    } catch (error) {
      console.error("Greška prilikom izmene adrese:", error);
    }
  },
}));

export default useAdresaSkladiste;
