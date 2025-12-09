import * as SecureStore from 'expo-secure-store';

const KEY_STORAGE = 'access_key';

export async function saveKey(key: string): Promise<void> {
  await SecureStore.setItemAsync(KEY_STORAGE, key);
}

export async function getKey(): Promise<string | null> {
  return await SecureStore.getItemAsync(KEY_STORAGE);
}

export async function removeKey(): Promise<void> {
  await SecureStore.deleteItemAsync(KEY_STORAGE);
}