// utils/map.js

export async function getETA(origin, destination, apiKey) {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.lat},${origin.lon}&destination=${destination.lat},${destination.lon}&key=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.status === 'OK') {
    const route = data.routes[0].legs[0];
    return {
      durationText: route.duration.text,
      durationValue: route.duration.value, // in seconds
      distanceText: route.distance.text,
    };
  } else {
    throw new Error(`Directions API error: ${data.status}`);
  }
}

export function calculateRegion(point1, point2, factor = 2) {
  const lat1 = parseFloat(point1.latitude ?? point1.lat);
  const lon1 = parseFloat(point1.longitude ?? point1.lon);
  const lat2 = parseFloat(point2.latitude ?? point2.lat);
  const lon2 = parseFloat(point2.longitude ?? point2.lon);

  const latitude = (lat1 + lat2) / 2;
  const longitude = (lon1 + lon2) / 2;

  const latitudeDelta = Math.abs(lat1 - lat2) * factor;
  const longitudeDelta = Math.abs(lon1 - lon2) * factor;

  const isValid = isFinite(latitudeDelta) && isFinite(longitudeDelta) && latitudeDelta > 0 && longitudeDelta > 0;

  if (!isValid) {
    return {
      latitude: 6.295643,
      longitude: -10.793646,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
}



// lib/map.js
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';

export function generateMarkers(data, icon = null) {
  return data.map((item) => (
    <Marker
      key={item.driver_id}
      coordinate={{
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      }}
      title={item.name}
      description={item.description || ''}
    >
      {icon ? (
        <View>{icon}</View>
      ) : item.profilePic ? (
        <View style={{ alignItems: 'center' }}>
          <Ionicons name='car-sport' size={25} color="#00a6fb" />
          <Image
            source={item.profilePic}
            style={{ width: 25, height: 15, borderRadius: 17.5, position: 'absolute' }}
            resizeMode="contain"
          />
        </View>
      ) : null}
    </Marker>
  ));
}

export const UserMarker = ({ location }) => {
  if (!location || !location.latitude || !location.longitude) return null;

  return (
    <Marker
      coordinate={{
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      }}
      title="You"
      description="Your current location"
      pinColor="blue"
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>You</Text>
        <Ionicons name='location' size={25} />
      </View>
    </Marker>
  );
};

export const UserDestinationMarker = ({ destination }) => {
  if (!destination || !destination.lat || !destination.lon) return null;

  return (
    <Marker
      coordinate={{
        latitude: parseFloat(destination.lat),
        longitude: parseFloat(destination.lon),
      }}
      title="Destination"
      pinColor="green"
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>Destination</Text>
        <Ionicons name="pin" size={25} color="red" />
      </View>
    </Marker>
  );
};


