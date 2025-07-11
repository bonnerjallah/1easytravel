import { useState } from "react";
import { StyleSheet, Alert, useColorScheme } from "react-native";
import { router } from "expo-router";


//Firebase
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebaseConfig";


//UI
import { Colors } from "../../../constant/Colors";
import ThemedView from "../../../components/ThemedView";
import ThemedText from "../../../components/ThemedText";
import ThemedTextInput from "../../../components/ThemedTextInput";
import ThemedButton from "../../../components/ThemedButton";
import Spacer from "../../../components/Spacer";

const ResetRequest = () => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light;

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return Alert.alert("Email required");

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      router.replace("/CheckEmail");
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.heading}>Forgot Password?</ThemedText>
      <ThemedText style={styles.text}>
        Enter your email address. We'll send a link to reset your password.
      </ThemedText>

      <Spacer height={20} />

      <ThemedTextInput
        placeholder="Enter your email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: themed.inputBackground,}}
      />

      <Spacer height={20} />

      <ThemedButton onPress={handleReset} disabled={loading}>
        <ThemedText style={[styles.buttonText, { color: themed.buttontitle }]} title>
          {loading ? "Sending..." : "Send Reset Email"}
        </ThemedText>
      </ThemedButton>
    </ThemedView>
  );
};

export default ResetRequest;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: "center", },
  heading: { fontSize: 28, fontWeight: "bold", textAlign: "center",  },
  text: { textAlign: "center", marginVertical: 10 },
  buttonText: { fontWeight: "bold", textAlign: "center", fontSize: 20 },
});
