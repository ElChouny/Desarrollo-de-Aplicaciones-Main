import { StyleSheet, Text, Pressable } from 'react-native';
import Colors from '../globals/Colors';

const SubmitButton = ({ title, onPress }) => {
    return (
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "60%",
        backgroundColor: Colors.Arena,
        padding: 10,
        alignItems: "center",
        borderRadius: 10
    },
    text: {
        textAlign: "center",
        color: "white",
        fontSize: 18
    }
});

export default SubmitButton;