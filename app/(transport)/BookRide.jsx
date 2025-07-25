import { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Component
import RideLayout from '../../components/RideLayout'
import ThemedButton from '../../components/ThemedButton'
import ThemedText from '../../components/ThemedText'
import ThemedView from '../../components/ThemedView'
import Spacer from '../../components/Spacer'
import ThemedCard from "../../components/ThemedCard"
import { Colors } from '../../constant/Colors'
import icons from '../../constant/icons'

// State Management
import { useAtomValue } from 'jotai'
import { selectedDriverAtom } from '../../atoms/selectedDriverAtoms'
import { destinationAtom } from '../../atoms/destinationAtoms'
import { userPickUpLocation } from '../../atoms/locationAtoms'

//API KEY
import { EXPO_PUBLIC_GEOAPIFY_API_KEY } from '@env';

//LIB
import { addressToCoord } from '../../lib/map';
import { reverseGeocode } from '../../lib/map'


const BookRide = () => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const yourDriver = useAtomValue(selectedDriverAtom)
  const destination = useAtomValue(destinationAtom)
  const PickupLocation = useAtomValue(userPickUpLocation)

  const [coordToAddressText, setCoordToAddressText] = useState()


  const apiKey = EXPO_PUBLIC_GEOAPIFY_API_KEY;

  //Reverse to get coordinates
  useEffect(() => {
    const getCoordinates = async () => {
      if(destination.lat && destination.lon) {
        console.log("desdes", destination)
        const coordinates = await reverseGeocode(
          destination.lat,
          destination.lon,
          apiKey
        );
        
        if(coordinates) {
          setCoordToAddressText(coordinates) 
        }
      }
    }
    getCoordinates()
  }, [destination])

  console.log("addressssssss", coordToAddressText)


  //Stars Array
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <View style={{ flexDirection: 'row', height:"100%", alignItems:"center", justifyContent:"center"}}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Ionicons key={`full-${i}`} name="star" size={16}  color={themed.tabIconColor} />
        ))}
        {hasHalfStar && (
          <Ionicons name="star-half" size={16}  color={themed.tabIconColor}/>
        )}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Ionicons key={`empty-${i}`} name="star-outline" size={16}  color={themed.tabIconColor} />
        ))}
      </View>
    );
  };

  

  return (
    <RideLayout snapPoints={["25%", "80%"]} index={1}>
      <View style={styles.container}>
        <ThemedText variant="title" title>
          Ride Information
        </ThemedText>

        <Spacer height={5} />

        {yourDriver && (
          <View style={{alignSelf:"center"}}>
            <Image 
              source={yourDriver.profilePic} 
              style={styles.driverImage} 
              resizeMode="contain" 
            />
            <Spacer height={15} />
            <View style={{flexDirection: "row", alignItems:"center", justifyContent:"center"}}>
              <ThemedText>Rating: </ThemedText>
              <Text>{renderStars(Number(yourDriver.rating))}</Text>
            </View>

            <ThemedView style={styles.cardWrapper}>
                <ThemedView style={styles.card}>
                  <ThemedCard style={{width: "100%", alignItems:"center"}}>
                    <ThemedText>
                      {yourDriver.name}
                    </ThemedText>
                  </ThemedCard>
                  <ThemedCard style={{width: "100%", justifyContent:"center", alignItems:"center", flexDirection:"row", columnGap:10}}>
                      <Image source={icons.dollarsign} style={{ width: 25, height: 25, marginLeft: 5, padding: 1,  tintColor: themed.tabIconColor, backgroundColor:"yellow", borderRadius:10  }} />
                      <ThemedText>Price: $ {yourDriver.driverCar.price.toFixed(2)}</ThemedText>
                  </ThemedCard>
                </ThemedView>

                <View style={{padding: 10, rowGap: 10}}>
                  <ThemedText>From:</ThemedText>

                  <ThemedCard style={{flexDirection:"row", justifyContent:"center", alignItems:"center", columnGap: 10}}>
                    <Image source={icons.locationIcon} />
                    <ThemedText>
                      {PickupLocation}
                    </ThemedText>
                  </ThemedCard>

                  <ThemedText>To:</ThemedText>

                  <ThemedCard style={{flexDirection:"row", justifyContent:"center", alignItems:"center", columnGap: 10}}>
                    <Image source={icons.marker} />
                    <ThemedText>
                      {coordToAddressText}
                    </ThemedText>
                  </ThemedCard>
                </View>
            </ThemedView>

            <ThemedButton >
              <ThemedText variant="title" style={{ textAlign: 'center', color: themed.buttontitle }}>
                Confirm destination
              </ThemedText>
            </ThemedButton>
            
          </View>
        )}
      </View>
    </RideLayout>
  )
}

export default BookRide

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    paddingBottom: 80
  },
  cardWrapper: {
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
  },
  driverImage: {
    alignSelf: "center",
    width: 100,
    height: 100,
  },
  card: {
    width: 320,
    alignItems: 'center',
    paddingVertical: 12,
    rowGap:10,
    
  },
})
