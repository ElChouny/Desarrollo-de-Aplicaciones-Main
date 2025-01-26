import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import InputForm from '../components/InputForm';
import SubmitButton from '../components/SubmitButton';
import Colors from '../globals/Colors';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../services/auth';
import { useDispatch } from 'react-redux';
import loginSchema from '../validations/loginSchema';
import { setUser } from '../features/userSlice';
import { deleteSesion, insertSession } from '../config/dbSqlite';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [triggerLogin] = useLoginMutation();

    const onSubmit = async () => {
        try {
            console.log('Validating input...');
            loginSchema.validateSync({ email, password });
            console.log('Input validated. Triggering login...');
            const response = await triggerLogin({ email, password });
            console.log('Login successful:', response);

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
            console.log('User logged in and session saved.');
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error during login:', error);
            if (error.path) {
                switch (error.path) {
                    case 'email':
                        setEmailError(error.message);
                        setPasswordError('');
                        break;
                    case 'password':
                        setPasswordError(error.message);
                        setEmailError('');
                        break;
                    default:
                        setEmailError('');
                        setPasswordError('');
                }
            } else {
                setEmailError('');
                setPasswordError('Login failed. Please try again.');
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
});

export default Login;