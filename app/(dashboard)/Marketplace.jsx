import { Image, StyleSheet, Text, useColorScheme, View, TouchableOpacity } from 'react-native'

//UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import ThemedCard from '../../components/ThemedCard'
import images from '../../constant/images'
import icons from "../../constant/icons"


const marketPlaceItems = [
  { title: 'Food', image: images.food },
  { title: 'Ride', image: icons.car },
  { title: 'Rental Cars', image: images.rentalKeys },
  { title: 'Grocery', image: images.grocery }, 
  { title: 'Health', image: images.meds1 },
  { title: 'Package Delivery', image: images.pkgBox },
]

const Marketplace = () => {
  return (
    <ThemedView style={styles.container} safe>
      <Spacer height={20}/>

      <View>
        <ThemedText variant='heading' title style={{fontSize: 30}}>Marketplace</ThemedText>
        <ThemedText >Wherever you go, and whatever you crave, we’ve got you covered.</ThemedText>
      </View>

      <Spacer height={30} />

      <View style={styles.cardContainer}>
        {marketPlaceItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.cardWrapper}>
                <ThemedCard style={styles.cardStyle} >
                    <ThemedText style={styles.cardText}>{item.title}</ThemedText>
                    {item.image && (
                        <Image
                            source={item.image}
                            style={styles.image}
                        />
                    )}
                </ThemedCard>
            </TouchableOpacity>
        )) }
      </View>


    </ThemedView>
  )
}

export default Marketplace

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
   cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    rowGap: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    rowGap: 10,
  },
  cardWrapper: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  cardStyle:{
    width: '90%',
    aspectRatio: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },

  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
})