import { Image, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

// UI
import { Colors } from "../../constant/Colors";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import icons from "../../constant/icons" 
import images from '../../constant/images';
import Spacer from '../../components/Spacer';


// State Management
import { useSetAtom } from 'jotai';
import { userLocationAtom } from '../../atoms/locationAtoms';

// SubComponents
import Rides from '../../components/Rides';
import Eats from '../../components/Eats';



const Home = ({}) => {

  const setLocation = useSetAtom(userLocationAtom);
  const [showEats, setShowEats] = useState(false)

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

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
      <Spacer height={20}/>

      {/* TOGGLE BUTTON */}
      <View style= {styles.headerManuContainer}> 
        <TouchableOpacity 
          style={[styles.screenSelect, !showEats && styles.activeTab]}
          onPress={() => setShowEats(false)}
        >
          <Image source={icons.car} />
          <ThemedText  variant='title' title>Rides</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.screenSelect, showEats && styles.activeTab]}
          onPress={() => setShowEats(true)}        
        >
          <Image source={images.food} />
          <ThemedText variant='title' title>Eats</ThemedText>
        </TouchableOpacity>
      </View>

      {/* SUB COMPONENTS */}
      {showEats ? <Eats /> : <Rides setShowEats={setShowEats} />}
      
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerManuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    columnGap: "5"
  },
  screenSelect: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: 'lightgray',
    width: "50%",
    height: 50,
    justifyContent: "center",
  },
  activeTab: {
    borderBottomColor: 'black',
  }
});
