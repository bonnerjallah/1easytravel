import { Tabs, router } from "expo-router";
import { useColorScheme } from "react-native";
import { useEffect } from "react";

//Firebase
import { getAuth } from 'firebase/auth'

//UI
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constant/Colors";

export default () => {

    // const [user] = useAtom(userAtoms);
    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light


    useEffect(() => {
        const unsub = getAuth().onAuthStateChanged((firebaseUser) => {
            if (!firebaseUser) router.replace("/Login");
        });
  
        return unsub; // 🔁 Cleans up the listener on unmount
    }, []);



    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: themed.background,
                    padding: 10,
                    height: 100
                },
                tabBarActiveTintColor: themed.iconColorFocused,
                tabBarInactiveTintColor: themed.tabIconColor
            }}
        >
            <Tabs.Screen 
                name="Home"
                options={{
                    title: "Home",
                    tabBarIcon: ({focused}) => (
                        <Ionicons
                            name = {focused ? "home" : "home-outline"}
                            size = {30}
                            color={focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="Trips"
                options={{
                    title: "Trips",
                    tabBarIcon:({focused}) => (
                        <Ionicons 
                            name =  {focused ? "bag" : "bag-outline"}
                            size = {30}
                            color = {focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="Marketplace"
                options={{
                    title: "Marketplace",
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused ? "storefront" : "storefront-outline"}
                            size={30}
                            color={focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="Chats"
                options={{
                    title: "Chats",
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused ? "chatbubbles" : "chatbubbles-outline"}
                            size={30}
                            color={focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />

            <Tabs.Screen 
                name="Notification"
                options={{
                    title: "Notification",
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused ? "notifications" : "notifications-outline"}
                            size={30}
                            color={focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />

             <Tabs.Screen 
                name="Profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({focused}) => (
                        <Ionicons 
                            name={focused ? "person" : "person-outline"}
                            size={30}
                            color={focused ? themed.iconColorFocused : themed.tabIconColor}
                        />
                    )
                }}
            />
            

        </Tabs>
    )
}