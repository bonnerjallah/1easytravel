import { Text, StyleSheet, useColorScheme, Image, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

// COMPONENTS
import { Colors } from '../../constant/Colors';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import RideLayout from '../../components/RideLayout';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';

//STATE MANAGEMENT
import { useAtomValue, useSetAtom } from 'jotai';
import { userLocationAtom, userPickUpLocation, userPickUpCoord } from '../../atoms/locationAtoms';
import { destinationAtom, destinationText } from '../../atoms/destinationAtoms';



//API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';
import {GOOGLEMAP_API_KEY} from "@env"

//MOCK DATA
import { trips } from '../../mockUpData/messagesdata';

//LIB
import { reverseGeocode } from '../../lib/map';
import {addressToCoord} from "../../lib/map"
import {getDistanceInMiles} from "../../lib/map"




const WhereTo = () => {

  const setUserDestination = useSetAtom(destinationAtom)
  const setPickUpLocation = useSetAtom(userPickUpLocation);

  const setPickUpCoord = useSetAtom(userPickUpCoord)
  const setDestinationText = useSetAtom(destinationText)
  const userLocation = useAtomValue(userLocationAtom)
  const pickUpLocation = useAtomValue(userPickUpLocation);
  const pickUpDestination = useAtomValue(destinationAtom)
  const pickUpCoord = useAtomValue(userPickUpCoord) 
  
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false)
  const [pickUpText, setPickUpText] = useState(""); 
  const [destinationLocationAddress, setDestinationLocationAddress] = useState()
  

  const apikey = EXPO_PUBLIC_GEOAPIFY_API_KEY;
  const googleApiKey = GOOGLEMAP_API_KEY

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const userRecentTrips = trips.slice(0, 3);
  

  //Reverse address coords to text
  useEffect(() => {
    const getDestinationAddress = async () => {
      if(pickUpDestination.lat && pickUpDestination.lon) {
        const pickUpAddress = await reverseGeocode(
          pickUpDestination.lat,
          pickUpDestination.lon,
          apikey
        )
        if(pickUpAddress) {
          setDestinationLocationAddress(pickUpAddress)
          setDestinationText(pickUpAddress)
        }
      }
    }  
      getDestinationAddress()
  }, [pickUpDestination])

  // Reverse address coords to text
  useEffect(() => {
    const getAddress = async () => {
      if (userLocation.latitude && userLocation.longitude) {
        const address = await reverseGeocode(
          userLocation.latitude,
          userLocation.longitude,
          apikey
        );
        if (address) {
          setPickUpLocation(address);
        }
      }
    };

    getAddress();
  }, [userLocation]);

  //Reverse address text to coords
  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        if (pickUpLocation) {
          const addressCoord = await addressToCoord(pickUpLocation, apikey);
          if (addressCoord) {
            setPickUpCoord(addressCoord);
          }
        }
      } catch (err) {
        console.error("Error in fetchCoordinates:", err);
      }
    };

    fetchCoordinates();
  }, [pickUpLocation]);
    
  

  // Static map URL for recent trips
  const lat = '6.312552';
  const lng = '-10.800014';

  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${lng},${lat}&zoom=14&apiKey=${apikey}`;

  
  // Handle destination confirmation
  const handleDestinationConfirm = () => {
      if (!destination.trim() && !destinationLocationAddress) return;

      const selectedAddress = destination.trim() === "" ? destinationLocationAddress : destination

      setLoading(true);
      addressToCoord(selectedAddress, apikey)
        .then((coords) => {
          setLoading(false);

          if (coords) {
            setUserDestination(coords);
            router.push("/(transport)/ConfirmRide");
          } else {
            alert("Location not found");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error fetching coordinates:", error);
          alert("Error fetching location");
        });
  }


  


  return (
    <RideLayout snapPoints={['25%', '75%']} index={1}>
      <View style={{ flex: 1, paddingBottom: 100 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={80}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1, padding: 16 }}>
              <ThemedText style={{ fontSize: 18, marginBottom: 10 }} variant='title' title>
                Set your destination
              </ThemedText>

              <View style={{flexDirection:"row", borderWidth: 1, height: 120, alignItems:"center", padding: 10, borderRadius: 5}}>

                <View style={{justifyContent:"center",alignItems:"center"}}>
                  <Ionicons name='stop-circle' />
                  <View style={{
                    width: 1,
                    height: 35, 
                    backgroundColor: 'gray',
                    marginVertical: 7,
                  }} />            
                  <Ionicons name = "stop" />
                </View>

                <Spacer width={10}/>

                <View style={{width:'100%', rowGap: 10}}>
                  <ThemedTextInput
                    placeholder={loading ?"loading" : pickUpLocation} 
                    style={{borderWidth: 0, borderRadius:5, width:"95%", height: 50,  backgroundColor: themed.inputBackground}}
                    value={pickUpText}
                    onChangeText={setPickUpText}
                    onEndEditing={() => {
                      if(pickUpText.trim()) {
                        setPickUpLocation(pickUpText)
                      }
                    }}
                  />
                  <ThemedTextInput 
                    placeholder={destinationLocationAddress ? destinationLocationAddress : "Where to?"}
                    returnKeyType="done"
                    blurOnSubmit={true}
                    value={destination}
                    onChangeText={setDestination}
                    onSubmitEditing={async () => {
                      if (!destination.trim()) return;
                        setLoading(true);
                        const coords = await addressToCoord(destination, apikey);
                        setLoading(false);

                        if (coords) {
                          setUserDestination(coords);
                        } else {
                          alert("Location not found");
                        }
                    }}
                    style={{
                      borderWidth: 0,
                      borderRadius: 5,
                      width: "95%",
                      height: 50,
                      backgroundColor: themed.inputBackground                  
                    }}
                  />



                    


                </View>
              </View>
              <ThemedText style={{ marginVertical: 10 }} variant='title' title >
                Recent Destinations
              </ThemedText>

              {/* Render recent trips as simple mapped Views instead of FlatList */}
              <View>
                {userRecentTrips.map((item) => (
                  <View
                    key={item.ride_id}
                    style={{ flexDirection: 'row', gap: 10, marginBottom: 10 }}
                  >
                    <Ionicons
                      name="time"
                      size={40}
                      color={themed.tabIconColor}
                    />
                    <View style={{ width: 100, height: 80 }}>
                      <Image
                        source={{ uri: mapUrl }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText>
                        {getDistanceInMiles(
                          item.origin_latitude,
                          item.origin_longitude,
                          item.destination_latitude,
                          item.destination_longitude
                        )}{' '}
                        miles
                      </ThemedText>
                      <ThemedText>{item.destination_address}</ThemedText>
                      <ThemedText>Fare: ${item.fare_price}</ThemedText>
                    </View>
                  </View>
                ))}
              </View>

                <Spacer width={10}/>

              <ThemedButton onPress={handleDestinationConfirm}>
                <ThemedText variant="title" style={{ textAlign: 'center', color: themed.buttontitle }}>
                  Confirm destination
                </ThemedText>
              </ThemedButton>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </RideLayout>
  );
};

export default WhereTo;

const styles = StyleSheet.create({});
