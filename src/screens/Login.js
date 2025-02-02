import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import Colors from '../globals/Colors';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import loginSchema from '../validations/loginSchema';
import { setUser } from '../features/userSlice';
import { clearSessions, insertSession } from '../config/dbSqlite';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigation = useNavigation();
    const [triggerLogin, result] = useLoginMutation();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            loginSchema.validateSync({ email, password });
            const response = await triggerLogin({ email, password }).unwrap();

            const user = {
                email: response.email,
                idToken: response.idToken,
                localId: response.localId
            };
            dispatch(setUser(user));
            clearSessions()
                .then(() => console.log("sesiones eliminadas"))
                .catch(error => console.log("Error al eliminar las sesiones: ", error));
            console.log("result data:", result.data);
            insertSession({
                email: response.email,
                idToken: response.idToken,
                localId: response.localId
            })
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during login:', error);
            if (error.path) {
                switch (error.path) {
                    case "email":
                        setEmailError(error.message);
                        setPasswordError("");
                        break;
                    case "password":
                        setPasswordError(error.message);
                        setEmailError("");
                        break;
                    default:
                        setEmailError("");
                        setPasswordError("Login failed. Please try again.");
                }
            } else {
                setEmailError("");
                setPasswordError("Login failed. Please try again.");
            }
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Ingresar</Text>
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
                <SubmitButton style={styles.title} onPress={onSubmit} title="Ingresar" />
                <Text style={styles.sub}>¿No tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.subLink}>Registrarme</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.Arena,
        borderRadius: 10,
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    SubmitButton: {
        backgroundColor: Colors.Azul,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    sub: {
        marginTop: 20,
        textAlign: 'center',
    },
    subLink: {
        color: Colors.Azul,
        textAlign: 'center',
        marginTop: 10,
    },
});

export default Login;