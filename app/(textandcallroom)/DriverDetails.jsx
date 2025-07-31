import { StyleSheet, Text, View, ActivityIndicator, Image, Pressable, useColorScheme, TouchableOpacity, ScrollView, Linking  } from 'react-native'
import { useEffect, useState } from 'react'
import { router } from 'expo-router'


//UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import ThemedTextInput from '../../components/ThemedTextInput'
import Spacer from '../../components/Spacer'
import Backbutton from "../../components/Backbutton"
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '../../constant/Colors'
import images from '../../constant/images'

//STATE MANAGEMENT
import { useAtomValue } from 'jotai';
import { selectedMessageAtom } from '../../atoms/messageAtoms';

//MOCK UP DATA
import {driversDetails} from "../../mockUpData/messagesdata"


const DriverDetails = () => {
  const DriverData = useAtomValue(selectedMessageAtom);
  const [driver, setDriver] = useState(null);
  const [showReview, setShowReview] = useState(false)

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  useEffect(() => {
    if (DriverData?.name) {
      const match = driversDetails.find((item) => item.name === DriverData.name);
      
      if (match) {
        setDriver(match);
      } else {
        console.log("Driver not found");
      }

    } else {
      console.warn("DriverData is null or missing name");
    }
  }, [DriverData]);



  // 👇 Conditional rendering to avoid crashing while data loads
  if (!DriverData || !driver) {
    return (
      <ThemedView style={styles.container} safe={true}>
        <Spacer height={25} />
        <ThemedText title variant='title'>Loading driver details...</ThemedText>
        <ActivityIndicator size={"large"} color={"dodgerblue"} style={{margin: "auto"}}/>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container} safe={true}>
        <Spacer height={10} />

        <View style={styles.header}>
            <Backbutton size={45} />
            <Spacer height={0} width="20%" />
            <ThemedText variant="title" title>
            Driver Details
            </ThemedText>
        </View>
        <Spacer height={15}/>

        <View style={{
          flexDirection: "row", 
          columnGap: 10, 
          borderBottomWidth: 1, 
          paddingBottom: 30, 
          borderBottomColor:"gray"
          }}>
            <Image source={driver.profilePic}  style={{width: 150, height: 150, resizeMode:"cover"}}/>
            <View style={{justifyContent:"space-evenly"}}>
                <ThemedText variant='title' title>{driver.name}</ThemedText>
                <ThemedText>{driver.email}</ThemedText>
                <ThemedText>{driver.location}</ThemedText>
            </View>
        </View>

        <Spacer height={15} />

        <View style={{flexDirection:"row", justifyContent:"space-between", borderBottomWidth: 1, borderBottomColor:"gray", paddingBottom:20}}>
          <View style={{alignItems:"center"}}>
            <Ionicons name='people-outline' size={25} color={themed.tabIconColor}/>
            <Spacer height={15} />
            <ThemedText variant='subtitle' title>250+</ThemedText>
            <ThemedText variant='subtitle'>Customers</ThemedText>
          </View>
          <View style={{alignItems:"center", fontWeight:"bold"}}>
            <Ionicons name='bag-outline' size={25} color={themed.tabIconColor}/>
            <Spacer height={15} />
            <ThemedText variant='subtitle' title>6+</ThemedText>
            <ThemedText variant='subtitle'>Years Exp.</ThemedText>
          </View>
          <View style={{alignItems:"center", fontWeight:"bold"}}>
            <Ionicons name='star-outline' size={25} color={themed.tabIconColor}/>
            <Spacer height={15} />
            <ThemedText variant='subtitle' title>4.8+</ThemedText>
            <ThemedText variant='subtitle'>Rating</ThemedText>
          </View>
          <View style={{alignItems:"center", fontWeight:"bold"}}>
            <Ionicons name= 'chatbox-ellipses-outline' size={25} color={themed.tabIconColor}/>
            <Spacer height={15} />
            <ThemedText variant='subtitle' title>100+</ThemedText>
            <ThemedText variant='subtitle'>Reviews</ThemedText>
          </View>
        </View>

        <Spacer height={25}/>

        <View style={{flexDirection:"row", justifyContent:'space-around'}}>
          <Pressable 
            style={{width:"30%"}}
            onPress={() => setShowReview(false)}
          >
            <ThemedText 
              style={[
                !showReview ? styles.subtitleStyle : null,
                { textAlign: "center" }
              ]}
              variant='title'
              title
            >
              About
            </ThemedText>
          </Pressable>
          <Pressable 
            style={{width:"30%"}}
            onPress={() => setShowReview(true)} 
          >
            <ThemedText 
              style={[
                showReview ? styles.subtitleStyle : null,
                { textAlign: "center" }
              ]}
              variant='title'
              title
            >
              Reviews
            </ThemedText>
          </Pressable>
        </View>

        <Spacer height={20} />

        {showReview ? 
          (
            <ThemedView>
              <ThemedText title variant='title'>Reviews</ThemedText>
              <Spacer height={10}/>

              <View style={{flexDirection:"row", alignItems:"center", columnGap:"10", borderWidth:1, height: 70, width:"100%", padding:10}}>
                <TouchableOpacity>
                    <Ionicons 
                      name='search'
                      size={35}
                      color={themed.tabIconColor}
                    />
                </TouchableOpacity>
                <ThemedTextInput
                    placeholder='Search reviews' 
                    style={{ backgroundColor: themed.inputBackground, width:'90%'}}
                    keyboardType = "email-address"
                />
              </View>

              <Spacer height={15}/>

              {/*REVIEWER CONTAINER */}
              <View style={{ flex: 1 }}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <View style={{flexDirection:"row" , alignItems:"center", columnGap:"10"}}>
                        <Image source={images.reviewProfile} />
                        <ThemedText >reviewer name</ThemedText>
                      </View>
                      <View>
                        <ThemedText>10:00</ThemedText>
                      </View>
                    </View>
                    <Spacer height={10}/>
                    <View>
                      <ThemedText style={{lineHeight: 20, flex:1}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      </ThemedText>
                      <View style={{flexDirection:"row", columnGap:5, marginTop:10}}>
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                      </View>
                    </View>
                  </View>

                  <Spacer height={20} />


                  <View>
                    <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <View style={{flexDirection:"row" , alignItems:"center", columnGap:"10"}}>
                        <Image source={images.reviewProfile} />
                        <ThemedText >reviewer name</ThemedText>
                      </View>
                      <View>
                        <ThemedText>10:00</ThemedText>
                      </View>
                    </View>
                    <Spacer height={10}/>
                    <View>
                      <ThemedText style={{lineHeight: 20}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      </ThemedText>
                      <View style={{flexDirection:"row", columnGap:5, marginTop:10}}>
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                        <Ionicons name='star' size={15} color={themed.tabIconColor} />
                      </View>
                      <Spacer height={10} />
                      
                    </View>
                  </View>
                  
                </ScrollView>
              </View>
              
              

            </ThemedView>
            ) : (
            <ThemedView>
              <ThemedText title variant='title'>About</ThemedText>
              <Spacer height={10}/>
              <View>
                <ThemedText>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. <Text title variant="title">Read More</Text>
                </ThemedText>
              </View>

              <Spacer height={15} />

              <View>
                <ThemedText title variant='title'>Driver Contact</ThemedText>
                <Spacer height={10}/>

                <View style={{ flexDirection: "row", width: "100%", flexDirection:"row", padding: 10 }}>
                  <Image
                    source={driver.profilePic}
                    style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }}
                  />

                  <View style={{ flex: 1, justifyContent: "center", rowGap:10}}>
                    <ThemedText>{driver.name}</ThemedText>
                    <ThemedText>Driver Role</ThemedText>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", columnGap: 10, marginTop: 8 , columnGap:30}}>
                      <TouchableOpacity
                        onPress={() => {
                          if (driver.phone) {
                            Linking.openURL(`tel:${driver.phone}`);
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

                      <TouchableOpacity
                        onPress={() => router.push("(textandcallroom)/TextRoom")}
                      >
                        <Ionicons name="chatbubbles-outline" size={25} color={themed.tabIconColor} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <Spacer height={15} />

                <View>
                  <ThemedText title variant='title'>Car Details </ThemedText>
                  <View style={{flexDirection:"row", justifyContent:"space-between", marginTop:15}}>
                    <View style={{rowGap: 5}}>
                      <ThemedText>Car Color</ThemedText>
                      <ThemedText>Car Model</ThemedText>
                      <ThemedText>Car Number</ThemedText>
                    </View>
                    <View style={{rowGap: 5}} variant="title">
                      <ThemedText>Blue</ThemedText>
                      <ThemedText>Nissan VH54</ThemedText>
                      <ThemedText>VH54-223-PQY</ThemedText>
                    </View>
                  </View>
                  
                </View>

              </View>
            </ThemedView>
          )
        }



        

      {/* Render additional driver details here if needed */}
    </ThemedView>
  );
};


export default DriverDetails

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  header:{
    flexDirection: "row",
    alignItems:"center",
  },
  subtitleStyle:{
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    
  }

})