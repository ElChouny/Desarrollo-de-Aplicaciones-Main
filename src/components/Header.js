import { StyleSheet, Text, View } from 'react-native'
import Colors from '../globals/Colors'
import ArrowGoBack from './ArrowGoBack'
import { useNavigation } from '@react-navigation/native'

const Header = ({ title }) => {

    const navigate = useNavigation()

    return (
        <View style={styles.container}>
            {navigate.canGoBack() ? <ArrowGoBack /> : null}
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Azul,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 35,
    },
    title: {
        color: Colors.lightGray,
        fontSize: 16,
        fontFamily: "josefin"
    }
})