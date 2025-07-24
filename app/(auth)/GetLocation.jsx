import { StyleSheet, Image, View, useColorScheme, ImageBackground } from 'react-native'
import * as Location from 'expo-location';
import { router } from 'expo-router'


//UI COMPONENTS
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedButton from '../../components/ThemedButton'
import { Colors } from '../../constant/Colors'
import images from "../../constant/images"

//STATE MANAGEMENT
import { useSetAtom } from 'jotai'
import { userLocationAtom, userAddressAtom } from '../../atoms/locationAtoms';
import { useEffect } from 'react';

//env
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';



const GetLocation = () => {

    const setLocation = useSetAtom(userLocationAtom);
    

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

    const handleGetLocation = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if(status !== "granted") {
                Alert.alert("Permission Denied", "Location access is required to contuine")
                return
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High, // <— safer
            });
    
            const { latitude, longitude } = location.coords;
            const timestamp = new Date(location.timestamp).toISOString();
    
    
            setLocation({ latitude, longitude, timestamp });


            router.replace('/Home');

        } catch (error) {
            console.error('Location error:', error);
            Alert.alert("Error", "Could not fetch location")
        }
    }

    


    

  return (
    <ThemedView style = {styles.container} safe = {true}>
        <Spacer />
        <ThemedText variant="title" style={{ fontSize: 40 }}>Location</ThemedText>

        <Spacer />

        <Image source={images.locationImage} />

        <Spacer height={10}/>

        <ThemedText style={{fontSize: 25, textAlign: "center"}} variant='title'>Enable your location</ThemedText>

        <Spacer height={10}/>

        <ThemedText 
            style={{fontSize: 17, textAlign: "center"}} 
        >
            Set your location to pick you at the right spot and find nearest vehicles around you
        </ThemedText>


        <View style={{position: "absolute", bottom:"100", width:"100%"}}>
            <ThemedButton 
                style={{
                    width: "80%",
                    alignSelf: "center",
                }}
                onPress={handleGetLocation}
            >
                <ThemedText style={[styles.bttn, {color: themed.buttontitle }]}>GIVE MY LOCATION</ThemedText>
            </ThemedButton>

            <ThemedButton 
                style={{
                    width: "80%",
                    alignSelf: "center",
                    backgroundColor: themed.secondary
                }}
                onPress={() => router.replace("/Home")}

            >
                <ThemedText style={[styles.bttn, {color: themed.buttontitle }]}>SKIP FOR NOW</ThemedText>
            </ThemedButton>
        </View>
    </ThemedView>
  )
}

export default GetLocation

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },

    bttn:{
        textAlign: "center",
        fontSize: 20,
    }
})