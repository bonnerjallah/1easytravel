import { Pressable, StyleSheet, ScrollView, useColorScheme, Image, View} from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'


//UI
import ThemedText from './ThemedText'
import Spacer from "../components/Spacer"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../constant/Colors'

//Components
import PreviousRides from './PreviousRides'
import Suggestions from './Suggestions'
import Restaurants from "./Restaurants"


const Rides = ({setShowEats, setShowRestaurentModal}) => {

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light



  return (

    <ScrollView>
      <Spacer height={20}/>

      <Pressable 
        style={{
          borderRadius: 40,
          height: 80, 
          flexDirection: "row", 
          columnGap: 5, 
          backgroundColor: "rgba(0, 179, 224, 0.2)",
          alignItems: "center",
          padding: 3,
        }}
        onPress={() => router.push("/(transport)/WhereTo")}
      >
        <Ionicons 
          name='search'
          size={35}
        />
        <ThemedText variant='title' title = {true} style={{fontSize:25}}>Where to?</ThemedText>
      </Pressable>

      <Spacer height={30}/>

      <View>
        <PreviousRides />
      </View>

      <Spacer height={20} />

      <Suggestions />

      <Spacer height={20} />

      <Restaurants  setShowEats={setShowEats} setShowRestaurentModal={setShowRestaurentModal}/>


    </ScrollView>
  )
}

export default Rides

const styles = StyleSheet.create({
  
})