import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ThemedTextInput from '../components/ThemedTextInput';

const ChatBubble = ({ messages }) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0} // Adjust if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Messages */}
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.messageWrapper,
                  index % 2 === 0 ? styles.senderWrapper : styles.receiverWrapper,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    index % 2 === 0 ? styles.senderBubble : styles.receiverBubble,
                  ]}
                >
                  <Text style={[styles.messageText]}>
                    {msg}
                  </Text>

                  <View style={styles.metaWrapper}>
                    <Text style={styles.timeText}>18:30</Text>
                    {index % 2 === 0 && (
                      <Ionicons
                        name="checkmark-done"
                        size={16}
                        color="white"
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </View>

                  {index % 2 === 0 ? (
                    <View style={styles.tail} />
                  ) : (
                    <View style={styles.receiverTail} />
                  )}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Input */}
          <View style={styles.inputWrapper}>
            <ThemedTextInput placeholder="Type a message" style={{width: "85%"}} />
            <TouchableOpacity>
                <Ionicons 
                    name='send'
                    size={35}
                    color= "#40916c"
                />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatBubble;



const styles = StyleSheet.create({
    messageWrapper: {
        flexDirection: 'row',
        marginVertical: 6,
        paddingHorizontal: 10,
    },
    senderWrapper: {
        justifyContent: 'flex-end',
    },
    receiverWrapper: {
        justifyContent: 'flex-start',
    },
    bubble: {
        maxWidth: '75%',
        padding: 10,
        borderRadius: 16,
    },
    senderBubble: {
        backgroundColor: '#3c6e71',
        borderTopRightRadius: 0,
        position: 'relative',
    },

    receiverBubble: {
    backgroundColor: '#023e7d',
    borderTopLeftRadius: 0,
    position: 'relative',
    },

    messageText: {
        color: '#fff',
        fontSize: 16,
    },
    metaWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 4,
    },
    timeText: {
        fontSize: 12,
        color: '#ccc',
    },
    inputWrapper: {
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center",
        columnGap: 11
    },

});
