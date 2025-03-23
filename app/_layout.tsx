import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import SelectionModal from '../components/SelectionModal'; // Importamos el modal

const Layout: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOptions, setModalOptions] = useState<string[]>([]); // Opciones dinámicas

  // Función para abrir el modal con opciones diferentes
  const openModal = (options: string[]) => {
    setModalOptions(options);
    setModalVisible(true);
  };

  return (
    <>
      <Stack>
        {/* Pantalla Home */}
        <Stack.Screen
          name="index"
          options={{
            headerTitle: 'Inicio',
            headerRight: () => (
              <TouchableOpacity 
                style={{ marginRight: 16 }} 
                onPress={() => openModal(["Transacción", "Cuenta"])} // Opciones para Home
              >
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />

        {/* Pantalla Account */}
        <Stack.Screen
          name="account"
          options={{
            headerTitle: 'Cuenta',
            headerTitleAlign: 'center',
            headerRight: () => (
              <TouchableOpacity 
                style={{ marginRight: 16 }} 
                onPress={() => openModal(["Entrada", "Salida"])} // Opciones para Account
              >
                <Ionicons name="add" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>

      {/* Modal reutilizable */}
      <SelectionModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        options={modalOptions} 
      />
    </>
  );
};

export default Layout;
