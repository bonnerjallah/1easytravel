import { StyleSheet, Pressable, View, Image, TouchableOpacity } from 'react-native'

//Components
import icons from '../constant/icons'

//UI
import Spacer from './Spacer'
import ThemedText from './ThemedText'

const PreviousRides = () => {
  return (
    <View>
        <TouchableOpacity style={styles.prevTripWrapper}>
            <Image source={icons.address}  style={styles.iconStyle}/>
            <ThemedText>9208 Aloysia Ln</ThemedText>
        </TouchableOpacity>
        <Spacer height={15} />
        <TouchableOpacity style={styles.prevTripWrapper}>
            <Image source={icons.address}  style={styles.iconStyle}/>
            <ThemedText>9208 Aloysia Ln</ThemedText>
        </TouchableOpacity>    
    </View>
  )
}

export default PreviousRides

const styles = StyleSheet.create({
    prevTripWrapper:{
    borderRadius: 10,
    borderColor: "gray",
    height: 70,
    alignItems: "center",
    padding: 5,
    flexDirection: "row",
    columnGap: 10,
    backgroundColor: "rgba(0, 179, 224, 0.2)"
  },
  
  iconStyle:{
    backgroundColor: "#60cd83",
    width: 30,
    height: 30,
    padding: 5,
    borderRadius: 10
  }
})