import { StyleSheet, Text, View, Image, TouchableOpacity, useColorScheme, Linking } from 'react-native'
import * as Location from 'expo-location';
import { router } from 'expo-router';


// UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from "../../components/Spacer"
import { Colors } from '../../constant/Colors'

// Components
import RideLayout from '../../components/RideLayout'
import { Ionicons } from '@expo/vector-icons'

//State Management
import { useAtomValue, useSetAtom } from 'jotai'
import { userTripsAtom } from '../../atoms/tripsAtoms'
import { destinationText } from '../../atoms/destinationAtoms';
import { userPickUpLocation } from '../../atoms/locationAtoms';
import { selectedDriverAtom } from '../../atoms/selectedDriverAtoms'
import { userLocationAtom } from '../../atoms/locationAtoms';
import {userAtoms} from "../../atoms/userAtoms"



//LIB
import {getDistance} from "../../lib/map"
import { getETA } from '../../lib/map'
import { useEffect, useState } from 'react'

// API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';



const RideTracker = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light   

    const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;

    const tripDetails = useAtomValue(userTripsAtom)
    const destinationInText = useAtomValue(destinationText)
    const pickUpLocationText = useAtomValue(userPickUpLocation)
    const yourDriver = useAtomValue(selectedDriverAtom)
    const userData = useAtomValue(userAtoms)
    const setUserLocation = useSetAtom(userLocationAtom)

    const [driverEta, setDriverEta] = useState(null)
    const [tripEta, setTripEta] = useState(null)


    const fullDestinationAddress = destinationInText
    const destinationAddressParts = fullDestinationAddress.split(",")
    const shortDestinationAddress = destinationAddressParts[0]


    const getDriverEta = async () => {
        if(tripDetails.pickup && yourDriver) {
            const eta = await getETA(
            { lat: yourDriver.latitude, lon: yourDriver.longitude },
            { lat: tripDetails.pickup.lat, lon: tripDetails.pickup.lon },
            apiKey
            );
            setDriverEta(eta);
        }
    };

    useEffect(() => {
        getDriverEta();
    }, [tripDetails, yourDriver]);

    //fire base use
    // useEffect(() => {
    // const unsubscribe = firestore
    //     .collection('drivers')
    //     .doc(driverId)
    //     .onSnapshot(doc => {
    //     const data = doc.data();
    //     if (data?.eta) {
    //         setDriverEta(data.eta);
    //     }
    //     });

    //     return () => unsubscribe();
    // }, [driverId]);

    
   
    //Track user Location Movement to get the trip ETA 
    useEffect(() => {
        let subscriber;

        const startTracking = async () => {

            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') return;

            subscriber = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                async (location) => {
                    const newLocation = {
                        lat: location.coords.latitude,
                        lon: location.coords.longitude,
                    };

                    setUserLocation(newLocation);

                    if (tripDetails?.dropoff) {
                        // Use device location or fallback to pickup
                        const distanceInKm = getDistance(
                            newLocation.lat,
                            newLocation.lon,
                            tripDetails.dropoff.lat,
                            tripDetails.dropoff.lon
                        )

                        const origin = distanceInKm > 300 ? tripDetails.pickup : newLocation.coords
                        
                        try {
                            const eta = await getETA(
                                {lat: origin.lat, lon: origin.lon},
                                {lat: tripDetails.dropoff.lat, lon: tripDetails.dropoff.lon},
                                apiKey
                            );
                            setTripEta(eta);
                        } catch (err) {
                            console.error("ETA fetch failed", err);
                        }
                    }
                }
            );
        };

        startTracking();

        return () => {
            if (subscriber) subscriber.remove();
        };
    }, [tripDetails]);

    console.log("your driver", yourDriver)




    return (
        <RideLayout snapPoints={["16%"]} index={0}>
            <ThemedText variant='title' title style={{marginLeft: 10}}>
                Active Ride
            </ThemedText>
            <ThemedView style={styles.container}>

               

                {/* ETA Section */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <ThemedText style={{ fontSize: 16, color:"#0e6ba8"}}>🚗 ETA to pickup: </ThemedText>
                    <ThemedText style={{ fontWeight: 'bold', fontSize: 16, marginTop: 5 }}>{driverEta?.durationText}</ThemedText>
                </View>
                <Spacer height={20} />


                <View style={styles.row}>
                    <View style={styles.row}>
                        <Ionicons name="location-outline" size={20} color={themed.tabIconColor}/>
                        <Text style={{fontSize: 16, color:"#0e6ba8"}}>Destination: </Text>
                    </View>
                    <ThemedText>{shortDestinationAddress}</ThemedText>
                </View>

                <Spacer height={5} />

                {/* ETA & Destination */}
                <View style={styles.row}>
                    <View style={styles.row}>
                        <Ionicons name="time-outline" size={20} color={themed.tabIconColor} />
                        <Text style={{fontSize: 16, color:"#0e6ba8"}}>ETA:</Text>
                    </View>
                    <ThemedText>{tripEta?.durationText}</ThemedText>
                </View>

                <Spacer height={10} />

                {/* Driver Info */}
                <View style={styles.driverContainer}>
                    <Image source={{ uri: "https://i.pravatar.cc/100" }} style={styles.avatar} />
                    <View>
                        <ThemedText>{yourDriver.name}</ThemedText>
                        <ThemedText>{yourDriver.driverCar.carDiscrip} - {yourDriver.driverCar.tag}</ThemedText>
                    </View>

                    <View style={styles.actionRow}>
                        <TouchableOpacity style={styles.iconBtn}
                            onPress={() => {
                                if(yourDriver.phone) {
                                    Linking.openURL(`tel:${yourDriver.phone}`)
                                } else {
                                    alert("phone number not available")
                                }
                            }}
                        >
                        <Ionicons name="call-outline" size={20}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconBtn}
                            onPress={() => router.push("(textandcallroom)/TextRoom")}
                        >
                            <Ionicons name="chatbubble-outline" size={20} />
                        </TouchableOpacity>

                    </View>
                
                    
                </View>

                <Spacer height={16} />

                {/* Ride Status */}
                <View style={styles.row}>
                    <ThemedText style={{ fontSize: 16, color:"#0e6ba8"}}>🚘 Status:</ThemedText>
                    <ThemedText>on the way</ThemedText>
                </View>

                {/* Timer or progress */}
                <View style={styles.row}>
                    <ThemedText style={{ fontSize: 16, color:"#0e6ba8"}}>⏱️ Ride Time:</ThemedText>
                    <ThemedText>02:30</ThemedText>
                </View>

                <Spacer height={16} />

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.cancelBtn}>
                        <Text style={styles.cancelText}>❌ Cancel Ride </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.sosBtn}
                        onPress={() => {
                            if(userData.emergencyContact) {
                                Linking.openURL(`tel:${userData.emergencyContact}`)
                            } else {
                                alert("Set emergency contact")
                            }
                        }}
                    >
                        <Text style={styles.sosText}>🆘 Emergency </Text>
                    </TouchableOpacity>
                </View>

            </ThemedView>
            <Spacer height={40} />
        </RideLayout>
    )
}

export default RideTracker

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  driverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10
  },
  iconBtn: {
    padding: 6,
    backgroundColor: '#eee',
    borderRadius: 8
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  cancelBtn: {
    backgroundColor: '#fff0f0',
    padding: 10,
    borderRadius: 8
  },
  cancelText: {
    color: '#c00',
    fontWeight: 'bold'
  },
  sosBtn: {
    backgroundColor: '#ffe9e9',
    padding: 10,
    borderRadius: 8
  },
  sosText: {
    color: '#d00',
    fontWeight: 'bold'
  }
})
