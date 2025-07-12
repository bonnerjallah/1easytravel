import { useCallback } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { useColorScheme, View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Colors } from '../constant/Colors';
import { Provider } from 'jotai';

SplashScreen.preventAutoHideAsync(); // ✅ This can be here too

export default function Layout() {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [fontsLoaded] = useFonts({
    'Figtree-Regular': require('../assets/fonts/Figtree-Regular.ttf'),
    'Figtree-Bold': require('../assets/fonts/Figtree-Bold.ttf'),
    'Figtree-SemiBold': require('../assets/fonts/Figtree-SemiBold.ttf'),
    'Figtree-Light': require('../assets/fonts/Figtree-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Provider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar style='auto' />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: themed.background },
            headerTintColor: themed.title
          }}
        >
          <Stack.Screen name='index' options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(dashboard)" options={{headerShown: false}} />
          <Stack.Screen name='(transport)' options={{headerShown: false}} />
          <Stack.Screen name='(textandcallroom)' options={{headerShown: false}} />
          <Stack.Screen name="(profile)" options={{headerShown: false}} />
        </Stack>
      </View>
    </Provider>
    
  );
}
