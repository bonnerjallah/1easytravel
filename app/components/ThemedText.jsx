import { Text, useColorScheme} from 'react-native';
import { Colors } from '../../constant/Colors';
import { Typography } from '../../constant/Typography'; 

const ThemedText = ({ style, title = false, variant = 'body', ...props }) => {
    
  const colorScheme = useColorScheme();
  const themed = Colors[colorScheme] ?? Colors.light;

  const textColor = title ? themed.title : themed.text;
  const fontStyle = Typography[variant] ?? Typography.body;

  return (
    <Text style={[{ color: textColor }, fontStyle, style]} {...props} />
     
  );
};

export default ThemedText;
