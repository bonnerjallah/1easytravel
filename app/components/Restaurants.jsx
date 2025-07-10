import {Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View} from 'react-native';
import { useState } from 'react';
// UI
import ThemedText from './ThemedText';
import Spacer from './Spacer';
import { Colors } from '../../constant/Colors';
import { Ionicons } from '@expo/vector-icons';
import ThemedCard from './ThemedCard';

import images from '../../constant/images';
import RestaurantsModal from './RestaurantsModal';



const Restaurants = ({ setShowEats }) => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [showRestaurentModal, setShowRestaurentModal] = useState(false); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  //MOCKUP DATA MAKE SURE TO REMOVE AND FETCH DATA FROM DATABASE
  const restaurents = [
    { title: "De' Calabash", foodType: "Loacal Cuisine - American", distance:"2.1 mi", image: images.calabash },
    { title: "Evelyn's Cuisine", foodType: "American", distance:"0.8 mi", image: images.evelyns },
    { title: "FuZion D'Afrique", foodType: "Caribbean", distance:"7.9 mi", image: images.fuzion },
    { title: 'The Eatery', foodType: "Asian", distance:"5.2 mi", image: images.eatery },
    { title: 'Diana Restaurant', foodType: "Indian", distance:"2.7 mi", image: images.diana },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText title variant="title">
          Restaurants
        </ThemedText>
        <TouchableOpacity onPress={() => setShowEats(true)}>
          <Ionicons name="arrow-forward" size={25} color={themed.text} />
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {restaurents.map((item, indx) => (
          <TouchableOpacity 
            key={indx} style={styles.itemCardWrapper} 
            onPress={() => {
              setShowRestaurentModal(true)
              setSelectedRestaurant(item);
            }}
          
          >
            <ThemedCard style={styles.card}>
              {item.image && <Image source={item.image} style={styles.image} />}
                <View style={{flexDirection:"row", columnGap: 10, marginTop: 5}}>
                    <View style={styles.restaurentsNameWrapper}>
                        <Image
                        source={images.bowl}
                        style={{ width: 26, height: 26, marginRight: 5, marginTop: -10 }}
                        />
                    </View>
                    <View>
                        <ThemedText numberOfLines={1} style={styles.titleText} variant='title' >
                            {item.title}
                        </ThemedText>
                        <ThemedText>
                            {item.foodType}
                            <Spacer  height = "0" width='10'/>
                            {item.distance}
                        </ThemedText>
                    </View>
                </View>
              
            </ThemedCard>
          </TouchableOpacity>
        ))}
      </ScrollView>

        <RestaurantsModal 
          isVisible={showRestaurentModal} 
          onClose={() => setShowRestaurentModal(false)} 
          restaurent={selectedRestaurant}
        />

    </View>
  );
};

export default Restaurants;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  itemCardWrapper: {
    width: 300,
    marginHorizontal: 10,
  },
  card: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  restaurentsNameWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    columnGap: 5
  },
  titleText: {
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 1,
  },
});
