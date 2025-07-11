import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { useEffect } from 'react'

//UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import {Colors} from "../../constant/Colors"
import images from '../../constant/images'

//State Management
import { useAtom } from 'jotai';
import { userTripsAtom, userTripsLoadingAtom, userTripsErrorAtom } from '../../atoms/tripsAtoms';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Trips = () => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const [trips, setTrips] = useAtom(userTripsAtom);
  const [loading, setLoading] = useAtom(userTripsLoadingAtom);
  const [errMsg, setError] = useAtom(userTripsErrorAtom);

  // useEffect(() => {
  //   const fetchTrips = async () => {
  //     setLoading(true)

  //     try {
  //       const token = await AsyncStorage.getItem("userToken")
  //       const res = await fetch('https://api.example.com/trips', {
  //         headers: {
  //           Authorization: `Bearer ${token}`
  //         }
  //       })

  //       if(!res.ok) throw new Error("Failed to fetch trips data")

  //       const data = await res.json();
  //       setTrips(data);
  //       setError(null);
        
  //     } catch (error) {
  //       console.log("error fetchind trips data", error)
  //       setTrips([])
  //       setError(error.message)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchTrips()

  // }, [])

  return (
    <ThemedView style={styles.container} safe = {true}>
      <Spacer height={20}/>
      <View>
        <ThemedText variant='heading' title style={{fontSize: 30}} >Trips History</ThemedText>
        <ThemedText style={{fontWeight:"600"}} title>Your activity</ThemedText>
      </View>

      <Spacer />

      {loading && <ThemedText title>Loading...</ThemedText>}
      {errMsg && <Text>Error: {errMsg}</Text>}

       {!loading && !errMsg && trips.length > 0 ? (
        <View style={{ marginTop: 20 }}>
          {trips.map((trip, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <View>
                <Image source={images.map} />
              </View>

              <View>
                <Text style={{ fontWeight: 'bold' }}>Trip #{index + 1}</Text>
                <Text>To: {trip.to}</Text>
                <Text>Date: {trip.date}</Text>
              </View>
              
              <View>
                <Text>$:{trip.cost}</Text>
                <Text>-{trip.status}</Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        !loading && !errMsg && (
          <View style={{alignItems:"center", justifyContent:"center", height:"80%"}}>
            <Image source={images.tripScreenIcon} />
            <ThemedText>No trips found</ThemedText>
          </View>
        )
      )}


    </ThemedView>
  )
}

export default Trips

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})