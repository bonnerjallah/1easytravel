import { useEffect, useState } from "react"
import { Redirect } from "expo-router"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebaseConfig"
import { useSetAtom } from "jotai"
import { userAtoms } from "../atoms/userAtoms"



const index = () => {

  const [loading, setLoading] = useState(true)
  const [seenOnboarding, setSeenOnBoarding] = useState(null)
  const setUser = useSetAtom(userAtoms)

  //Check if user seen onboarding
  useEffect(() => {
    const checkAuth = async () => {
      const seen = await AsyncStorage.getItem("seenOnboarding")
      setSeenOnBoarding(seen === "true")

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser({
            uid: user.uid,
            email: user.email
          })


        } else {
          setUser(null)
        }

        setLoading(false)
      })

      return unsubscribe
    }

    checkAuth()

  }, [])

  if(!seenOnboarding) return <Redirect href="/(onboarding)/Welcome" />
  if(!auth.currentUser) return <Redirect href="/(auth)/Login" />

  return <Redirect href="/Home" />


}

export default index

