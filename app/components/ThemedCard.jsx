import { StyleSheet, Text, useColorScheme, View } from 'react-native'

import { Colors } from '../../constant/Colors'

const ThemedCard = ({style, ...props}) => {

    const colorScheme = useColorScheme()
    const themed = Colors[colorScheme] ?? Colors.light

  return (
    <View
         style = {[{backgroundColor: themed.cardBackGround}, styles.card, style]}
        {...props}
    />
     
  )
}

export default ThemedCard

const styles = StyleSheet.create({
    card: {
        borderRadius: 5,
        padding: 20
    }
})