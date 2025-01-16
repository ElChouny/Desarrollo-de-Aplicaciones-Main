import { StyleSheet, Text, View } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import Colors from '../globals/Colors'


const TabBarIcon = ({ text, icon }) => {
    return (
        <View style={styles.container}>
            <Entypo name={icon} size={28} color={Colors.lightGray} />
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

export default TabBarIcon

const styles = StyleSheet.create({
    container: {
        width: 60,
        alignItems: "center",
        gap: 5
    },
    text: {
        color: Colors.lightGray
    }
})