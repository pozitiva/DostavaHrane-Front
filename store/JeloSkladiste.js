import { create } from "zustand";

import {
  izmeniJelo,
  kreirajJelo,
  obrisiJelo,
  vratiSvaJelaRestorana,
} from "../api/jeloApi";

const useJeloSkladiste = create((set) => ({
  jela: [],

  ucitajJela: async () => {
    try {
      const response = await vratiSvaJelaRestorana();
      set({ jela: response });
    } catch (error) {
      console.error("Greška prilikom učitavanja jela:", error);
    }
  },

  dodajJelo: async (novoJelo) => {
    try {
      await kreirajJelo(novoJelo);
      // set((state) => ({ jela: [...state.jela, response] }));
    } catch (error) {
      console.error("Greška prilikom dodavanja jela:", error);
    }
  },

  izmeniJelo: async (izmenjenoJelo) => {
    try {
      console.log("uslo u skladiste");
      await izmeniJelo(izmenjenoJelo);
      // set((state) => ({
      //   jela: state.jela.map((jelo) =>
      //     jelo.id === id ? { ...jelo, ...izmenjenoJelo } : jelo
      //   ),
      // }));
    } catch (error) {
      console.error("Greška prilikom izmene jela:", error);
    }
  },

  obrisiJelo: async (id) => {
    try {
      await obrisiJelo(id);
      set((state) => ({
        jela: state.jela.filter((jelo) => jelo.id !== id),
      }));
    } catch (error) {
      console.error("Greška prilikom brisanja jela:", error);
    }
  },
}));

export default useJeloSkladiste;
