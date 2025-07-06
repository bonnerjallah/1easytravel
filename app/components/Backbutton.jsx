import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const BackButton = ({ style, color = "#000", size = 25 }) => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.back()} style={style}>
      <Ionicons 
        name='arrow-back' 
        size={size} 
        color={color} 
      />
    </TouchableOpacity>
  );
};

export default BackButton;
