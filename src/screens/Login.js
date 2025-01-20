import { useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import Colors from '../globals/Colors'
import InputForm from '../components/InputForm'
import SubmitButton from '../components/SubmitButton'
import { useNavigation } from '@react-navigation/native'
import { useLoginMutation } from '../services/auth'
import { useDispatch } from 'react-redux'
import loginSchema from "../validations/loginSchema"


const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const navigation = useNavigation()
    const [triggerLogin] = useLoginMutation()
    const dispatch = useDispatch()



    const onSubmit = async () => {
        try {
            loginSchema.validateSymc({ email, password })
            const response = await triggerLogin({ email, password })
            const user = {
                email: response.data.email,
                idToken: response.data.idToken,
            }
            dispatch(setUser(user))
        } catch (error) {
            switch (error.path) {
                case "email":
                    setEmailError(error.message)
                    setPasswordError("")
                    break;
                case "password":
                    setEmailError("")
                    setPasswordError(error.message)
                    break;
            }
        }
    }
    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title} >Ingresar</Text>
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
                <SubmitButton onPress={onSubmit} title="Ingresar" />
                <Text style={styles.sub}>No tienen una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")} >
                    <Text style={styles.subLink}>Registrarme</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Login;


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