import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  options: string[];
}

const SelectionModal: React.FC<SelectionModalProps> = ({ visible, onClose, options }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Fondo oscuro que cierra el modal al tocar */}
      <TouchableOpacity 
        style={styles.modalContainer} 
        activeOpacity={1} 
        onPress={onClose}
      >
        {/* Caja blanca que NO se cierra si la tocas */}
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <Text style={styles.modalTitle}>Crear</Text>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SelectionModal;
