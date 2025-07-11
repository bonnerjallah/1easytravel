import { StyleSheet, useColorScheme, View } from 'react-native'
import Modal from 'react-native-modal'

// UI
import ThemedText from './ThemedText'
import { Colors } from '../constant/Colors'
import BackButton from './Backbutton'
import Spacer from './Spacer'

const WhereToModal = ({ isVisible, onClose }) => {

  const colorScheme = useColorScheme()
  const themed = Colors[colorScheme] ?? Colors.light

  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      swipeDirection="down"
      backdropOpacity={0.3}
      style={styles.modal}
      propagateSwipe={true}
    >
      <View style={[styles.modalContent, {backgroundColor: themed.inputBackground}]}>
        <View style={{borderWidth: 2, width: "20%", borderRadius: 30, alignSelf: "center", color: themed.text}}/>
          
        <Spacer height={20} />

        <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
          <BackButton style={styles.backBttn} size={40}/>
          <ThemedText variant='title' title style={{ textAlign: "center"}}>Plan your ride</ThemedText>
        </View>

      </View>

    </Modal>
  )
}

export default WhereToModal

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'yellow',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%', // Set modal height here
    backgroundColor: "yellow"
  },

  backBttn:{
    position:"absolute",
    left: 0
  }
})
