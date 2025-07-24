// utils/map.js
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import icons from '../constant/icons';

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

export function generateMarkers(data, destination = null, assignedDriverId = null, icon = null) {
  return data.map((item) => {
    let heading = 0;

    if (assignedDriverId && item.driver_id === assignedDriverId && destination) {
      heading = getBearing(
        parseFloat(item.latitude),
        parseFloat(item.longitude),
        destination.latitude,
        destination.longitude
      );
    }

    return (
      <Marker
        key={item.driver_id}
        coordinate={{
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
        }}
        rotation={heading}
        flat={true}
        title={item.name}
        description={item.description || ''}
      >
        {icon ? (
          <View>{icon}</View>
        ) : item.profilePic ? (
          <View style={{ alignItems: 'center' }}>
            <Image source={icons.car1} style={{ width: 25, height: 25 }} />
          </View>
        ) : null}
      </Marker>
    );
  });
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

export function getBearing(startLat, startLng, endLat, endLng) {
  const toRadians = (deg) => deg * (Math.PI / 180);
  const toDegrees = (rad) => rad * (180 / Math.PI);

  const lat1 = toRadians(startLat);
  const lat2 = toRadians(endLat);
  const dLon = toRadians(endLng - startLng);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let brng = Math.atan2(y, x);
  brng = toDegrees(brng);
  return (brng + 360) % 360; // Normalize to 0-360°
}

// ✅ NEW: getDistance (Haversine formula)
export function getDistance(lat1, lon1, lat2, lon2) {
  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const R = 6371; // Earth radius in kilometers

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // distance in kilometers
}
