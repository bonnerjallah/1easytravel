import { StyleSheet, Pressable, useColorScheme, Text } from 'react-native';
import { Colors } from '../../constant/Colors';

const ThemedButton = ({ style = {}, title, children, ...props }) => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: themed.button,
          padding: 18,
          borderRadius: 20,
          marginVertical: 10,
          opacity: pressed ? 0.5 : 1,
          color: themed.buttontitle
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;
