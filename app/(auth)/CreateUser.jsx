import { Keyboard, StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';


// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from '../../firebaseConfig';

// Components
import BackButton from '../../components/Backbutton';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ThemedButton from '../../components/ThemedButton';
import ThemedTextInput from '../../components/ThemedTextInput';
import Spacer from '../../components/Spacer';
import { Colors } from '../../constant/Colors';

const CreateUser = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');

  const handleNameSubmit = async () => {
    if (!firstName || !lastName) {
      setError("Please enter both first and last name");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        setError("No authenticated user found");
        return;
      }

      // ✅ Update the existing user's document with name
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        firstName,
        lastName,
        updatedAt: new Date()
      });

      router.replace("/GetLocation");
    } catch (err) {
      setError("Something went wrong while saving your name");
      console.error(err);
    }
  };

  return (

   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container} safe = {true}>
            <BackButton />
            <Spacer />

            <ThemedText variant="title" style={{ fontSize: 30 }}>What is your name?</ThemedText>
            <ThemedText>Let us know how to properly address you</ThemedText>

            <Spacer />

            <View>
                <ThemedText>First Name</ThemedText>
                <Spacer  height={5}/>
                <ThemedTextInput
                placeholder="Enter your first name"
                onChangeText={setFirstName}
                value={firstName}
                />
            </View>

            <Spacer height={30} />

            <View>
                <ThemedText>Surname</ThemedText>
                <Spacer  height={5}/>
                <ThemedTextInput
                placeholder="Enter your surname"
                onChangeText={setLastName}
                value={lastName}
                />
            </View>

            <Spacer />

            {error ? (
                <ThemedText style={{ color: 'red', textAlign: 'center' }}>
                {error}
                </ThemedText>
            ) : null}

            <ThemedButton 
                style={{
                    position: "absolute",
                    width: "80%",
                    bottom: 100,
                    alignSelf: "center",
                }}
                onPress={handleNameSubmit}
            >
                <ThemedText style={[styles.bttn, {color: themed.buttontitle }]}>Submit</ThemedText>
            </ThemedButton>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

export default CreateUser;

const styles = StyleSheet.create({
    container:{
        flex: 1
    },

    bttn:{
        textAlign: "center",
        fontSize: 20,
    }
});
