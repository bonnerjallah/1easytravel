// app/(auth)/forgotPwd/CheckEmail.jsx

import { View, Text, StyleSheet } from "react-native";
import ThemedButton from "../../components/ThemedButton";
import { router } from "expo-router";

const CheckEmail = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check Your Email</Text>
      <Text style={styles.message}>
        We’ve sent you a password reset link. After updating your password, return here and tap the button below to continue.
      </Text>

      <ThemedButton
        style={{ marginTop: 30 }}
        onPress={() => router.replace("/(auth)/Login")}
      >
        <Text style={styles.buttonText}>Back to Login</Text>
      </ThemedButton>
    </View>
  );
};

export default CheckEmail;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center" },
  message: { textAlign: "center", marginTop: 15, fontSize: 16 },
  buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});
