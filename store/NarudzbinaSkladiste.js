import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import {
  izmeniNarudzbinu as izmeniNarudzbinuOnline,
  vratiSveNarudzbine as vratiSveNarudzbineSaServera,
} from "../api/narudzbinaApi";
const OFFLINE_KEY = "offlineNarudzbine";

export const useNarudzbinaStore = create((set, get) => ({
  narudzbine: [],
  isLoading: true,
  pendingChanges: {},
  isConnected: true,
  syncedJustNow: [],
  clearJustSynced: () => set({ syncedJustNow: [] }),

  ucitajNarudzbine: async () => {
    try {
      const data = await vratiSveNarudzbineSaServera();
      set({ narudzbine: data, isLoading: false });
    } catch (err) {
      console.log("Greška pri učitavanju narudžbina:", err);
      set({ isLoading: false });
    }
  },

  izmeniNarudzbinu: async (novaNarudzbina) => {
    if (get().isConnected) {
      try {
        set((state) => ({
          narudzbine: state.narudzbine.map((n) =>
            n.id === novaNarudzbina.id ? novaNarudzbina : n
          ),
        }));

        await izmeniNarudzbinuOnline(novaNarudzbina);
        get().ucitajNarudzbine();
        return "online";
      } catch (err) {
        console.log("Greška pri online izmeni, čuvam za kasnije:", err);
        await get().sacuvajNarudzbinuOffline(novaNarudzbina);
        return "offline";
      }
    } else {
      await get().sacuvajNarudzbinuOffline(novaNarudzbina);
      return "offline";
    }
  },

  sacuvajNarudzbinuOffline: async (novaNarudzbina) => {
    try {
      const offlineNarudzbineJSON = await AsyncStorage.getItem(OFFLINE_KEY);
      let offlineNarudzbine = offlineNarudzbineJSON
        ? JSON.parse(offlineNarudzbineJSON)
        : [];

      const index = offlineNarudzbine.findIndex(
        (n) => n.id === novaNarudzbina.id
      );
      if (index !== -1) {
        offlineNarudzbine[index] = novaNarudzbina;
      } else {
        offlineNarudzbine.push(novaNarudzbina);
      }

      await AsyncStorage.setItem(
        OFFLINE_KEY,
        JSON.stringify(offlineNarudzbine)
      );

      set((state) => ({
        pendingChanges: {
          ...state.pendingChanges,
          [novaNarudzbina.id]: novaNarudzbina.status,
        },
      }));
      console.log("Promena za narudžbinu sačuvana offline.");
    } catch (err) {
      console.log("Greška pri offline čuvanju:", err);
    }
  },

  sinhronizujOfflinePromene: async () => {
    try {
      const offlineNarudzbineJSON = await AsyncStorage.getItem(OFFLINE_KEY);
      if (!offlineNarudzbineJSON) return;

      const offlineNarudzbine = JSON.parse(offlineNarudzbineJSON);
      if (offlineNarudzbine.length === 0) return;

      set({ pendingChanges: {} });
      await Promise.all(
        offlineNarudzbine.map((nar) => izmeniNarudzbinuOnline(nar))
      );
      await AsyncStorage.removeItem(OFFLINE_KEY);
      await get().ucitajNarudzbine();
      set({ syncedJustNow: offlineNarudzbine });
    } catch (err) {
      console.log("Greška pri sinhronizaciji:", err);
    }
  },
}));

NetInfo.addEventListener((state) => {
  const isOnline = !!(state.isConnected && state.isInternetReachable);
  const storeState = useNarudzbinaStore.getState();

  if (isOnline !== storeState.isConnected) {
    useNarudzbinaStore.setState({ isConnected: isOnline });
    console.log(
      `Konekcija promenjena, sada je: ${isOnline ? "ONLINE" : "OFFLINE"}`
    );
  }

  if (isOnline && !storeState.isConnected) {
    console.log("Povezan na internet, pokrećem sinhronizaciju...");
    storeState.sinhronizujOfflinePromene();
  }
});

async function initialLoad() {
  console.log("Pokrećem inicijalno učitavanje podataka...");
  const store = useNarudzbinaStore.getState();
  await store.sinhronizujOfflinePromene();
  await store.ucitajNarudzbine();
}

initialLoad();
