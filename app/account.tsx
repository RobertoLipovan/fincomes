import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import AccountsDB from "../models/AccountsDB";
import TransactionsDB from "../models/TransactionsDB"; // Importar TransactionsDB
import { useEffect, useState } from "react";
import Transaction from "../components/Transaction";  
import * as React from 'react';

export default function Account() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [balance, setBalance] = useState("Cargando...");
  const [name, setName] = useState("Cargando...");
  const [transactions, setTransactions] = React.useState<any[]>([]); // Estado para las transacciones

  // Crear instancias de AccountsDB y TransactionsDB
  const accountsDB = new AccountsDB();
  const transactionsDB = new TransactionsDB();

  // Obtener el balance y las transacciones
  useEffect(() => {
    const fetchData = async () => {
      const account = await accountsDB.read(id);
      setBalance(account.properties.balance?.formula.number || "Error al cargar el balance");
      setName(account.properties.nombre.title[0].plain_text);

      const records = await TransactionsDB.getRecords({
        property: "cuenta", // Asegúrate de que "Account" sea el nombre correcto de la propiedad en Notion
        relation: {
          contains: id, // El ID de la cuenta que estás filtrando
        },
      });
      setTransactions(records);
    };
    fetchData();
  }, [id]);

  return (
    <View>
      <Text>{name}</Text>
      <Text>Balance: {balance}</Text>

      <View>
        <Text>Transacciones</Text>
        {transactions.map((transaction, index) => (
          <Transaction
            key={index}
            concept={transaction.properties.concepto.title[0].plain_text}
            amount={transaction.properties.importe.number}
          />
        ))}
      </View>
    </View>
  );
}