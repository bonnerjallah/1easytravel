import { StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router';

//UI
import ThemedButton from '../../components/ThemedButton';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedTextInput from '../../components/ThemedTextInput';
import Spacer from '../../components/Spacer';
import { Colors } from '../../constant/Colors';
import Backbutton from "../../components/Backbutton";
import icons from '../../constant/icons';
import { Ionicons } from '@expo/vector-icons';


const AddCreditCard = () => {
  return (
    <ThemedView>
        <Spacer />

        <View style={{ flexDirection: "row",  alignItems: "center", columnGap: 10 }}>
            <Backbutton />
            <ThemedText>Add credit or debit card</ThemedText>
        </View>

        <View>
            <ThemedText>Card Name</ThemedText>
            <ThemedTextInput
                placeholder = "Card holder full name"
            />
        </View>
        <View>
            <ThemedText>Card Number</ThemedText>
            <ThemedTextInput 
                placeholder ="**** **** **** **** ****"
            />
        </View>
        <View>
            <View>
                <ThemedText>Exp Date</ThemedText>
                <ThemedTextInput
                    placeholder = "00/00"
                />
            </View>
            <View>
                <ThemedText>CVV</ThemedText>
                <ThemedTextInput
                    placeholder = "000"
                />
            </View>
        </View>

        <ThemedButton>
            <ThemedText>ADD CARD</ThemedText>
        </ThemedButton>
    </ThemedView>
  )
}

export default AddCreditCard

const styles = StyleSheet.create({})