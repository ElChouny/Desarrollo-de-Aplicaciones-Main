import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton';
import Colors from '../globals/Colors'
import { useNavigation } from '@react-navigation/native'
import { useSignUpMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import signupSchema from '../validations/signupSchema';
import { setUser } from '../features/userSlice';




const Signup = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const navigation = useNavigation()
    const [triggerSignup] = useSignUpMutation()
    const dispatch = useDispatch()


    const onSubmit = async () => {
        console.log("onSubmit se ejecutó"); // <- Esto debe aparecer en la consola
        console.log("Datos de entrada:", { email, password, confirmPassword });

        if (!email || !password || !confirmPassword) {
            console.error("Todos los campos son requeridos");
            return;
        }

        try {
            signupSchema.validateSync({ email, password, confirmPassword });
            const response = await triggerSignup({ email, password });
            console.log("Respuesta del servidor:", response);
            const user = {
                email: response.data.email,
                idToken: response.data.idToken,
            };
            dispatch(setUser(user));
            console.log("Usuario registrado:", user);
        } catch (error) {
            console.error("Error en el registro:", error);
            switch (error.path) {
                case "email":
                    setEmailError(error.message);
                    setPasswordError("");
                    break;
                case "password":
                    setPasswordError(error.message);
                    break;
                case "confirmPassword":
                    setConfirmPasswordError(error.message);
                    setEmailError("");
                    setPasswordError("");
                    break;
                default:
                    console.error("Error desconocido:", error);
            }
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title} >Registrarme</Text>
                <InputForm
                    label="Email"
                    value={email}
                    onChangeText={(t) => setEmail(t)}
                    isSecure={false}
                    error={emailError}
                />
                <InputForm
                    label="Password"
                    value={password}
                    onChangeText={(t) => setPassword(t)}
                    isSecure={true}
                    error={passwordError}
                />
                <InputForm
                    label="Confirmar password"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={true}
                    error={confirmPasswordError}

                />
                <SubmitButton title="Registrarme" onPress={onSubmit}
                />
                <Text style={styles.sub}>Tenes cuenta registrada?</Text>
                <Pressable onPress={() => navigation.navigate("Login")} >
                    <Text style={styles.subLink}>Login</Text>
                </Pressable>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    container: {
        width: "90%",
        backgroundColor: Colors.Arena,
        gap: 15,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20
    },
    title: {
        fontSize: 22,
        fontFamily: "Lobster",
        color: Colors.lightGray
    },
    sub: {
        fontSize: 14,
        fontFamily: "Josefin",
        color: Colors.lightGray
    },
    subLink: {
        fontSize: 14,
        fontFamily: "Josefin",
        color: Colors.lightGray
    }
})


export default Signup