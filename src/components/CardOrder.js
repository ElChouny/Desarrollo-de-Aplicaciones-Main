import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Colors from '../globals/Colors';

const CardOrder = ({ order }) => {

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>{order.createdAt}</Text>
                <Text style={styles.text}>Total: ${order.total}  USD</Text>
            </View>
            <AntDesign name="search1" size={30} color={Colors.lightGray} />
        </View>
    )
}

export default CardOrder

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: Colors.Beige,
        margin: 10,
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 5
    },
    content: {
        gap: 10,
    },
    text: {
        color: Colors.lightGray,
        fontSize: 16
    }
})