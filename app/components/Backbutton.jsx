import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { Colors } from '../../constant/Colors';

const BackButton = ({ style, color = "#000", size = 25 }) => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  return (
    <TouchableOpacity onPress={() => router.back()} style={style}>
      <Ionicons 
        name='arrow-back' 
        size={size} 
        color={themed.button} 
      />
    </TouchableOpacity>
  );
};

export default BackButton;
