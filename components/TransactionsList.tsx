import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useColorScheme } from '../components/useColorScheme';
import { router } from "expo-router";
import { COLORS } from '../constants';

export default function TransactionsList({ title, transactions }: { title: string; transactions: any[] }) {
    const colorScheme = useColorScheme();
    return (
        <View style={colorScheme === 'dark' ? styles.listContainerDark : styles.listContainerLight}>
            <View style={colorScheme === 'dark' ? styles.listHeaderDark : styles.listHeaderLight}>
                <Text style={colorScheme === 'dark' ? styles.headerTextDark : styles.headerTextLight}>{title}</Text>
            </View>
        <View style={colorScheme === 'dark' ? styles.listContentDark : styles.listContentLight}>
          {transactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={colorScheme === 'dark' ? styles.listItemDark : styles.listItemLight}
              onPress={() => router.push(
                { pathname: 'transaction', params: { id: transaction.id } })}
            >
              <Text style={colorScheme === 'dark' ? styles.listItemTextDark : styles.listItemTextLight}>
                {transaction.properties.concepto.title[0].plain_text}
              </Text>
              <Text style={colorScheme === 'dark' ? styles.listItemTextDark : styles.listItemTextLight}>
                {transaction.properties.importe.number}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
    listItemTextDark: {
      color: 'white',
      fontSize: 24,
    },
    listItemTextLight: {
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
    listContainerDark: {
      backgroundColor: COLORS.dark.neutral900,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: COLORS.dark.neutral800,
      width: '100%',
    },
    listContainerLight: {
      backgroundColor: 'white',
      width: '100%',
    },
    listHeaderDark: {
      paddingVertical: 20,
      paddingHorizontal: 35,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.dark.neutral800,
    },
    listHeaderLight: {
      paddingVertical: 20,
      paddingHorizontal: 35,
    },
    listContentDark: {
  
    },
    listContentLight: {
  
    },
    listItemDark: {
      paddingVertical: 32,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    listItemLight: {
      paddingVertical: 32,
      paddingHorizontal: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });