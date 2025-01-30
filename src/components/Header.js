import { StyleSheet, Text, View, Pressable } from 'react-native'
import Colors from '../globals/Colors'
import ArrowGoBack from './ArrowGoBack'
import { useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';
import { deleteUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { deleteSesion } from '../config/dbSqlite';



const Header = ({ title }) => {

    const navigate = useNavigation()
    const dispatch = useDispatch()

    const onLogout = () => {
        deleteSesion()
        dispatch(deleteUser())
    }

    return (
        <View style={styles.container}>
            {navigate.canGoBack() ? <ArrowGoBack /> : null}
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onLogout} style={styles.logout}>
                <AntDesign name="logout" size={20} color={Colors.lightGray} />
            </Pressable>
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