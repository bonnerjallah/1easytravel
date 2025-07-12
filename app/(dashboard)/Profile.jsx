import { Image, TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'


//UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedButton from '../../components/ThemedButton'
import Spacer from '../../components/Spacer'
import images from '../../constant/images'
import icons from "../../constant/icons"
import ThemedTextInput from "../../components/ThemedTextInput"


//STATE MANAGEMENT
import { useAtomValue, useSetAtom } from 'jotai'
import {userAtoms} from "../../atoms/userAtoms"


//FireBase
import { auth } from '../../firebaseConfig'


const profileOptions = [
  {
    label: 'My Trips',
    icon: icons.trips,
    // route: "/trips"
  },
  {
    label: 'Payment Settings',
    icon: icons.cashIcon,
    // route: "/paymentSettings"
  },
  {
    label: 'Customer Support',
    icon: icons.customerSupport,
    // route: "customerSupport"
  },
  {
    label: 'Manage Address',
    icon: icons.address,
    // route: "manageAddress"
  },
  {
    label: 'Settings',
    icon: icons.settings,
    // route: "settings"
  },
  {
    label: 'Car Rental',
    icon: icons.carRental,
    // route: "carRental"
  },
];







const Profile = () => {

  const user = useAtomValue(userAtoms)
  const setUser = useSetAtom(userAtoms);

  useEffect(() => {
    if(user){
      console.log("user", user)
    }
  }, [])

  const handleSignOut = async () => {
    try {

      await auth.signOut();
      setUser(null);
      router.replace("/Login"); 

    } catch (error) {
      console.log("Sign out error:", error);
    }
  };


  return (
    <ThemedView style={styles.container} safe = {true}>
      <Spacer height={20} />

      <ThemedText variant='heading' title>Profile</ThemedText>

      <Spacer height={20} />

      <View  style={{flexDirection:"row", alignItems:'center', columnGap:10}}>
        <TouchableOpacity
          onPress={() => router.push("/EditProfile")}
        >
          {user?.profilePic ? (
            <Image
              source={{ uri: user.profilePic }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          ) : (
            <Image
              source={images.mainProfile}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
        )}
        </TouchableOpacity>
        {user && (
          <View style={{ rowGap: 10 }}>
            <ThemedText title variant='tile'>{user.firstName} {user.lastName}</ThemedText>
            <ThemedText>+{user.phoneNumber}</ThemedText>
            <ThemedText>{user.email}</ThemedText>
          </View>
        )}
      </View>

      <Spacer />

      <View style={{rowGap: 10}}>
        {profileOptions.map((item, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10 }}
            // onPress={router.push(item.route)}
          >
            <Image source={item.icon} style={{ width: 24, height: 24, tintColor: "#778da9", }} />
            <ThemedText>{item.label}</ThemedText>
          </TouchableOpacity>
        ))}

        <TouchableOpacity onPress={handleSignOut} style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20 }}>
          <Image source={icons.logout} style={{ width: 24, height: 24, tintColor: "#415a77" }} />
          <Text style={{ color: 'red' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>



    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})