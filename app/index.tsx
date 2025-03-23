import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import * as React from 'react';
import AccountsDB from "../models/AccountsDB";
import { useColorScheme } from '../components/useColorScheme';
import { COLORS } from '../constants';

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

  const colorScheme = useColorScheme();

  return (
    
    <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
      <Text style={colorScheme === 'dark' ? styles.headerTextDark : styles.headerTextLight}>
        Balance total: {balanceTotal}
      </Text>
      <View style={colorScheme === 'dark' ? styles.accountListDark : styles.accountListLight}>
        <View style={colorScheme === 'dark' ? styles.accountListHeaderDark : styles.accountListHeaderLight}>
          <Text style={colorScheme === 'dark' ? styles.headerTextDark : styles.headerTextLight}>Cuentas</Text>
        </View>
        <View style={colorScheme === 'dark' ? styles.accountListContentDark : styles.accountListContentLight}>
          {accounts.map((account) => (
            <TouchableOpacity
              key={account.id}
              style={colorScheme === 'dark' ? styles.accountListElementDark : styles.accountListElementLight}
              onPress={() => router.push(
                { pathname: 'account', params: { id: account.id } })}
            >
              <Text style={colorScheme === 'dark' ? styles.accountListElementTextDark : styles.accountListElementTextLight}>
                {account.properties.nombre.title[0].plain_text}
              </Text>
              <Text style={colorScheme === 'dark' ? styles.accountListElementTextDark : styles.accountListElementTextLight}>
                {account.properties.balance?.formula.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: 'space-between',
  },
  textDark: {
    color: 'white',
  },
  textLight: {
    color: 'black',
  },
  accountListElementTextDark: {
    color: 'white',
    fontSize: 24,
  },
  accountListElementTextLight: {
    color: 'black',
    fontSize: 24,
  },
  headerTextDark: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerTextLight: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',

  },
  accountListDark: {
    backgroundColor: COLORS.dark.neutral900,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.neutral800,
  },
  accountListLight: {
    backgroundColor: 'white',
  },
  accountListHeaderDark: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.neutral800,
  },
  accountListHeaderLight: {
    paddingVertical: 20,
    paddingHorizontal: 35,
  },
  accountListContentDark: {

  },
  accountListContentLight: {

  },
  accountListElementDark: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountListElementLight: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});