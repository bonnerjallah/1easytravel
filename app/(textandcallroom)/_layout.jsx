import { StatusBar } from "expo-status-bar";
import { Stack, router } from "expo-router";
import { useEffect } from "react";

//Firebase
import { getAuth } from "firebase/auth";

export default () => {

    useEffect(() => {
        const unsub = getAuth().onAuthStateChanged((firebaseUser) => {
            if(!firebaseUser) router.replace("/Login")
        })
        return unsub
    }, [])

    return (
        <>
            <StatusBar style="auto" />
            <Stack screenOptions={{headerShown: false, animation: "none"}} />
        </>
    )
}