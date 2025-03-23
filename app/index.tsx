import { View, Text, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as React from 'react';
import AccountsDB from "../models/AccountsDB";

export default function Home() {
  const [accounts, setAccounts] = React.useState<any[]>([]);

  // Obtener cuentas al cargar el componente
  React.useEffect(() => {
    const fetchAccounts = async () => {
      const records = await AccountsDB.getRecords();
      setAccounts(records);
    };
    fetchAccounts();
  }, []);

  // Calcular el balance total
  const balanceTotal = accounts.reduce((total, account) => {
    const balance = account.properties.balance?.formula.number || 0;
    return total + balance;
  }, 0);

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Balance total: {balanceTotal}
      </Text>
      {accounts.map((account) => (
        <Button
          key={account.id}
          title={account.properties.nombre.title[0].plain_text + " - " + account.properties.balance?.formula.number}
          onPress={() => router.push(
            { pathname: 'account', params: { id: account.id } })}
        />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}