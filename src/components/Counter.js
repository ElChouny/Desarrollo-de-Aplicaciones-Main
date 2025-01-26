import { StyleSheet, Text, View, Button, Pressable } from 'react-native'
import Colors from '../globals/Colors'

const Counter = ({ quantity, increment, decrement }) => {



    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={decrement}>
                <Text style={styles.textButton}>-</Text>
            </Pressable>
            <Text style={styles.text}>{quantity}</Text>
            <Pressable style={styles.button} onPress={increment}>
                <Text style={styles.textButton}>+</Text>
            </Pressable>

        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "flex-end",
        margin: 10,
        alignItems: "center",
        gap: 20,
    },
    button: {
        backgroundColor: Colors.Arena,
        width: 50,
        padding: 10,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    textButton: {
        color: Colors.lightGray,
        fontSize: 20
    },
})