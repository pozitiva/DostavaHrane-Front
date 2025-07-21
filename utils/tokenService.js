import * as SecureStore from "expo-secure-store";

export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync("jwt_token", token);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync("jwt_token");
    return token;
  } catch (error) {
    console.error("Error retrieving the token", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync("jwt_token");
  } catch (error) {
    console.error("Error deleting the token", error);
  }
};
