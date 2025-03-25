import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import * as React from 'react';
import AccountsDB from "../models/AccountsDB";
import { useColorScheme } from '../components/useColorScheme';
import { COLORS } from '../constants';
import AccountList from '../components/AccountList';

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
      <View style={styles.spacer}>
      </View>
      <View>
        <Text style={colorScheme === 'dark' ? styles.headerTextDark : styles.headerTextLight}>Balance total</Text>
        <Text style={colorScheme === 'dark' ? styles.balanceTextDark : styles.balanceTextLight}>
          {balanceTotal}
        </Text>
      </View>
      <AccountList title="Cuentas" accounts={accounts} routePath="account" />
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
    alignItems: 'center',
  },
  containerLight: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    height: 16,
  },
  balanceTextDark: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  balanceTextLight: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 24,
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
    fontSize: 30,
    fontWeight: '300',
  },
  headerTextLight: {
    color: 'black',
    fontSize: 30,
    fontWeight: '300',
  },
  accountListDark: {
    backgroundColor: COLORS.dark.neutral900,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.neutral800,
    width: '100%',
  },
  accountListLight: {
    backgroundColor: 'white',
    width: '100%',
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