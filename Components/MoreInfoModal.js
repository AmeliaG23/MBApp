// MoreInfoModal.js
import React from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';

const MoreInfoModal = ({ isVisible, onClose }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Help:</Text>
          <Text style={styles.modalText}>
            If you're stuck with the app, please contact us for assistance:
          </Text>
          <Text style={styles.contactInfo}>Email: support@blakeneySurgery.com</Text>
          <Text style={styles.contactInfo}>Phone: 01263 765245</Text>
          <Button title="Close" onPress={onClose} color="#388E3C" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    width: 300,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center', 
  },
  contactInfo: {
    fontSize: 15,
    marginBottom: 10,
    textAlign: 'center', 
  },
});

export default MoreInfoModal;
