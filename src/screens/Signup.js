import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import Colors from '../globals/Colors';
import { useNavigation } from '@react-navigation/native';
import { useSignUpMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import signupSchema from '../validations/signupSchema';
import { setUser } from '../features/userSlice';
import { deleteSesion, insertSession } from '../config/dbSqlite';

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
        try {
            console.log('Validating input...');
            signupSchema.validateSync({ email, password, confirmPassword });
            console.log('Input validated. Triggering signup...');
            const response = await triggerSignup({ email, password });
            console.log('Signup successful:', response);
            const user = {
                email: response.data.email,
                idToken: response.data.idToken,
                localId: response.data.localId
            };
            dispatch(setUser(user));
            console.log('Deleting old session...');
            await deleteSesion();
            console.log('Inserting new session...');
            await insertSession(user.localId, user.email, user.idToken);
            console.log('User registered and session saved.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during signup:', error);
            setPasswordError(error.message);
        }
    };

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
                <SubmitButton style={styles.title} title="Registrarme" onPress={onSubmit}
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
    },
    container: {
        width: '80%',
        padding: 20,
        backgroundColor: Colors.Arena,
        borderRadius: 10,
        shadowColor: "black",
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
});

export default Signup;