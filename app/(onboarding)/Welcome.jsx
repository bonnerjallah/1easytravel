  import React, { useRef, useState } from 'react';
  import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
  import Swiper from 'react-native-swiper';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { router } from 'expo-router';
  import { ArrowRight } from 'lucide-react-native';


  import { Onboarding } from '../../constant/index';
  import ThemedView from '../../components/ThemedView';
  import ThemedText from '../../components/ThemedText';
  import Spacer from '../../components/Spacer';
  import ThemedButton from '../../components/ThemedButton';

  const { width, height } = Dimensions.get('window');

  export default function WelcomeScreen() {
    const swiperRef = useRef(null);
    
    const [activeIndex, setActiveIndex] = useState(0);
    const isLastSlide = activeIndex === Onboarding.length - 1

    const handleNext = () => {
      if (swiperRef.current && swiperRef.current.scrollBy) {
        swiperRef.current.scrollBy(1);
      }
    };

    const handleFinish = async () => {
      await AsyncStorage.setItem('seenOnboarding', 'true');
      router.replace('../(auth)/Login'); 
      // router.replace("../(dashboard)/Home")       
    };

    return (
      <ThemedView style={{ flex: 1 }} safe>
        <TouchableOpacity onPress={handleFinish} style={styles.skipBtn}>
          <ThemedText style={{ fontWeight: 'bold' }} variant='subtitle'>Skip</ThemedText>
        </TouchableOpacity>

        <Swiper
          loop={false}
          ref={swiperRef}
          showsButtons={false}
          onIndexChanged={setActiveIndex}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
          paginationStyle={{ bottom: 50 }}
        >
          {Onboarding.map((item) => (
            <View style={styles.slide} key={item.id}>
              <View>
                <Image source={item.image} style={styles.image} resizeMode="contain" />
              </View>
              <Spacer />
              <ThemedText style={styles.title} variant='title'>{item.title}</ThemedText>
            </View>
          ))}
        </Swiper>


        <ThemedButton 
          style={styles.arroRightStyle}
          onPress={isLastSlide ? handleFinish : handleNext}
        >
          {isLastSlide ? (
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#fff' }}>
              GET STARTED
            </Text>
          ) : (
            <ArrowRight size={48} color="#fff" />
          )}
        </ThemedButton>

      </ThemedView>
    );
  }

  const styles = StyleSheet.create({
    skipBtn: {
      position: 'absolute',
      top: 65,
      right: 20,
      zIndex: 10,
      borderBottomWidth: 1
    },
    slide: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 20,
      marginTop: 50
    },
    image: {
      width: width * 0.8,
      height: height * 0.5,
    },
    title: {
      marginTop: -100
    },
    dot: {
      backgroundColor: '#ccc',
      width: 10,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 3,
    },
    activeDot: {
      backgroundColor: '#000',
      width: 25,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 3,
    },

    arroRightStyle:{
      backgroundColor: "black",
      color: "white",
      padding: 10,
      borderRadius: 10,
      position: "absolute",
      bottom: 130,
      alignSelf: "center",
      zIndex: 10,
      width: 250,
      height: 50,
      justifyContent: "center",
      alignItems: "center"
    }
  });
