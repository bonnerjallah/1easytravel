import {
  StyleSheet,
  useColorScheme,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
} from "react-native";
import { Link, router } from "expo-router";
import { useState, useEffect } from "react";

//State Management
import { useSetAtom } from "jotai";
import { tempUserAtom } from "../../atoms/tempUserAtoms";

//Icons
import { Ionicons } from "@expo/vector-icons";

import OAuth from "../../components/OAuth";

//Themed
import { Colors } from "../../constant/Colors";
import images from "../../constant/images";
import ThemedView from "../../components/ThemedView";
import ThemedText from "../../components/ThemedText";
import ThemedTextInput from "../../components/ThemedTextInput";
import Spacer from "../../components/Spacer";
import ThemedButton from "../../components/ThemedButton";

const Register = () => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [conFPwd, setConfPwd] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const setTempUser = useSetAtom(tempUserAtom);

  const handleRegisterSubmit = () => {
    if (pwd !== conFPwd) {
      setErrMsg("passwords do not match");
      setTimeout(() => setErrMsg(""), 3000);
      setLoading(false);
      return;
    }

    const trimmedEmail = email.trim();
    const trimmedPwd = pwd.trim();

    setTempUser({
      trimmedEmail,
      trimmedPwd,
    });

    router.replace("/Verification");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView style={styles.container} safe={true}>
        <Image
          source={images.login}
          style={{ width: "100%", height: 300, alignSelf: "center" }}
        />

        <ThemedText variant="heading">Sign Up</ThemedText>

        {errMsg && <Text style={{ color: "red" }}>{errMsg}</Text>}

        <Spacer height={20} />

        <ThemedTextInput
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          style={{ backgroundColor: themed.inputBackground,}}
          required
        >
          <Ionicons name="mail-outline" size={25} />
        </ThemedTextInput>

        <Spacer height={20} />

        <View>
          <ThemedTextInput
            placeholder="Password"
            style={{ backgroundColor: themed.inputBackground,}}
            secureTextEntry
            value={pwd}
            onChangeText={setPwd}
          >
            <Ionicons name="lock-closed-outline" size={25} />
          </ThemedTextInput>

          <Spacer height={20} />

          <ThemedTextInput
            placeholder="Confirm password"
            secureTextEntry
          style={{ backgroundColor: themed.inputBackground,}}
            value={conFPwd}
            onChangeText={setConfPwd}
          >
            <Ionicons name="lock-closed-outline" size={25} />
          </ThemedTextInput>
        </View>

        <Spacer height={10} />

        <ThemedButton
          style={{ justifyContent: "center", alignItems: "center" }}
          onPress={handleRegisterSubmit}
        >
          <ThemedText
            style={[styles.textStyle, { color: themed.buttontitle }]}
            variant="title"
          >
            SIGN UP
          </ThemedText>
        </ThemedButton>

        <Spacer height={10} />

        <View>
          <View style={styles.googleContainer}>
            <View
              style={{ height: 3, width: "30%", backgroundColor: "black" }}
            ></View>
            <Spacer height={0} width="5" />
            <ThemedText variant="body">Or Continue with</ThemedText>
            <Spacer height={0} width="5" />
            <View
              style={{ height: 3, width: "30%", backgroundColor: "black" }}
            ></View>
          </View>

          <Spacer height={20} />

          <View
            style={{ alignSelf: "center", flexDirection: "row", columnGap: 40 }}
          >
            <OAuth />
          </View>
        </View>

        <ThemedText title={true} style={{ alignSelf: "center", marginTop: 50 }}>
          Have an account?
          <Spacer width="10" height={0} />
          <Link href="/Login">
            <ThemedText variant="subtitle" style={{ fontWeight: "bold" }}>
              Sign In
            </ThemedText>
          </Link>
        </ThemedText>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  forgetTextStyle: {
    fontWeight: "bold",
    position: "absolute",
    right: 5,
    bottom: -25,
  },

  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  googleContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
});
