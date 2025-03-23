import { View, Text, StyleSheet } from "react-native";

export default function Transaction({ concept, amount }: { concept: string, amount: number }) {
    return (
        <View style={styles.container}>
            <Text>{concept}</Text>
            <Text>{amount}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
