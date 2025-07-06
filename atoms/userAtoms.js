import {atom} from "jotai"
import {atomWithStorage} from "jotai/utils"
import AsyncStorage from "@react-native-async-storage/async-storage"



export const userAtoms = atomWithStorage("authUser", null, {
    getItem: async (key) => {
        const value = await AsyncStorage.getItem(key)
        return value ? JSON.parse(value) : null
    },

    setItem : async (key, value) => {
        await AsyncStorage.setItem(key, JSON.stringify(value))
    },

    removeItem: async (key) => {
        await AsyncStorage.removeItem(key)
    }
})