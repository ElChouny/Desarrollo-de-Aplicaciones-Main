import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShopStack from './ShopStack'
import CartStack from './CartStack'
import OrdersStack from './OrdersStack'
import Colors from '../globals/Colors';
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

const Navigator = () => {


    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: styles.tabBar,
                    tabBarLabelPosition: "beside-icon"
                }}
            >
                <Tab.Screen
                    name='ShopStack'
                    component={ShopStack}
                    options={{
                        tabBarIcon: ({ focused }) => <TabBarIcon text="Tienda" icon="shop" focused={focused} />
                    }}
                />
                <Tab.Screen
                    name='CartStack'
                    component={CartStack}
                    options={{
                        tabBarIcon: ({ focused }) => <TabBarIcon text="Carrito" icon="shopping-cart" focused={focused} />
                    }}
                />
                <Tab.Screen
                    name='OrdersStack'
                    component={OrdersStack}
                    options={{
                        tabBarIcon: ({ focused }) => <TabBarIcon text="Ordenes" icon="list" focused={focused} />
                    }}
                />
            </Tab.Navigator>
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