import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from '../globals/Colors';
import ArrowGoBack from './ArrowGoBack';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { clearUser } from '../features/userSlice';
import { useDispatch } from 'react-redux';
import { clearSessions } from '../config/dbSqlite';

const Header = ({ title }) => {
    const Navigation = useNavigation();
    const dispatch = useDispatch();



        const onLogout = () => {
            dispatch(clearUser())
            clearSessions()
                .then(()=>console.log("Sesion eliminada"))
                .catch((error)=>console.log("Error al eliminar la sesion"))
            }

    return (
        <View style={styles.container}>
            {Navigation.canGoBack() ? <ArrowGoBack /> : null}
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onLogout} style={styles.logout}>
                <AntDesign name="logout" size={20} color={Colors.lightGray} />
            </Pressable>
        </View>
    );
};

export default Header;

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
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "josefin"
    },
    logout: {
        position: "absolute",
        right: 20,
    }
});