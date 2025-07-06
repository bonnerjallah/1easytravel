import { StyleSheet, useColorScheme, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, View, Text} from 'react-native'
import { Link, router } from 'expo-router';
import { useState } from 'react';

//Icons
import { Ionicons } from "@expo/vector-icons";

//Atom State Management
import {useSetAtom} from "jotai"
import {userAtoms} from "../../atoms/userAtoms"
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

import OAuth from '../components/OAuth';

//Themed
import { Colors } from '../../constant/Colors'
import images from "../../constant/images"
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedTextInput from '../components/ThemedTextInput'
import Spacer from "../components/Spacer"
import ThemedButton from '../components/ThemedButton';



const Login = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

    const setUser = useSetAtom(userAtoms)

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const [loading, setLoading] = useState(false)
    const [errMsg, setErrMsg] = useState("")


    const handleSignIn = async () => {
        setLoading(true)

        if (!email || !pwd) {
            setErrMsg("Please enter both email and password");
            return;
        }
        
        try {

            const response = await signInWithEmailAndPassword(auth, email, pwd)
            const user = response.user

            setUser(user)
            setEmail("")
            setPwd("")

            router.replace("/Home")
            
        } catch (error) {
            console.log("Firebase error:", error); // 👈 Add this

            const friendlyMessages = {
                "auth/email-already-in-use": "Email is already in use.",
                "auth/invalid-email": "Invalid email address.",
                "auth/weak-password": "Password should be at least 6 characters.",
                "auth/invalid-credential": "Incorrect email or password.",
            };

            setErrMsg(friendlyMessages[error.code] || "Something went wrong")

        } finally {
            setLoading(false)
            setTimeout(() => setErrMsg(""), 3000)
           
        }
    }


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <ThemedView style = {styles.container} safe = {true}>
            <Image source = {images.login} style = {{width: "100%", height: 300, alignSelf: "center"}}  />

            <ThemedText variant='heading'>
                Sign In
            </ThemedText>

            {errMsg && (<Text style={{color: "red"}}>{errMsg}</Text>)}

            <Spacer height={20} />

            <ThemedTextInput
                placeholder='Email Address' 
                style={{ backgroundColor: themed.inputBackground,}}
                keyboardType = "email-address"
                onChangeText = {setEmail}
                value = {email}
            >
                <Ionicons 
                    name='mail-outline'
                    size={25} 
                />
            </ThemedTextInput>

            <Spacer height={20} />

            <ThemedTextInput
                placeholder = "Password"
                style={{ backgroundColor: themed.inputBackground,}}
                secureTextEntry
                onChangeText = {setPwd}
                value = {pwd}
            >
                <Ionicons 
                    name= "lock-closed-outline"
                    size={25}
                />
            </ThemedTextInput>

            <Link href="/(auth)/(forgotPwd)/ResetRequest" asChild>
                <TouchableOpacity>
                    <ThemedText 
                    style={styles.forgetTextStyle}
                    variant='boldItalic'
                >
                        Forgot Password
                    </ThemedText>
                </TouchableOpacity>
            </Link>
            
            <Spacer height={30} />

            <ThemedButton style={{justifyContent:"center", alignItems:"center"}} onPress={handleSignIn}>
                <ThemedText style = {[styles.textStyle, {color: themed.buttontitle}]} variant="title">SIGN IN</ThemedText>
            </ThemedButton>

            <Spacer height={10} />

            <View>
                <View style = {styles.googleContainer}>
                    <View style = {{height: 3, width:"30%", backgroundColor: "black"}}></View>
                    <Spacer height={0} width = "5"/>
                    <ThemedText variant = "body">Or Continue with</ThemedText>
                    <Spacer height={0} width='5'/>
                    <View style = {{height: 3, width:"30%", backgroundColor: "black"}}></View>
                </View>

                <Spacer height={40} />

                <View >
                    <OAuth />
                </View>
            </View>

            <ThemedText title = {true} style={{alignSelf: "center", marginTop: 50}}> 
                Don't have an account?

                <Spacer width= "10" height={0} /> 

                <Link href="/Register">
                    <ThemedText  variant='subtitle'>Sign Up</ThemedText>
                </Link>
            </ThemedText>

            


        </ThemedView>
    </TouchableWithoutFeedback>

  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    inputStyle:{
        flexDirection: "row",
        justifyContent: "space-around"
    },

    forgetTextStyle:{
        fontWeight: "bold",
        position: "absolute",
        right: 5,
        bottom: -25,
    },

    textStyle:{
        fontSize: 20,
    },

    googleContainer:{
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center"
    }
})