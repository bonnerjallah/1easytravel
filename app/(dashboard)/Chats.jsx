import { Image, Pressable, StyleSheet, View, TouchableOpacity, useColorScheme } from 'react-native'
import { useState } from 'react'
import { router } from 'expo-router';
import { Linking } from 'react-native';



//UI
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'
import icons from '../../constant/icons'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constant/Colors';



//State Management
import { useSetAtom } from 'jotai';
import { selectedMessageAtom } from '../../atoms/messageAtoms';


//MOCK UP DATA IMPORT PLEASE REMOVE FILE FOR PRODUCTION
import {userMessage} from "../../mockUpData/messagesdata"
import { callData } from '../../mockUpData/messagesdata';

const Chats = () => { 

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const [activeChatTab, setActiveChatTab] = useState("messages")
  const setMessage = useSetAtom(selectedMessageAtom);

  const getTurncatedMessage = (messages) => {
    const lastMsg = messages[messages.length - 1] || "";
    const words = lastMsg.split(" ");
    const isLong = words.length > 5;
    return words.slice(0, 5).join(" ") + (isLong ? "..." : "")
  }

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


          {/*FETCH USER MESSAGES DATA */}
          {userMessage.map((item, idx) => (
            <View style={styles.messageWrapper} key={idx}>
              <View style = {styles.profilePicWrapper} >
                <TouchableOpacity
                  onPress={() => router.push("(textandcallroom)/DriverDetails")}
                >
                  <Image source={item.proPic} style={styles.profileImage}/>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setMessage(item)
                    router.push('/(textandcallroom)/TextRoom')
                  }} 
                >
                  <ThemedText variant='title'>{item.name}</ThemedText>
                  <ThemedText variant='body'>
                    {getTurncatedMessage(item.messages)}
                  </ThemedText>               
                </TouchableOpacity>
              </View>

              <View style={{justifyContent: "center", width:"20%", alignItems:"flex-end", paddingRight: 2}}>
                <ThemedText>{item.time}</ThemedText>
                  <View style={styles.messageAmount}>
                    <ThemedText style={{fontWeight: "bold"}}>{item.messages.length}</ThemedText>
                  </View>
              </View>
            </View>
          ))}
        </View>
      ):(
        <View style={styles.messagesAndCallsContainer}>
           {callData.map((item, idx) => (
            <View style={styles.callsWrapper} key={idx}>
                <View style={styles.profilePicWrapper}>
                  <Image source={item.proPic} style={styles.profileImage} />
                  <View>
                    <ThemedText variant='title'>{item.name}</ThemedText>
                    <View style={{flexDirection:"row", columnGap: 5, alignItems:"center"}}>
                      <Image  source={item.type === "incoming" ? icons.redArrow : icons.greenArrow} />
                      <ThemedText variant='body'>{item.time}</ThemedText>
                    </View>
                  </View>
                </View>
                <View style={{justifyContent: "center", width:"29%", alignItems:"flex-end", paddingRight: 2}}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        if (item.phone) {
                          Linking.openURL(`tel:${item.phone}`);
                        } else {
                          alert("Phone number not available.");
                        }
                      }}
                    >
                      <Ionicons 
                        name='call'
                        size={25}
                        color={themed.button}
                      />
                    </TouchableOpacity>

                    <ThemedText>{item.time}</ThemedText>
                  </View>
                </View>
            </View>
           ))}          
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
    borderRadius: 25, 
    resizeMode: 'cover', 
  },
  messageWrapper:{
    flexDirection: "row",
    padding: 2,
    justifyContent: "space-between",
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