import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import ThemedButton from '../../components/ThemedButton';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import Spacer from '../../components/Spacer';
import { Colors } from '../../constant/Colors';
import Backbutton from "../../components/Backbutton";

// STATE MANAGEMENT
import { useAtomValue } from 'jotai';
import { userAtoms } from '../../atoms/userAtoms';

// Firestore
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { router } from 'expo-router';

const EditProfile = () => {
  const user = useAtomValue(userAtoms);
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [errMsg, setErrMsg] = useState(null);
  const [userData, setUserData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    birthday: user?.birthday || '',
    phoneNumber: user?.phoneNumber || '',
    address: user?.address || '',
    gender: user?.gender || '',
    profilePic: user?.profilePic || '',
  });

  const userLabel = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'birthday', label: 'Birthday' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'address', label: 'Address' },
    { key: 'gender', label: 'Gender' },
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedImage = result.assets[0].uri;
      setUserData((prev) => ({ ...prev, profilePic: selectedImage }));
    }
  };

  const handleUserDataSubmit = async () => {
    try {
      const userRef = doc(db, 'users', user.uid);

      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date(),
      });

      router.back();
    } catch (error) {
      console.log('Error editing user data', error);
      setErrMsg('Error editing profile');
      setTimeout(() => setErrMsg(null), 3000);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <Spacer height={20} />
        <View style={{ flexDirection: "row",  alignItems: "center", columnGap: 10 }}>
          <Backbutton />
          <ThemedText variant="heading" title>
            Edit Profile
          </ThemedText>
        </View>

        <Spacer height={20} />

        <TouchableOpacity onPress={pickImage} style={{ alignSelf: 'center' }}>
          {userData.profilePic ? (
            <Image
              source={{ uri: userData.profilePic }}
              style={{ width: 100, height: 100, borderRadius: 100 }}
            />
          ) : (
            <View style={styles.profileImageBox}>
              <Ionicons name="camera" size={40} color="#aaa" />
            </View>
          )}
        </TouchableOpacity>

        {userLabel.map((item, idx) => (
          <View key={idx} style={{ marginTop: 15 }}>
            <ThemedText>{item.label}</ThemedText>
            <TextInput
              placeholder={item.label}
              style={styles.input}
              value={userData[item.key]}
              onChangeText={(text) =>
                setUserData((prev) => ({ ...prev, [item.key]: text }))
              }
            />
          </View>
        ))}

        <ThemedButton
          style={{ justifyContent: 'center', alignItems: 'center', backgroundColor:"#778da9" }}
          onPress={handleUserDataSubmit}
        >
          <ThemedText
            style={[styles.textStyle, { color: themed.buttontitle }]}
            variant="title"
          >
            Submit
          </ThemedText>
        </ThemedButton>

        {errMsg && <Text style={{ color: 'red', textAlign: 'center' }}>{errMsg}</Text>}
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 4,
    backgroundColor: "#ced4da"
  },
  profileImageBox: {
    borderWidth: 1,
    borderColor: '#778da9',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
  },
});
