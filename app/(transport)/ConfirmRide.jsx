import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { router } from 'expo-router';
import { useMemo, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


// COMPONENT
import RideLayout from '../../components/RideLayout'
import { Colors } from '../../constant/Colors';
import icons from '../../constant/icons';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import images from '../../constant/images';


//State Management
import { useSetAtom, useAtomValue } from 'jotai'
import { selectedDriverAtom } from '../../atoms/selectedDriverAtoms';
import { userLocationAtom, userPickUpCoord, userPickUpLocation } from '../../atoms/locationAtoms';


//Mock Data
import { driversDetails } from '../../mockUpData/messagesdata'


// Utils
import { getDistance } from '../../lib/map'; // adjust path as needed





const ConfirmRide = () => {
  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light;

  const [nearbyDrivers, setNearbyDrivers] = useState(null)

  const setSelectedDriver = useSetAtom(selectedDriverAtom);

  const pickUpAt = useAtomValue(userPickUpCoord)
  const userLocation = useAtomValue(userLocationAtom);

  
  
  // Mock location if user location is not available
  const lat = "6.319314";
  const lng = "-10.807170";
  const userMockLat = parseFloat(lat);
  const userMockLng = parseFloat(lng);

  const userLat = pickUpAt?.lat ?? userLocation?.latitude ??  userMockLat;
  const userLng = pickUpAt?.lon ?? userLocation?.longitude ?? userMockLng;


  const userPoint = useMemo(() => ({
    latitude: userLat,
    longitude: userLng,
  }), [userLat, userLng]);


  // Function to get closest drivers within 10 miles (approximately 16.09 kilometers)
  const MILES_TO_KM = 1.60934;
  const radiusInMiles = 10;
  const radiusInKm = radiusInMiles * MILES_TO_KM; // ≈ 16.0934 km

  //Get closest driver
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
  };
  useEffect(() => {
    getClosestDrivers()
  }, [])


  //Stars Render
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16}  color={themed.tabIconColor} />
        ))}
        {hasHalfStar && (
          <Ionicons name="star-half" size={16}  color={themed.tabIconColor}/>
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16}  color={themed.tabIconColor} />
        ))}
      </View>
    );
  };

  return (
    <RideLayout snapPoints={["25%",'55%']} index={1}>
      <ThemedView style={{padding: 10}}>
        <ThemedText variant='title' title>Select Driver</ThemedText>
        <Spacer size={5} />
        {nearbyDrivers && nearbyDrivers.length > 0 ? (
          nearbyDrivers.slice(0, 5).map(driver => ( 
            <TouchableOpacity key={driver.driver_id} style={{ marginBottom: 20,  justifyContent:"space-between", flexDirection: 'row', alignItems: 'center', columnGap:10,
              borderBottomWidth: 0.5, paddingBottom:10
            }}
              onPress={() => {
                setSelectedDriver(driver);
                router.push("(transport)/PaymentOptions")
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
                <Image source={driver.profilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                <View>
                  <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>{driver.name}</ThemedText>
                  <ThemedText style={{alignItems:"center", }}>Rating:{renderStars(Number(driver.rating))}</ThemedText>
                  <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, marginTop: 5 }}>
                    <ThemedText style={{borderRightWidth: 1, paddingRight: 10}}>
                      Distance: {getDistance(
                      userPoint.latitude,
                      userPoint.longitude,
                      driver.latitude,
                      driver.longitude
                    ).toFixed(2)} km
                    </ThemedText>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 2, justifyContent: 'center'}}>
                      <Image source={icons.dollarsign} style={{ width: 25, height: 25, marginLeft: 5, padding: 1,  tintColor: themed.tabIconColor, backgroundColor:"yellow", borderRadius:10  }} />
                      <ThemedText>
                        Price: ${driver.driverCar.price.toFixed(2)}
                      </ThemedText>
                    </View>
                  </View>
                
                </View>
              </View>
              
              <Image source={driver.driverCar.image} style={{ width: 60, height: 20, position:"absolute", bottom:15, right: 1  }} />

              
            </TouchableOpacity>
          ))
        ) : (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText title>No drivers available within 10 miles.</ThemedText>
            <Image source={images.tripScreenIcon} />
          </ThemedView>
        )}
      </ThemedView>
        <Spacer height={210} />
    </RideLayout>
    
  )
}

export default ConfirmRide

const styles = StyleSheet.create({
  emptyContainer:{
    height:"400",
    justifyContent:"center",
    alignItems:"center"
  }
})