import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useMemo, useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// COMPONENTS
import RideLayout from '../../components/RideLayout';
import { Colors } from '../../constant/Colors';
import icons from '../../constant/icons';
import ThemedText from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView';
import Spacer from '../../components/Spacer';
import images from '../../constant/images';

// STATE MANAGEMENT
import { useSetAtom, useAtomValue } from 'jotai';
import { selectedDriverAtom } from '../../atoms/selectedDriverAtoms';
import { userLocationAtom, userPickUpCoord } from '../../atoms/locationAtoms';
import { destinationAtom } from "../../atoms/destinationAtoms";
import { userTripsAtom } from '../../atoms/tripsAtoms';

// MOCK DATA
import { driversDetails } from '../../mockUpData/messagesdata';

// UTILS
import { getDistance } from '../../lib/map';
import { getETA } from '../../lib/map';

// API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

const ConfirmRide = () => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [nearbyDrivers, setNearbyDrivers] = useState(null);
  const [loading, setLoading] = useState(false)

  const setSelectedDriver = useSetAtom(selectedDriverAtom);
  const pickUpAt = useAtomValue(userPickUpCoord);
  const dropOfAt = useAtomValue(destinationAtom);
  const userLocation = useAtomValue(userLocationAtom);
  const setTripDetails = useSetAtom(userTripsAtom);

  const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;

  const userLat = pickUpAt?.lat ?? userLocation?.latitude ?? 6.319314;
  const userLng = pickUpAt?.lon ?? userLocation?.longitude ?? -10.807170;

  const userPoint = useMemo(() => ({
    latitude: userLat,
    longitude: userLng,
  }), [userLat, userLng]);

  const radiusInKm = 10 * 1.60934;

  // Calculate price based on distance and car type
  const getPriceAmount = (pickUpAt, dropOfAt, driver) => {
    const pickupLat = pickUpAt?.lat ?? pickUpAt?.latitude;
    const pickupLng = pickUpAt?.lon ?? pickUpAt?.longitude;
    const dropLat = dropOfAt?.lat ?? dropOfAt?.latitude;
    const dropLng = dropOfAt?.lon ?? dropOfAt?.longitude;

    const distanceInKm = getDistance(pickupLat, pickupLng, dropLat, dropLng);

    let pricePerKm = 1.5;
    const carType = driver?.driverCar?.cartype?.toUpperCase();

    switch (carType) {
      case "SEDAN":
        pricePerKm = 2.0;
        break;
      case "SUV":
        pricePerKm = 3.0;
        break;
      default:
        pricePerKm = 1.5;
    }

    const price = (distanceInKm * pricePerKm).toFixed(2);
    return { distanceInKm: distanceInKm.toFixed(2), price };
  };

  const getClosestDriversWithETA = async () => {
    
    const driversWithin10Miles = [];

    for (const driver of driversDetails) {
      const distance = getDistance(
        userPoint.latitude,
        userPoint.longitude,
        driver.latitude,
        driver.longitude
      );

      if (distance <= radiusInKm) {
        const eta = await getETA(
          { lat: userPoint.latitude, lon: userPoint.longitude },
          { lat: driver.latitude, lon: driver.longitude },
          apiKey
        );

        driversWithin10Miles.push({
          ...driver,
          eta,
          distance
        });
      }
    }

    setNearbyDrivers(driversWithin10Miles);
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);            
      await getClosestDriversWithETA();
      setLoading(false);     
    };

    fetchDrivers();
  }, []);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row' }}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16} color={themed.tabIconColor} />
        ))}
        {hasHalfStar && (
          <Ionicons name="star-half" size={16} color={themed.tabIconColor} />
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16} color={themed.tabIconColor} />
        ))}
      </View>
    );
  };

  return (
    <RideLayout snapPoints={["25%", "55%"]} index={1}>
      <ThemedView style={{ padding: 10 }}>
        <ThemedText variant='title' title>Select Driver</ThemedText>
        <Spacer size={5} />
          {loading ? (
            <View style={{justifyContent:"center"}}>
                <ThemedText variant='title' title style={{textAlign: "center"}}>
                  Searching for drivers
                </ThemedText>
                <Spacer height={50} />
                <ActivityIndicator size="large" color={themed.tabIconColor} />
            </View>
            
          ) : nearbyDrivers && nearbyDrivers.length > 0 ? (
            nearbyDrivers.slice(0, 5).map(driver => {
            const { price, distanceInKm } = getPriceAmount(pickUpAt, dropOfAt, driver);

            return (
              <TouchableOpacity
                key={driver.driver_id}
                style={{
                  marginBottom: 20,
                  justifyContent: "space-between",
                  flexDirection: 'row',
                  alignItems: 'center',
                  columnGap: 10,
                  borderBottomWidth: 0.5,
                  paddingBottom: 10
                }}
                onPress={() => {
                  setSelectedDriver({ ...driver, price });  // Pass price as well
                  setTripDetails(prev => ({
                    ...prev,
                    pickup: pickUpAt,
                    dropoff: dropOfAt,
                    price,
                    distance: distanceInKm,
                    eta: driver.eta?.durationText ?? '',
                  }));
                  router.push("(transport)/PaymentOptions");
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, width: "90%" }}>
                  <Image source={driver.profilePic} style={{ width: 50, height: 50, borderRadius: 25 }} />
                  <View style={{ flexDirection: "row", columnGap: 10 }}>
                    <View>
                      <ThemedText style={{ fontSize: 16, fontWeight: 'bold' }}>{driver.name}</ThemedText>
                      <ThemedText>Rating: {renderStars(Number(driver.rating))}</ThemedText>
                      <View>
                        {driver.eta && driver.eta.durationText ? (
                          <ThemedText>ETA: {driver.eta.durationText}</ThemedText>
                        ) : (
                          <ThemedText>Loading ETA...</ThemedText>
                        )}
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 10, paddingLeft: 7, borderLeftWidth: 1 }}>
                      <View style={{ rowGap: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 5 }}>
                          <Image
                            source={icons.dollarsign}
                            style={{ width: 25, height: 25, padding: 1, tintColor: themed.tabIconColor, backgroundColor: "yellow", borderRadius: 10 }}
                          />
                          <ThemedText>Price: ${price}</ThemedText>
                        </View>
                        <ThemedText>Distance: {distanceInKm} km</ThemedText>
                      </View>
                    </View>
                  </View>
                </View>

                <Image
                  source={driver.driverCar.image}
                  style={{ width: 60, height: 40, position: "absolute", bottom: 15, right: 1, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            );
          })
        ) : (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText title>No drivers available within 10 miles.</ThemedText>
            <Image source={images.tripScreenIcon} />
          </ThemedView>
        )}
      </ThemedView>
      <Spacer height={210} />
    </RideLayout>
  );
};

export default ConfirmRide;

const styles = StyleSheet.create({
  emptyContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center"
  }
});
