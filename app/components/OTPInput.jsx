import React, { useRef, useState } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

const OTPInput = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (!/^\d*$/.test(text)) return; // only allow digits

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input if not last
    if (text && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          style={styles.input}
          textAlign="center"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    marginVertical: 30
  },
  input: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
    fontSize: 24,
    borderRadius: 8,
  },
});

export default OTPInput;
