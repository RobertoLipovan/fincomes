import { View, Text, StyleSheet } from "react-native";
import { useColorScheme } from '../components/useColorScheme';

export default function Transaction({ concept, amount }: { concept: string, amount: number }) {
    const colorScheme = useColorScheme();
    return (
        <View style={colorScheme === 'dark' ? styles.containerDark : styles.containerLight}>
            <Text style={colorScheme === 'dark' ? styles.textDark : styles.textLight}>{concept}</Text>
            <Text style={colorScheme === 'dark' ? styles.textDark : styles.textLight}>{amount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    containerDark: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    containerLight: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textDark: {
        color: 'white',
    },
    textLight: {
        color: 'black',
    },
});
