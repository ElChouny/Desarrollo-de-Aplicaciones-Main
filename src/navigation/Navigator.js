import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../globals/Colors';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import { useSelector } from'react-redux';

const Tab = createBottomTabNavigator();

const Navigator = () => {

    const idToken = useSelector(state => state.user.idToken)

    return (
        <NavigationContainer>
            {idToken ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: Colors.AzulMarino,
        height: 70,
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderTopColor: Colors.lightGray
    }
})
export default Navigator