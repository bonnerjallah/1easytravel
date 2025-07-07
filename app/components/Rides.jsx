import { Pressable, StyleSheet, ScrollView, useColorScheme, Image, View} from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router'


//UI
import ThemedText from './ThemedText'
import Spacer from "../components/Spacer"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constant/Colors'

//Components
import PreviousRides from './PreviousRides'
import Suggestions from './Suggestions'


const Rides = () => {

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light

  const [showWheretoModal, setShowWhereModal] = useState(false)


  return (

    <ScrollView>
      <Spacer height={20}/>

      <Pressable 
        style={{
          borderRadius: 40,
          height: 80, 
          flexDirection: "row", 
          columnGap: 5, 
          backgroundColor: "#dee2e6",
          alignItems: "center",
          padding: 3,
        }}
        onPress={() => router.push("/(transport)/WhereTo")}
      >
        <Ionicons 
          name='search'
          size={35}
        />
        <ThemedText variant='subtitle' style={{fontSize:25}}>Where to?</ThemedText>
      </Pressable>

      <Spacer height={30}/>

      <View>
        <PreviousRides />
      </View>

      <Spacer height={20} />

      <Suggestions />


    </ScrollView>
  )
}

export default Rides

const styles = StyleSheet.create({
  
})