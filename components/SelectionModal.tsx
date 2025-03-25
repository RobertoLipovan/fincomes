import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../constants';
import { useColorScheme } from '../components/useColorScheme';

interface SelectionModalProps {
  visible: boolean;
  onClose: () => void;
  options: string[];
}

const SelectionModal: React.FC<SelectionModalProps> = ({ visible, onClose, options }) => {
  const colorScheme = useColorScheme();
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Modal background and close modal */}
      <TouchableOpacity 
        style={styles.background} 
        activeOpacity={1} 
        onPress={onClose}
      >
        {/* Modal content */}
        <View style={colorScheme === 'dark' ? styles.modalDark : styles.modalLight}>
          <View style={styles.header}>
          <Text style={colorScheme === 'dark' ? styles.titleDark : styles.titleLight}>Crear</Text>
          </View>
          {options.map((option, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalDark: {
    width: 300,
    backgroundColor: COLORS.dark.neutral900,
    borderRadius: RADIUS.mediumRadius,
    alignItems: 'center',
    borderColor: COLORS.dark.neutral800,
    borderWidth: 1,
    elevation: 5,
  },
  modalLight: {
    width: 300,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  header: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
    borderBottomColor: COLORS.dark.neutral800,
    borderBottomWidth: 1,
  },
  titleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  titleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  button: {
    width: '100%',
    padding: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});

export default SelectionModal;
