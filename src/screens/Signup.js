import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import Colors from '../globals/Colors';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSignUpMutation } from '../services/auth';
import signupSchema from '../validations/signupSchema';
import { setUser } from '../features/userSlice';
import { clearSessions, insertSession } from '../config/dbSqlite';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [triggerSignup] = useSignUpMutation();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        try {
            signupSchema.validateSync({ email, password, confirmPassword });
            const response = await triggerSignup({ email, password }).unwrap();
            const user = {
                email: response.email,
                idToken: response.idToken,
                localId: response.localId,
            };
            dispatch(setUser(user));
            clearSessions()
                .then(() => console.log("sesiones eliminadas"))
                .catch(error => console.log("Error al eliminar las sesiones: ", error));
            
            insertSession({
                email: response.email,
                idToken: response.idToken,
                localId: response.localId,
            })
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.path) {
                switch (error.path) {
                    case "password":
                        setPasswordError(error.message);
                        setEmailError("");
                        setConfirmPasswordError("");
                        break;
                    case "email":
                        setEmailError(error.message);
                        setPasswordError("");
                        setConfirmPasswordError("");
                        break;
                    case "confirmPassword":
                        setConfirmPasswordError(error.message);
                        setEmailError("");
                        setPasswordError("");
                        break;
                    default:
                        setEmailError("");
                        setPasswordError("");
                        setConfirmPasswordError("");
                }
            } else {
                setEmailError("");
                setPasswordError("Signup failed. Please try again.");
                setConfirmPasswordError("");
            }
        }
    };

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text style={styles.title}>Registrarse</Text>
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
                    label="Confirm Password"
                    value={confirmPassword}
                    onChangeText={(t) => setConfirmPassword(t)}
                    isSecure={true}
                    error={confirmPasswordError}
                />
                <SubmitButton style={styles.title} onPress={onSubmit} title="Registrarse" />
                <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
                <Pressable onPress={() => navigation.navigate("Login")}>
                    <Text style={styles.subLink}>Ingresar</Text>
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

export default Signup;