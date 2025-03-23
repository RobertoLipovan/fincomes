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

  return (
    <View>
      {accounts.map((account) => (
        <Button
          key={account.id}
          title={account.properties.nombre.title[0].plain_text}
          onPress={() => router.push('account')}
        />
      ))}
      <StatusBar style="auto" />
    </View>
  );
}