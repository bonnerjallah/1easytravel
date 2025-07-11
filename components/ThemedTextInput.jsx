import { TextInput, View, useColorScheme, StyleSheet } from 'react-native';
import { Colors } from '../constant/Colors';

const ThemedTextInput = ({ style, children, placeholderTextColor, ...props }) => {
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  return (
    <View style={[styles.inputWrapper, style]}>
      {children && <View style={styles.iconWrapper}>{children}</View>}
      <TextInput
        style={[styles.input, { color: themed.text }]}
        placeholderTextColor={placeholderTextColor || themed.placeholder || '#999'}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  iconWrapper: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default ThemedTextInput;
