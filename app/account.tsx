import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AccountsDB from "../models/AccountsDB";
import TransactionsDB from "../models/TransactionsDB"; // Importar TransactionsDB
import { useEffect, useState } from "react";
import Transaction from "../components/Transaction";  
import * as React from 'react';
import { useColorScheme } from '../components/useColorScheme';
import TransactionsList from '../components/TransactionsList';

export default function Account() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [balance, setBalance] = useState("Cargando...");
  const [name, setName] = useState("Cargando...");
  const [transactions, setTransactions] = React.useState<any[]>([]); // Estado para las transacciones

  // Crear instancias de AccountsDB y TransactionsDB
  const accountsDB = new AccountsDB();

  // Obtener el balance y las transacciones
  useEffect(() => {
    const fetchData = async () => {
      const account = await accountsDB.read(id);
      setBalance(account.properties.balance?.formula.number || "Error al cargar el balance");
      setName(account.properties.nombre.title[0].plain_text);

      const transactions = await TransactionsDB.getRecords({
        property: "cuenta", // Asegúrate de que "Account" sea el nombre correcto de la propiedad en Notion
        relation: {
          contains: id, // El ID de la cuenta que estás filtrando
        },
      });
      setTransactions(transactions);
    };
    fetchData();
  }, [id]);

  const colorScheme = useColorScheme();

  return (
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>

      {/* Un spacer */}
      <View style={{ height: 16 }} />

      {/* Información de la cuenta */}
      <View style={styles.accountInfo}>
        <Text style={colorScheme === 'dark' ? styles.accountTitleDark : styles.accountTitleLight}>{name}</Text>
        <Text style={colorScheme === 'dark' ? styles.accountBalanceDark : styles.accountBalanceLight}>Balance: {balance}</Text>
      </View>

      {/* Transacciones */}
      <TransactionsList title="Transacciones" transactions={transactions} />

    </View>
  );
}

const styles = StyleSheet.create({
  accountInfo: {
    alignItems: 'center',
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
    justifyContent: 'space-between',
  },
  containerLight: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  accountTitleDark: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  accountTitleLight: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  accountBalanceDark: {
    fontSize: 30,
    color: 'white',
  },
  accountBalanceLight: {
    color: 'black',
    fontSize: 30,
  },
});
