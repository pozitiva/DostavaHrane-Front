import { create } from "zustand";
//import JeloApi from "../api/jeloApi";
import {
  izmeniJelo,
  kreirajJelo,
  obrisiJelo,
  vratiJelo,
  vratiSvaJela,
} from "../api/jeloApi";

const useJeloSkladiste = create((set) => ({
  jela: [],

  ucitajJela: async () => {
    try {
      const response = await vratiSvaJela();
      set({ jela: response });
    } catch (error) {
      console.error("Greška prilikom učitavanja jela:", error);
    }
  },

  // vratiJelo: asyn c (jeloId) => {
  //   try {
  //     const odgovor = await vratiJelo(jeloId);
  //     set({ trenutnoJelo: odgovor });
  //   } catch (error) {
  //     console.error(
  //       `Greška prilikom dobijanja jela sa ID-jem ${jeloId}:`,
  //       error
  //     );
  //   }
  // },

  dodajJelo: async (novoJelo) => {
    try {
      console.log("USAO SAM U DODAVANJE");
      console.log(novoJelo);
      const response = await kreirajJelo(novoJelo);
      // set((state) => ({ jela: [...state.jela, response] }));
    } catch (error) {
      console.error("Greška prilikom dodavanja jela:", error);
    }
  },

  izmeniJelo: async (id, izmenjenoJelo) => {
    try {
      await izmeniJelo(id, izmenjenoJelo);
      set((state) => ({
        jela: state.jela.map((jelo) =>
          jelo.id === id ? { ...jelo, ...izmenjenoJelo } : jelo
        ),
      }));
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
