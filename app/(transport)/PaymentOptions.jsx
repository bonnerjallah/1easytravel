import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'

import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'

import RideLayout from '../../components/RideLayout'
import icons from '../../constant/icons'
import { Ionicons } from '@expo/vector-icons'

import { Colors } from 'react-native/Libraries/NewAppScreen'
import images from '../../constant/images'
import { router } from 'expo-router'

const PaymentOptions = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

  return (
    <RideLayout snapPoints={["25%", "40%"]} index={2} >
        <ThemedView  style={styles.container}  >
            <ThemedText variant='title' title>Payment Options</ThemedText>

            <Spacer height={25} />

            <TouchableOpacity 
                style={{flexDirection:"row", justifyContent:"space-between"}}
                onPress={() => {
                    router.push("(transport)/BookRide")
                }}
            >
                <View style={{flexDirection:"row", columnGap:'10', justifyContent:"center"}}>
                    <Image source={icons.cashIcon} width={34} height={34} tintColor={"green"} />
                    <ThemedText variant='title'>Cash</ThemedText>
                </View>
                <Ionicons 
                    name='chevron-forward'
                    size={25}
                    style={styles.iconsStyle}
                    color={themed.tabIconColor}
                />            
            </TouchableOpacity>

            <Spacer height={35} />

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row", columnGap:'10', justifyContent:"center"}}>
                    <Image source={images.momomoney} style={{width: 25, height: 25}} />
                    <ThemedText variant='title'>Momo from MTN</ThemedText>
                </View>
                <Ionicons 
                    name="chevron-forward" 
                    size={25} 
                    style={styles.iconsStyle} 
                    color={themed.tabIconColor}
                />
            </TouchableOpacity>

            <Spacer height={35} />

            <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row", columnGap:'10', justifyContent:"center"}}>
                    <Image source={images.orange} style={{width: 25, height: 25}} />
                    <ThemedText variant='title'>Orange</ThemedText>
                </View>
                <Ionicons 
                    name="chevron-forward" 
                    size={25} 
                    style={styles.iconsStyle} 
                    color={themed.tabIconColor}
                />
            </TouchableOpacity>

            <Spacer height={35} />

             <TouchableOpacity style={{flexDirection:"row", justifyContent:"space-between"}}>
                <View style={{flexDirection:"row", columnGap:'10', justifyContent:"center", alignItems:"center"}}>
                    <Ionicons name='card-outline' size={35} color="#00a8e8"/>
                    <ThemedText variant='title'>Credit or Debit card</ThemedText>
                </View>
                <Ionicons 
                    name="chevron-forward" 
                    size={25} 
                    style={styles.iconsStyle} 
                    color={themed.tabIconColor}
                />
            </TouchableOpacity>


        </ThemedView>
    </RideLayout>
    
  )
}

export default PaymentOptions

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 10,
        paddingBottom:90
    },
    iconsStyle:{
    }
    
})