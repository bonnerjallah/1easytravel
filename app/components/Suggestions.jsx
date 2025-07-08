import { Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { router } from 'expo-router'

// UI
import ThemedText from './ThemedText'
import Spacer from './Spacer'
import ThemedCard from './ThemedCard'
import images from '../../constant/images'
import icons from '../../constant/icons'

const suggestionItems = [
  { title: 'Food', image: images.bowl },
  { title: 'Ride', image: icons.car },
  { title: 'Rental Cars', image: images.rentalKeys },
  { title: 'Grocery', image: images.grocery }, 
  { title: 'Health', image: images.meds1 },
  { title: 'Package Delivery', image: images.pkgBox },
]

const Suggestions = () => {
  return (
    <>
      <View style={styles.header}>
        <ThemedText title variant="title">Suggestions</ThemedText>
        <TouchableOpacity 
            onPress={() => router.replace("/(dashboard)/Marketplace")}  
        >
            <ThemedText variant="label" style={{paddingRight: 10 }}>See all</ThemedText>
        </TouchableOpacity>
      </View>

      <Spacer height={20} />

      <View style={styles.cardContainer}>
        {suggestionItems.map((item, index) => (
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
        ))}
      </View>
    </>
  )
}

export default Suggestions

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '80%',
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
  cardText: {
    fontSize: 12,
    textAlign: 'center',
  },
})
