import { useEffect, useState } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback, useColorScheme, Text } from "react-native";
import { router } from "expo-router";

// Firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

// State Management
import { useAtomValue } from "jotai";
import { tempUserAtom } from "../../atoms/tempUserAtoms";

// UI
import { Colors } from "../../constant/Colors";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";
import BackButton from "../../components/Backbutton";

const Verification = () => {
  const { trimmedEmail, trimmedPwd } = useAtomValue(tempUserAtom);

  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  useEffect(() => {
    console.log("email:", trimmedEmail);
    registerUser(); // Send email immediately on screen load
  }, []);

  const registerUser = async () => {
    try {
      setLoading(true);

      const response = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        trimmedPwd
      );

      await sendEmailVerification(response.user);

      await setDoc(doc(db, "users", response.user.uid), {
        email: trimmedEmail,
        createdAt: new Date(),
      });

      setEmailSent(true);

    } catch (error) {
      const messages = {
        "auth/email-already-in-use": "Email already in use.",
        "auth/invalid-email": "Invalid email address.",
        "auth/weak-password": "Password must be at least 6 characters.",
      };
      setErrMsg(messages[error.code] || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const checkEmailVerified = async () => {
    try {
      setLoading(true);
      await auth.currentUser.reload();
      const isVerified = auth.currentUser.emailVerified;

      if (isVerified) {
        router.replace("/CreateUser");
      } else {
        setErrMsg("Email not verified yet. Please check your inbox.");
        setTimeout(() => setErrMsg(""), 3000);
      }
    } catch (error) {
      console.error("Verification check error:", error);
      setErrMsg("Something went wrong while checking verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <BackButton />
        <Spacer height={20} />

        <ThemedText variant="title" style={{ fontSize: 40 }}>
          Verification
        </ThemedText>

        <ThemedText style={styles.textStyle}>
          We’ve sent a verification email to:
        </ThemedText>

        <Spacer height={10} />

        <ThemedText
          style={[styles.textStyle, { fontWeight: "bold", fontSize: 25 }]}
        >
          {trimmedEmail}
        </ThemedText>

        <Spacer height={30} />

        {errMsg && (
          <Text style={{ color: "red", textAlign: "center" }}>{errMsg}</Text>
        )}

        <ThemedButton
          style={{
            position: "absolute",
            width: "80%",
            bottom: 100,
            alignSelf: "center",
          }}
          onPress={checkEmailVerified}
          disabled={loading || !emailSent}
        >
          <ThemedText
            style={[styles.textStyle, { color: themed.buttontitle }]}
            variant="title"
          >
            {loading ? "Checking..." : "Continue"}
          </ThemedText>
        </ThemedButton>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textStyle: {
    marginTop: 5,
    textAlign: "center",
  },
});
