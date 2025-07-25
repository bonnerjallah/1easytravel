import { Text, StyleSheet, useColorScheme, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { useEffect, useState, useRef, useMemo } from 'react';
import { Hospital, Soup, Store, Drama, Landmark, Church, School, Flame } from 'lucide-react-native';

// COMPONENTS
import ThemedView from '../components/ThemedView';
import { Colors } from '../constant/Colors';
import BackButton from '../components/Backbutton';
import ThemedText from '../components/ThemedText';
import { Ionicons } from '@expo/vector-icons';

// STATE MANAGEMENT
import { useAtomValue, useSetAtom } from 'jotai';
import { userLocationAtom } from '../atoms/locationAtoms';
import { driversDetails } from '../mockUpData/messagesdata';
import { destinationAtom } from '../atoms/destinationAtoms';

// API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

// UTILS FUNCTIONS
import { generateMarkers, UserMarker, UserDestinationMarker } from '../lib/map';

const RideLayout = ({ children, snapPoints, index  }) => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const mapRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const [businesses, setBusinesses] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [prevPositions, setPrevPositions] = useState({});

  const userLocation = useAtomValue(userLocationAtom);
  const userDestination = useAtomValue(destinationAtom);
  const setDestination = useSetAtom(destinationAtom);

  // Mock location if user location is not available
  const lat = "6.318464";
  const lng = "-10.807143";
  const userMockLat = parseFloat(lat);
  const userMockLng = parseFloat(lng);

  // const userLat = userLocation?.latitude ?? userMockLat;
  // const userLng = userLocation?.longitude ?? userMockLng;

  // const userPoint = {
  //   latitude: userLat,
  //   longitude: userLng,
  // };

  // Remember to change this to userLocation from atom
  const userPoint = useMemo(() => ({
    latitude: userMockLat,
    longitude: userMockLng,
  }), [userMockLat, userMockLng]);

  console.log("User Point:", userPoint);

  const destinationPoint = useMemo(() => (
  userDestination
    ? { latitude: userDestination.lat, longitude: userDestination.lon }
    : userPoint
  ), [userDestination, userPoint]);

  const categoriesArray = [
    "catering.restaurant",
    "commercial.supermarket",
    "healthcare",
    "entertainment",
    "office.government",
    "religion.place_of_worship",
    "education.school",
    "emergency",
  ];

  const category = categoriesArray.join(",");

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case "catering.restaurant":
        return <Soup size={20} color="#89023e" />;
      case "commercial.supermarket":
        return <Store size={20} color="#ef8354" />;
      case "healthcare":
        return <Hospital size={20} color="#0466c8" />;
      case "entertainment":
        return <Drama size={20} color="#2ec4b6" />;
      case "office.government":
        return <Landmark size={20} color="#001d3d" />;
      case "religion.place_of_worship":
        return <Church size={20} color="#3d5a80" />;
      case "education.school":
        return <School size={20} color="#a56336" />;
      case "emergency":
        return <Flame size={20} color="#ca6702" />;
      default:
        return <Ionicons name="location" size={20} color={themed.text} />;
    }
  };

  const getNearbyPlaces = async (lat, lon, cat = category) => {
    const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;
    const radius = 80467.2; // meters

    const url = `https://api.geoapify.com/v2/places?categories=${cat}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=20&apiKey=${apiKey}`;

    const res = await fetch(url);
    const data = await res.json();  

    if (data.features && data.features.length > 0) {
      return data.features.map((place) => ({
        id: place.properties.place_id,
        name: place.properties.name,
        lat: place.geometry.coordinates[1],
        lon: place.geometry.coordinates[0],
        category:
          place.properties.categories?.find((cat) =>
            [
              "catering.restaurant",
              "commercial.supermarket",
              "healthcare",
              "entertainment",
              "office.government",
              "religion.place_of_worship",
              "education.school",
              "emergency",
            ].includes(cat)
          ) || "default",
        address: place.properties.formatted,
        distance: place.properties.distance,
      }));
    } else {
      return [];
    }
  };

  useEffect(() => {
    if (userMockLat && userMockLng) {
      getNearbyPlaces(userMockLat, userMockLng)
        .then((data) => setBusinesses(data))
        .catch((err) => console.error("Error fetching nearby places:", err));
    }
  }, [userMockLat, userMockLng]);

  useEffect(() => {
    if (mapRef.current && userDestination) {
      const timeout = setTimeout(() => {
        mapRef.current.fitToCoordinates(
          [userPoint, destinationPoint],
          {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
            animated: true,
          }
        );
      }, 300); // Debounce to wait for layout/render

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [destinationPoint]);


  useEffect(() => {
    setPrevPositions((prev) => {
      const newPositions = {};
      driversDetails.forEach((driver) => {
        const currentPos = {
          lat: parseFloat(driver.latitude),
          lng: parseFloat(driver.longitude),
        };
        newPositions[driver.driver_id] = currentPos;
      });
      return newPositions;
    });
  }, [driversDetails]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemedView style={styles.container} safe={true}>
        <View style={{ zIndex: 2 }}>
          <BackButton style={styles.backBttn} size={40} />
        </View>

        <Text>Bottom of the layout</Text>

        <View style={StyleSheet.absoluteFillObject}>
          <MapView
            key={businesses.length}
            ref={mapRef}
            provider={PROVIDER_DEFAULT}
            style={styles.mapContainer}
            mapType="mutedStandard"
            showsPointsOfInterest={false}
            initialRegion={{
              latitude: userPoint.latitude,
              longitude: userPoint.longitude,
              latitudeDelta: 0.007,
              longitudeDelta: 0.007,
            }}
            showsUserLocation={true}
            userInterfaceStyle="light"
            onLongPress={(e) => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              setDestination({ lat: latitude, lon: longitude });
            }}
          >
            <UserMarker location={userPoint} />

            {routeCoords.length > 0 && (
              <Polyline coordinates={routeCoords} strokeColor="#007bff" strokeWidth={4} />
            )}

            <UserDestinationMarker destination={userDestination} />

            {businesses.map((biz) => (
              <Marker
                key={biz.id}
                coordinate={{ latitude: biz.lat, longitude: biz.lon }}
                title={biz.name}
                pinColor="orange"
              >
                <View style={{ backgroundColor: 'white', padding: 4, borderRadius: 8 }}>
                  {getCategoryLabel(biz.category)}
                </View>
              </Marker>
            ))}

            {generateMarkers(driversDetails, prevPositions)}
          </MapView>
        </View>

        <View style={styles.bottomSheetWrapper}>
          <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} index={index}>
            <BottomSheetScrollView >
              <ThemedView>{children}</ThemedView>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </ThemedView>
    </GestureHandlerRootView>
  );
};

export default RideLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBttn: {
    left: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'absolute',
    top: 10,
    zIndex: 2,
    elevation: 2,
    padding: 5,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderWidth: 1,
  },
  bottomSheetWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0, // ensure it fills the screen
    elevation: 10, // Android support
    
  },
});
