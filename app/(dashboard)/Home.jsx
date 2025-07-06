import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as Location from 'expo-location';

import { Colors } from "../../constant/Colors";
import ThemedView from "../components/ThemedView";
import ThemedText from "../components/ThemedText";

import { useSetAtom } from 'jotai';
import { userLocationAtom } from '../../atoms/locationAtoms';

const Home = () => {
  const setLocation = useSetAtom(userLocationAtom);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          console.warn('Permission to access location was denied');
          return;
        }

        // ✅ Define the options explicitly
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High, // <— safer
        });

        const { latitude, longitude } = location.coords;
        const timestamp = new Date(location.timestamp).toISOString();


        setLocation({ latitude, longitude, timestamp });

      } catch (err) {
        console.error('Location error:', err);
      }
    })();
  }, []);

  return (
    <ThemedView style={styles.container} safe={true}>
      <ThemedText>Home</ThemedText>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
