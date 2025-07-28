import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'


//UI
import ThemedButton from '../../components/ThemedButton';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import { Colors } from '../../constant/Colors';
import Backbutton from "../../components/Backbutton";
import icons from '../../constant/icons';
import { Ionicons } from '@expo/vector-icons';

import images from '../../constant/images';


const PaymentSettings = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

  return (
    <ThemedView  style={styles.container} safe>
        <Spacer height={20}/>

        <View style={{ flexDirection: "row",  alignItems: "center", columnGap: 10 }}>
            <Backbutton />
            <ThemedText variant='heading' title>Payment Settings</ThemedText>
        </View>

        <Spacer height={15}/>

        <ThemedText title variant='title' style={{marginLeft: 30}}>Payment methods</ThemedText>
        <Spacer height={20} />

        <View style={{rowGap:20}}>
            <View style={{rowGap: 5}}>
                <ThemedText variant='title' title>Credit& Debit card</ThemedText>
                <TouchableOpacity 
                    style={styles.optionsWrapper}
                    onPress={() => router.push('/(profile)/AddCreditCard')}

                >
                    <Ionicons name='card-outline' size={35} color="#00a8e8"/>
                    <ThemedText>Add credit or debit card</ThemedText>
                    <Ionicons 
                        name='chevron-forward'
                        size={25}
                        style={styles.iconsStyle}
                        color={themed.tabIconColor}
                    />
                </TouchableOpacity>
            </View>

            <View style={{rowGap: 5}}>
                <ThemedText variant='title' title>More Payment options</ThemedText>
                <TouchableOpacity style={styles.optionsWrapper}>
                    <Image source={images.momomoney} style={{ width: 34, height: 34, }} />
                    <ThemedText>Momo from MTN</ThemedText>
                    <Ionicons 
                        name='chevron-forward'
                        size={25}
                        style={styles.iconsStyle}
                        color={themed.tabIconColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionsWrapper}>
                    <Image source={images.orange} style={{ width: 34, height: 34, }} />
                    <ThemedText>Orange Money</ThemedText>
                    <Ionicons 
                        name='chevron-forward'
                        size={25}
                        style={styles.iconsStyle}
                        color={themed.tabIconColor}
                    />
                </TouchableOpacity>
            </View>
            
        </View>

    </ThemedView>
  )
}

export default PaymentSettings

const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    iconsStyle:{
        position:"absolute",
        right: 2
    },
    optionsWrapper:{
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#778da9",
        flexDirection:"row",
        columnGap: 10,
        height: 70,
        alignItems: "center",
        padding: 10
    }
})