import { StyleSheet, Pressable, View, Image } from 'react-native'

//Components
import icons from '../constant/icons'

//UI
import Spacer from './Spacer'
import ThemedText from './ThemedText'

const PreviousRides = () => {
  return (
    <View>
        <Pressable style={styles.prevTripWrapper}>
            <Image source={icons.address}  style={styles.iconStyle}/>
            <ThemedText>9208 Aloysia Ln</ThemedText>
        </Pressable>
        <Spacer height={15} />
        <Pressable style={styles.prevTripWrapper}>
            <Image source={icons.address}  style={styles.iconStyle}/>
            <ThemedText>9208 Aloysia Ln</ThemedText>
        </Pressable>    
    </View>
  )
}

export default PreviousRides

const styles = StyleSheet.create({
    prevTripWrapper:{
    borderWidth: .5,
    borderRadius: 10,
    borderColor: "gray",
    height: 70,
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    columnGap: 10
  },
  
  iconStyle:{
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 10
  }
})