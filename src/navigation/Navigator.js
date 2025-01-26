import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../globals/Colors';
import TapNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSession } from '../config/dbSqlite';
import { useEffect } from 'react';
import { deleteUser, setUser } from '../features/userSlice';
import { init } from '../config/dbSqlite'

const Tab = createBottomTabNavigator();

const Navigator = () => {

    const idToken = useSelector(state => state.user.idToken)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {
                console.log('Initializing database...');
                await init();
                const sessionUser = await fetchSession();
                if (sessionUser) {
                    console.log('Session found:', sessionUser);
                    dispatch(setUser(sessionUser));
                } else {
                    console.log('No session found.');
                }
            } catch (error) {
                console.error('Error during initialization:', error);
            }
        })();
    }, [dispatch]);

    return (
        <NavigationContainer>
            {idToken ? <TapNavigator /> : <AuthStack />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.AzulMarino,
        height: 70
    }
})
export default Navigator