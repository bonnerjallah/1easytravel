import { Text, StyleSheet, useColorScheme, Image, View, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

// COMPONENTS
import ThemedView from '../../components/ThemedView';
import { Colors } from '../../constant/Colors';
import BackButton from '../../components/Backbutton';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';
import RideLayout from '../../components/RideLayout';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';

//STATE MANAGEMENT
import { useAtomValue, useSetAtom } from 'jotai';
import { userLocationAtom, userPickUpLocation } from '../../atoms/locationAtoms';
import {userAtoms} from "../../atoms/userAtoms"
import { destinationAtom } from '../../atoms/destinationAtoms';


//API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

//MOCK DATA
import { trips } from '../../mockUpData/messagesdata';




const WhereTo = () => {


  const user = useAtomValue(userAtoms)
  const userLocation = useAtomValue(userLocationAtom)
  const setUserDestination = useSetAtom(destinationAtom)
  const setAddress = useSetAtom(userPickUpLocation);
  const userAddress = useAtomValue(userPickUpLocation);

  const [destination, setDestination] = useState('');

  const apikey = EXPO_PUBLIC_GEOAPIFY_API_KEY;

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const userRecentTrips = trips.slice(0, 3);

  const [loading, setLoading] = useState(false)



  // Reverse Geocoding to get address from user location
  useEffect(() => {
      const fetchAddress = async () => {
        try {
          const response = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${userLocation.latitude}&lon=${userLocation.longitude}&format=json&apiKey=${EXPO_PUBLIC_GEOAPIFY_API_KEY}`);
  
          const data = await response.json();
  
          if (data && Array.isArray(data.results) && data.results.length > 0) {
            if (data.results[0].formatted) {
              setAddress(data.results[0].formatted);
            } else {
              console.log("No 'formatted' property in the first result");
            }
          } else {
            console.log("No results array or empty results");
          }
        } catch (error) {
          console.error("Reverse Geocoding Error:", error);
        }
      };
  
  
      if (userLocation.latitude && userLocation.longitude) {
          fetchAddress();
      }
    }, [userLocation]);
  

  // Helper to calculate miles between two points
  const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 3958.8; // Radius of Earth in miles

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2);
  };

  // Static map URL for recent trips
  const lat = '6.312552';
  const lng = '-10.800014';

  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${lng},${lat}&zoom=14&apiKey=${apikey}`;


  // Function to get coordinates from address using Geoapify API
  const getCoordinates = async (address) => {
    const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;
    // Ensure the query includes Monrovia, Liberia for better local accuracy
    let adjustedAddress = address.trim();

    if (!adjustedAddress.toLowerCase().includes("liberia")) {
      adjustedAddress += ", Monrovia Liberia";
    }
    const encodedAddress = encodeURIComponent(adjustedAddress);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log("Geocoding response data:", data); // Debug log

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
        return { lat, lon };
      } else {
        return null;
    }
  };

  // Handle destination confirmation
  const handleDestinatoinConfirm = () => {
    if (!destination.trim()) return;
      setLoading(true);
      getCoordinates(destination)
        .then((coords) => {
          setLoading(false);

          if (coords) {
            setUserDestination(coords);
            console.log("Destination Coordinates:", coords);
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
    <RideLayout snapPoints={['35%', '85%']} index={1}>
      <View style={{ flex: 1 }}>
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
                placeholder={loading ?"loading" : userAddress} 
                style={{borderWidth: 0, borderRadius:5, width:"95%", height: 50, backgroundColor:"lightgray"}}
              />
              <ThemedTextInput 
                placeholder="Where to?"
                returnKeyType="done"
                blurOnSubmit={true}
                value={destination}
                onChangeText={setDestination}
                onSubmitEditing={async () => {
                  if (!destination.trim()) return;
                    setLoading(true);
                    const coords = await getCoordinates(destination);
                    setLoading(false);

                    if (coords) {
                      setUserDestination(coords);
                      console.log("Destination Coordinates:", coords);
                      onClose();
                    } else {
                      alert("Location not found");
                    }
                }}
                style={{
                  borderWidth: 0,
                  borderRadius: 5,
                  width: "95%",
                  height: 50,
                  backgroundColor: "lightgray"
                }}
              />
            </View>
        </View>
              <ThemedText style={{ fontWeight: 'bold', marginVertical: 10 }} variant='title' title >
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
              <ThemedButton onPress={handleDestinatoinConfirm}>
                <ThemedText variant="title" style={{ textAlign: 'center' }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    borderWidth: 1,
  },

  
});
