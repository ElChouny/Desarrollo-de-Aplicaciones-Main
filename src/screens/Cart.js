import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import CardCartProduct from '../components/CardCartProduct'
import Colors from '../globals/Colors'
import { usePostOrdersMutation } from '../services/orders'
import { useSelector, useDispatch } from 'react-redux'
import { useGetCartQuery, useDeleteCartMutation } from '../services/carts'
import { useEffect, useState } from 'react'
import EmptyListComponent from '../components/EmptyListComponent'
import LoadingSpinner from '../components/LoadingSpinner'
import { useNavigation } from '@react-navigation/native'
import { clearSessions } from '../config/dbSqlite';

const Cart = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [triggerPost] = usePostOrdersMutation()
    const [triggerDeleteCart] = useDeleteCartMutation()
    const localId = useSelector(state => state.user.localId)
    const { data: cart, isLoading } = useGetCartQuery({ localId })
    const [total, setTotal] = useState(0)

    useEffect(() => {
        if (cart) {
            setTotal(cart.reduce((acc, item) => acc + item.price * item.quantity, 0))
        }
    }, [cart])



    const confirmCart = () => {
        const createdAt = new Date().toLocaleString()
        const order = {
            products: cart,
            createdAt,
            total
        }
        triggerPost({ order, localId })
        triggerDeleteCart({ localId })
        navigation.navigate("OrdersStack")
    };

    if (isLoading) return <LoadingSpinner />
    if (!cart) return <EmptyListComponent message="No hay productos en el carrito" />
    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CardCartProduct product={item} />}
            />
            <View style={styles.containerTotal}>
                <Text style={styles.text}>Total: ${total}  USD </Text>
                <Pressable style={styles.button} onPress={confirmCart}>
                    <Text style={styles.buttonText}>Finalizar Compra</Text>
                </Pressable>

            </View>
        </View>
    )
}

export default Cart

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    containerTotal: {
        width: "100%",
        backgroundColor: Colors.Arena,
        flexDirection: "row",
        padding: 15,
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 0
    },
    text: {
        color: Colors.lightGray,
        fontSize: 16
    },
    button: {
        backgroundColor: Colors.Arena,
        padding: 10,
        borderRadius: 5
    },
    buttonText: {
        color: Colors.lightGray
    }
})