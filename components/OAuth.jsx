import { Pressable, TouchableOpacity, View, Image, StyleSheet } from 'react-native'



import facebook from "../assets/icons/facebook.png"
import apple from "../assets/icons/apple.png"
import google from "../assets/icons/google.png"



const OAuth = () => {

    const handleGoogleLogIn = () => {
        console.log("google button pressed")
    }

    const handleFacebookLogIn = () => {
        console.log("facebook button Pressed")
    }

    const handleAppleLogIn = () => {
        console.log("apple button pressed")
    }



  return (

    <View style = {{alignSelf: "center", flexDirection: "row", columnGap: 40}}>
        <TouchableOpacity onPress={handleGoogleLogIn}>
            <Image source={google} resizeMode='contain' style = {styles.socialImageStyle} />
        </TouchableOpacity>


        <TouchableOpacity onPress= {handleFacebookLogIn}>
            <Image source={facebook} resizeMode='contain' style = {styles.socialImageStyle} />
        </TouchableOpacity>


        <TouchableOpacity onPress={handleAppleLogIn} >
            <Image source={apple} resizeMode='contain' style = {styles.socialImageStyle} />
        </TouchableOpacity>
    </View>
    
  )
}

export default OAuth

const styles = StyleSheet.create({
    socialImageStyle:{
        width: 45,
        height: 45,
        
    }
})
