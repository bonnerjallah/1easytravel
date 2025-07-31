// utils/map.js
import { Ionicons } from '@expo/vector-icons';
import { Image, View, Text } from 'react-native';
import { Marker } from 'react-native-maps';
import icons from '../constant/icons';


//Get ETA
export async function getETA(origin, destination, apiKey) {

 const url = `https://api.geoapify.com/v1/routing?waypoints=${origin.lat},${origin.lon}|${destination.lat},${destination.lon}&mode=drive&apiKey=${apiKey}`;
  

  const res = await fetch(url);
  const data = await res.json();

  if (data.features && data.features.length > 0) {
    const route = data.features[0].properties;
    return {
      durationValue: route.time, // in seconds
      durationText: `${Math.round(route.time / 60)} mins`,
      distanceText: `${(route.distance / 1000).toFixed(2)} km`,
      distanceValue: route.distance, // in meters
    };
  } else {
    throw new Error(`Geoapify routing error: ${data.message || "No route found"}`);
  }
}


//Drivers Markers
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
        ) : item ? (
          <View style={{ alignItems: 'center' }}>
            <Image source={icons.car1} style={{ width: 25, height: 25 }} />
          </View>
        ) : null}
      </Marker>
    );
  });
}

//User Marker
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

//User destination Marker
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

//Cars facing directions
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

//GetDistance (Haversine formula)
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

//Get Address form coordinates
export const reverseGeocode = async (latitude, longitude, apiKey) => {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
    );

    const data = await response.json();

    if (data && Array.isArray(data.results) && data.results.length > 0) {
      return data.results[0].formatted || null;
    } else {
      console.log("No results or empty results");
      return null;
    }
  } catch (error) {
    console.error("Reverse Geocoding Error:", error);
    return null;
  }
};


//Get Coordinates from address 
export const addressToCoord = async (address, apiKey) => {
  try {
    if (!address || typeof address !== 'string' || address.trim() === '') {
      console.warn('Invalid or empty address provided');
      return null;
    }

    let adjustedAddress = address.trim();
    // Append ", Monrovia Liberia" if not included
    if (!adjustedAddress.toLowerCase().includes('liberia')) {
      adjustedAddress += ', Monrovia Liberia';
    }

    const encodedAddress = encodeURIComponent(adjustedAddress);
    const url = `https://api.geoapify.com/v1/geocode/search?text=${encodedAddress}&apiKey=${apiKey}`;


    const response = await fetch(url);
    if (!response.ok) {
      console.error('HTTP error:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();

    if (data.features && data.features.length > 0) {
      // Geoapify returns coords inside geometry.coordinates array [lon, lat]
      const [lon, lat] = data.features[0].geometry.coordinates;
      return { lat, lon };
    } else if (data.results && data.results.length > 0) {
      // Some responses may use results array
      const { lat, lon } = data.results[0];
      return { lat, lon };
    } else {
      console.log('No results or empty results');
      return null;
    }
  } catch (error) {
    console.error('Forward geocoding error', error);
    return null;
  }
};

// Helper to calculate miles between two points
export const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
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



