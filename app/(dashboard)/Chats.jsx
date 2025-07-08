import { Image, Pressable, StyleSheet, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router';


//UI
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'
import ThemedCard from '../components/ThemedCard'
import {Colors} from "../../constant/Colors"
import images from '../../constant/images'
import icons from '../../constant/icons'

console.log("profile image", images.profileImage1)


const Chats = () => { 

  const [activeChatTab, setActiveChatTab] = useState("messages")

  return (
    <ThemedView style={styles.container} safe = {true}>
      <Spacer height={20}/>

      <ThemedText variant='heading' title style={{fontSize: 30}}>Chats</ThemedText>

      {/* TOGGLE BETWEEN MESSAGE AND CALLS */}
      <View style={{flexDirection: "row"}}>
        <Pressable
          onPress={() => setActiveChatTab("messages")}
          style={styles.msgTab}
        >
          <ThemedText 
            style={ activeChatTab === "messages" ? styles.activeText : styles.inactiveText}
          >
            Messages
          </ThemedText>
        </Pressable>


        <Pressable
          onPress={() => setActiveChatTab("calls")}
          style={styles.msgTab}
        >
          <ThemedText
            style={ activeChatTab === "calls" ? styles.activeText : styles.inactiveText}

          >
            Calls
          </ThemedText>
        </Pressable>
      </View>

      <Spacer height={20} />

      {/*DISPLAY MESSAGES OR CALLS */}
      {activeChatTab === "messages" ? (
        <View style={styles.messagesAndCallsContainer}>

          <View style={styles.messageWrapper}>
            
            <View style={styles.profilePicWrapper}>
              <Image source={images.profileImage3} style={styles.profileImage} />
              <TouchableOpacity
                onPress={() => router.push('/(textandcallroom)/TextRoom')}
              >
                <ThemedText variant='title'>John Doe</ThemedText>
                <ThemedText variant='body'>I'm on my way to your location.</ThemedText>
              </TouchableOpacity>
            </View>

            <View style={{justifyContent: "center", width:"29%", alignItems:"flex-end", paddingRight: 2}}>
              <ThemedText>18:33</ThemedText>
              <View style={styles.messageAmount}>
                <ThemedText style={{fontWeight: "bold"}}>3</ThemedText>
              </View>
            </View>

          </View>

          <View style={styles.messageWrapper}>
            
            <View style={styles.profilePicWrapper}>
              <Image source={images.profileImage2} style={styles.profileImage} />
              <View>
                <ThemedText variant='title'>John Doe</ThemedText>
                <ThemedText variant='body'>I'm on my way to your location.</ThemedText>
              </View>
            </View>

            <View style={{justifyContent: "center", width:"29%", alignItems:"flex-end", paddingRight: 2}}>
              <ThemedText>18:33</ThemedText>
              <View style={styles.messageAmount}>
                <ThemedText style={{fontWeight: "bold"}}>3</ThemedText>
              </View>
            </View>

          </View>
          
        </View>
      ):(
        <View style={styles.messagesAndCallsContainer}>

          <View style={styles.callsWrapper}>
            
            <View style={styles.profilePicWrapper}>
              <Image source={images.profileImage2} style={styles.profileImage} />
              <View>
                <ThemedText variant='title'>John Doe</ThemedText>
                <View style={{flexDirection:"row", columnGap: 5, alignItems:"center"}}>
                  <Image source={icons.redArrow} />
                  <ThemedText variant='body'>May 12, 11:11</ThemedText>
                </View>
              </View>
            </View>

            <View style={{
              justifyContent: "center", 
              width:"29%", 
              alignItems:"flex-end", 
              paddingRight: 2}}
            >
              <View>
                <Image source={icons.call} />
              </View>
              <ThemedText>18:33</ThemedText>

            </View>

          </View>

           <View style={styles.callsWrapper}>
            <View style={styles.profilePicWrapper}>
              <Image source={images.profileImage4} style={styles.profileImage} />
              <View>
                <ThemedText variant='title'>Jane Doe</ThemedText>
                <View style={{flexDirection:"row", columnGap: 5, alignItems:"center"}}>
                  <Image source={icons.greenArrow} />
                  <ThemedText variant='body'>May 12, 09:10</ThemedText>
                </View>
              </View>
            </View>

            <View style={{
              justifyContent: "center", 
              width:"29%", 
              alignItems:"flex-end", 
              paddingRight: 2}}
            >
              <View>
                <Image source={icons.call} />
              </View>
              <ThemedText>18:33</ThemedText>

            </View>
          </View>
          
        </View>
      )}


    </ThemedView>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  msgTab:{
    padding: 10,
  },
  activeText: {
    fontWeight: 'bold',
    backgroundColor: "#adb5bd",
    width: 85,
    height: 30,
    paddingVertical: 5,
    borderRadius: 10,
    textAlign: "center",
    alignItems:"center"
  },
  inactiveText: {
    color: 'gray',
    textAlign: "center",
    alignItems:"center",
    paddingVertical: 5,
  },
  messagesAndCallsContainer:{
    rowGap: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25, // makes it a circle if width === height
    resizeMode: 'cover', // optional: how image fits in box
  },
  messageWrapper:{
    flexDirection: "row",
    padding: 2,
  },
  profilePicWrapper:{
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15
  },
  messageAmount:{
    backgroundColor: "#adb5bd",
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50
  },
  callsWrapper:{
    flexDirection:"row",
    justifyContent:"space-between"
  }
})