import { FlatList, StyleSheet, useColorScheme, View, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import { useState } from 'react';


// UI
import ThemedText from './ThemedText'
import ThemedTextInput from "../components/ThemedTextInput"
import { Colors } from '../constant/Colors'
import BackButton from './Backbutton'
import Spacer from './Spacer'

//FIREBASE
import { useAtomValue } from 'jotai';
import { userLocationAtom } from '../atoms/locationAtoms';
import {userAtoms} from "../atoms/userAtoms"

//STATE MANAGEMENT
import { useSetAtom } from 'jotai';
import { destinationAtom } from '../atoms/destinationAtoms';



//MOCK DATA
import {trips} from "../mockUpData/messagesdata"
import { Ionicons } from '@expo/vector-icons'


//API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';
import { EXPO_PUBLIC_GOOGLE_API_KEY } from '@env';




const WhereToModal = ({ isVisible, onClose }) => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const user = useAtomValue(userAtoms)
  const userLocationAddress = useAtomValue(userLocationAtom)
  const setUserDestination = useSetAtom(destinationAtom)

  const [loading, setLoading] = useState(false)
  const [destination, setDestination] = useState('');

  const apikey = EXPO_PUBLIC_GEOAPIFY_API_KEY 


  const userRecentTrips = trips.slice(0, 3)

  

  //Get miles helper function
  const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const R = 3958.8; // Radius of Earth in miles

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return (R * c).toFixed(2); // distance in miles
  };


  const lat = "6.312552"
  const lng = "-10.800014"

  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright-smooth&width=600&height=400&center=lonlat:${lng},${lat}&zoom=14&apiKey=${apikey}`;


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

    if (data.features && data.features.length > 0) {
      const [lon, lat] = data.features[0].geometry.coordinates;
        return { lat, lon };
      } else {
        return null;
    }
  };


  

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0.3}
      style={styles.modal}
      propagateSwipe={true}
    >
      <View style={[styles.modalContent, {backgroundColor: themed.inputBackground}]}>
        <View style={{borderWidth: 2, width: "20%", borderRadius: 30, alignSelf: "center", color: themed.text}}/>
          
        <Spacer height={20} />

        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <BackButton style={styles.backBttn} size={40}/>
          <ThemedText variant='title' title style={{ textAlign: "center"}}>Plan your ride</ThemedText>
        </View>

        <Spacer />

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
              placeholder={loading ?"loading" : user.address}
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

        <Spacer />

        <View >
          <ThemedText variant='title' title>Recent Destinations</ThemedText>
          <Spacer height={10} />
          <FlatList
            data={userRecentTrips}
            keyExtractor={(item) => item.ride_id}
            ItemSeparatorComponent={() => <Spacer height={10} />}
            renderItem={({ item }) => (
                <View style={{flexDirection:"row", columnGap: 10}}>
                  <Ionicons 
                    name='time'
                    size={40}
                    color={themed.tabIconColor}
                  />
                  <View style={styles.mapContainer}>
                    <Image source={{ uri: mapUrl }}
                    style={{ width: "100%", height: "100%" }} 
                    />
                  </View>
                  <View>
                    <ThemedText >
                      {getDistanceInMiles(
                        item.origin_latitude,
                        item.origin_longitude,
                        item.destination_latitude,
                        item.destination_longitude
                      )} miles
                    </ThemedText>
                    <ThemedText>{item.destination_address}</ThemedText>
                    <ThemedText>Fare: ${item.fare_price}</ThemedText>
                  </View>
                </View>
            )}
          />
        </View>
      </View>
    </Modal>
  )
}

export default WhereToModal

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
    backgroundColor: "yellow"
  },

  backBttn:{
    position:"absolute",
    left: 0
  },

   mapContainer:{
    height: 70,
    width:"30%",
    borderWidth: 1
  }
})
