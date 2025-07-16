import { Text, StyleSheet, useColorScheme, Image, View, } from 'react-native';
import MapView, { PROVIDER_DEFAULT } from "react-native-maps"
import { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';

// COMPONENTS
import WhereToModal from '../../components/WhereToModal';
import ThemedView from '../../components/ThemedView';
import { Colors } from '../../constant/Colors';
import BackButton from '../../components/Backbutton';
import Spacer from '../../components/Spacer';
import ThemedText from '../../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';



//STATE MANAGEMENT
import { useAtomValue, useSetAtom } from 'jotai';
import { userLocationAtom } from '../../atoms/locationAtoms';
import { driversDetails } from '../../mockUpData/messagesdata';
import { destinationAtom } from '../../atoms/destinationAtoms';

//API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

//UTILS FUNCTIONS
import { calculateRegion } from '../../lib/map';
import { generateMarkers } from '../../lib/map';
import { UserMarker } from '../../lib/map';
import { UserDestinationMarker } from "../../lib/map";





const WhereTo = () => {

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const userLocation = useAtomValue(userLocationAtom)
  const userDestination = useAtomValue(destinationAtom)
  const setDestination = useSetAtom(destinationAtom);

  const [showWhereToModal, setShowWhereToModal] = useState(false);
  const [businesses, setBusinesses] = useState([])

  
  const lat = "6.312552"
  const lng = "-10.800014"
  const userMockLag = parseFloat(lat)
  const userMockLng = parseFloat(lng)



  const userPoint = {
    // latitude: userLocation.latitude ?? userMockLag,
    // longitude: userLocation.longitude ?? userMockLng,

    latitude:  userMockLag,
    longitude: userMockLng,
  };

  const destinationPoint = userDestination ? 
    {
      latitude: userDestination.lat,
      longitude: userDestination.lon,
    }
  : userPoint;

  const region = calculateRegion(userPoint, destinationPoint, 1.5); 

  const category = "catering.restaurant,commercial.supermarket,healthcare, entertainment, office.government, religion.place_of_worship, education.school, emergency";

  
  const getNearbyPlaces = async (lat, lon, cat = category) => {
    const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;
    const radius = 1000; // meters

    const url = `https://api.geoapify.com/v2/places?categories=${cat}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.features && data.features.length > 0) {
      return data.features.map((place) => ({
        id: place.properties.place_id,
        name: place.properties.name,
        lat: place.geometry.coordinates[1],
        lon: place.geometry.coordinates[0],
      }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    getNearbyPlaces(userMockLag, userMockLng).then(setBusinesses);
  }, []);








  useEffect(() => {
    setShowWhereToModal(true);
  }, []);

  return (
    <ThemedView style={styles.container} safe>
      <Spacer />

      <MapView
        provider={PROVIDER_DEFAULT}
        style={{width:"100%", height: "100%"}}
        mapType="mutedStandard"
        showsPointsOfInterest = {false}
        initialRegion={{
          latitude: userMockLag,
          longitude: userMockLng,
          latitudeDelta: 0.03,   // Smaller delta = more zoomed in
          longitudeDelta: 0.01,
        }}        
        showsUserLocation= {true}
        userInterfaceStyle='light'
        onLongPress={(e) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          setDestination({ lat: latitude, lon: longitude }); 
        }}
      >
        <UserMarker
          location={{
            // latitude: userLocation?.latitude ?? userMockLag,
            // longitude: userLocation?.longitude ?? userMockLng,
            latitude: userMockLag,
            longitude: userMockLng,
          }}
        />    

        <UserDestinationMarker destination={userDestination} />

        {businesses.map((biz) => (
          <Marker
            key={biz.id}
            coordinate={{ latitude: biz.lat, longitude: biz.lon }}
            title={biz.name}
            pinColor="orange"
          />
        ))}

  
        {generateMarkers(driversDetails)}

    


      </MapView>

      <WhereToModal
        isVisible={showWhereToModal}
        onClose={() => setShowWhereToModal(false)}
      />
    </ThemedView>
  );
};

export default WhereTo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer:{
    flex: 1,
    height: "100%",
    width:"100%",
    borderWidth: 1
  }
});
