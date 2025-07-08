import { StyleSheet, Text, View } from 'react-native'

//UI
import ThemedView from '../components/ThemedView'
import ThemedText from '../components/ThemedText'
import Spacer from '../components/Spacer'


const TextRoom = () => {
  return (
    <ThemedView style={styles.container} safe = {true}>
      <ThemedText>TextRoom</ThemedText>
    </ThemedView>
  )
}

export default TextRoom

const styles = StyleSheet.create({
  container:{
    flex: 1
  }
})