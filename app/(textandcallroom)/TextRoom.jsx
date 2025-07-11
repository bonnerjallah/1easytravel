import { Image, StyleSheet, TouchableOpacity, useColorScheme, View, Linking} from 'react-native'
import { router } from 'expo-router'

//UI
import ThemedView from '../../components/ThemedView'
import ThemedText from '../../components/ThemedText'
import Spacer from '../../components/Spacer'
import Backbutton from "../../components/Backbutton"
import ChatBubble from "../../components/MessageBubble"
import { Colors } from '../../constant/Colors'


//State Management
import { useAtom } from 'jotai'
import { selectedMessageAtom } from '../../atoms/messageAtoms'
import { Ionicons } from '@expo/vector-icons'


const TextRoom = () => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  const [message] = useAtom(selectedMessageAtom);

  if (!message) return null;

  console.log("message", message)

  return (
    <ThemedView style={styles.container} safe={true}>
      <Spacer height={25} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Backbutton size={45} />
          <TouchableOpacity
            onPress={() => router.push("(textandcallroom)/DriverDetails")}
          >
            <ThemedText variant="title" title>
              {message.name}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (phone) {
              Linking.openURL(`tel:${phone}`);
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

      </View>

      {/* Chat Messages */}
      <ChatBubble messages={message.messages} />
    </ThemedView>
  );
};


export default TextRoom

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
    columnGap: 20,
  },
  callIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
});
