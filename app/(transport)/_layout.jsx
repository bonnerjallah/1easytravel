import { StatusBar } from "expo-status-bar";
import { Stack, router } from "expo-router";


//Firebase
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

export default () => {

    useEffect(() => {
        const unsub = getAuth().onAuthStateChanged((firebaseUser) => {
            if(!firebaseUser) router.replace("/Login")
        })
        unsub()
    }, [])
    
    return (
        <>
            <StatusBar style="auto"/>
            <Stack screenOptions={{headerShown: false, animation: "none"}}/>
        </>   
    )
   
}