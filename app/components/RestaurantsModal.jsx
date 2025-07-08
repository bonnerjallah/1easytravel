import { StyleSheet, Text, View, TouchableOpacity, Modal, Image, useColorScheme } from 'react-native';

import images from '../../constant/images';

//UI
import ThemedText from './ThemedText'
import Spacer from "../components/Spacer"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constant/Colors'
import ThemedButton from "./ThemedButton"



const RestaurantsModal = ({ isVisible, onClose, restaurent }) => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light


  return (
    <Modal
      visible={isVisible}
      animationType="slide" 
      transparent={true}
    >
        <View style={styles.container}>

            <View style={styles.modalContent}>
                <TouchableOpacity onPress={onClose} style={{position:"absolute", right: 10, zIndex: 1}}>
                    <Ionicons 
                        name='close-circle'
                        size={45}
                        style={{zIndex: 10, color: "black"}}
                    />
                </TouchableOpacity>
                <View>
                    <Image source={restaurent?.image} style={{ width: '100%', height: 200, borderRadius: 10, resizeMode: 'cover' }} />
                </View>
                <Spacer height={10}/>
            <View>
                <ThemedText style={{color: "black", fontSize: 30}} title variant='title'>{restaurent?.title}</ThemedText>
                <ThemedText title variant='subtitle'>{restaurent?.foodType}</ThemedText>
                <ThemedText>{restaurent?.distance}</ThemedText>
            </View>

            <ThemedButton style={{alignItems:"center", justifyContent:"center", flexDirection:"row", columnGap: 10}}>
                <Ionicons 
                    name='restaurant'
                    size={25}
                    color={themed.buttontitle}                
                    />
                <ThemedText style={{color: themed.buttontitle }} variant='title'>Start order</ThemedText>
            </ThemedButton>

            <ThemedButton style={{alignItems:"center", justifyContent:"center", marginTop: -1, flexDirection:"row", columnGap: 10}}>
                <Ionicons 
                    name='car-sport'
                    size={25}
                    color={themed.buttontitle}                
                />
                <ThemedText style={{color: themed.buttontitle }} variant='title'>Request ride</ThemedText>
            </ThemedButton>

                
            </View>

        </View>
    </Modal>
  );
};

export default RestaurantsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end", 
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: 500, 
  },
});
