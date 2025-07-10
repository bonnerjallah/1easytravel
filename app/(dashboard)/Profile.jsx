import { Pressable, StyleSheet, Text, View } from 'react-native'
import { router } from 'expo-router'

//UI
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import ThemedButton from '../components/ThemedButton'


//FireBase
import { auth } from '../../firebaseConfig'
import { getAuth } from 'firebase/auth'

const Profile = () => {


  getAuth().onAuthStateChanged((user) => {
    if(!user) router.replace("/Login")
  })

  return (
    <ThemedView style={styles.container} safe = {true}>
      <Text>Profile</Text>

      <Pressable
        onPress={() => auth.signOut()}
      >
          <Text>Sign Out</Text>
      </Pressable>
    </ThemedView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})