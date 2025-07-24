import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { useMemo } from 'react';

// COMPONENT
import RideLayout from '../../components/RideLayout'
import { Colors } from '../../constant/Colors';


//State Management
import { useAtomValue } from 'jotai'
import { destinationAtom } from '../../atoms/destinationAtoms'
import { userLocationAtom } from '../../atoms/locationAtoms'

//Mock Data
import { driversDetails } from '../../mockUpData/messagesdata'
import { useEffect, useState } from 'react'

// Utils
import { getDistance } from '../../lib/map'; // adjust path as needed
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';



const ConfirmRide = () => {
  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light;

  const [nearbyDrivers, setNearbyDrivers] = useState(null)


  const destination = useAtomValue(destinationAtom)
  const userLocation = useAtomValue(userLocationAtom)

  console.log("Destination in ConfirmRide:", destination)
  console.log("User Location in ConfirmRide:", userLocation)



  
  // Mock location if user location is not available
  const lat = "6.319314";
  const lng = "-10.807170";
  const userMockLat = parseFloat(lat);
  const userMockLng = parseFloat(lng);

  // Remember to change this to userLocation from atom
    const userPoint = useMemo(() => ({
      latitude: userMockLat,
      longitude: userMockLng,
    }), [userMockLat, userMockLng]);




  // Function to get closest drivers within 10 miles (approximately 16.09 kilometers)
  const MILES_TO_KM = 1.60934;
  const radiusInMiles = 10;
  const radiusInKm = radiusInMiles * MILES_TO_KM; // ≈ 16.0934 km

  const getClosestDrivers = () => {
    const driversWithin10Miles = driversDetails.filter(driver => {
      const distance = getDistance(
        userPoint.latitude,
        userPoint.longitude,
        driver.latitude,
        driver.longitude
      );
      return distance <= radiusInKm; 
    });

    setNearbyDrivers(driversWithin10Miles);
    console.log("Nearby Drivers:", driversWithin10Miles);
  };
  useEffect(() => {
    getClosestDrivers()
  }, [])

  return (
    <RideLayout snapPoints={['50%', '85%']} index={1}>
      <ThemedText variant='title' title>ConfirmRide</ThemedText>
      <Spacer size={5} />
      {nearbyDrivers && nearbyDrivers.length > 0 ? (
        nearbyDrivers.slice(0, 5).map(driver => ( 
          <TouchableOpacity key={driver.driver_id} style={{ marginBottom: 20,  justifyContent:"space-between", flexDirection: 'row', alignItems: 'center', columnGap:10}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
              <Image source={driver.profilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
              <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{driver.name}</Text>
                <Text>Rating: {driver.rating}</Text>
                <Text>
                  Distance: {getDistance(
                  userPoint.latitude,
                  userPoint.longitude,
                  driver.latitude,
                  driver.longitude
                ).toFixed(2)} km
                </Text>
              </View>
            </View>
            
            <Image source={driver.driverCar} style={{ width: 60, height: 20,  }} />
            
          </TouchableOpacity>
        ))
      ) : (
        <Text>No drivers available within 5 miles.</Text>
      )}
    </RideLayout>
    
  )
}

export default ConfirmRide

const styles = StyleSheet.create({})