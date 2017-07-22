import { AsyncStorage } from 'react-native';

export const genKey = (key) => `@VozlivingStore:${key}`;

export const saveToStore = (key, value) => {
    const storeKey = genKey(key);
    if (typeof(value) === 'object') {
        return AsyncStorage.setItem(storeKey, JSON.stringify(value));
    }
    return AsyncStorage.setItem(storeKey, value);
}

export async function getFromStore(key) {
    const value = await AsyncStorage.getItem(genKey(key));
    try {
        return JSON.parse(value);
    } catch (error) {
        return value;
    }
}