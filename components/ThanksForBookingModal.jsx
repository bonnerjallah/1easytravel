import React from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import ThemedText from '../components/ThemedText';
import ThemedButton from '../components/ThemedButton';
import { useRouter } from 'expo-router';

const ThanksForBookingModal = ({ visible, onClose, closeBottomSheet }) => {
  const router = useRouter();



  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ThemedText variant="title" style={{ marginBottom: 20, textAlign: 'center' }}>
            Thank you, your ride is booked!
          </ThemedText>
          <ThemedText style={{fontSize: 70}}>✅</ThemedText>
        </View>
      </View>
    </Modal>
  );
};

export default ThanksForBookingModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
});
