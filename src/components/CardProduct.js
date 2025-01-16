import { Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Colors from '../globals/Colors'
import { useNavigation } from '@react-navigation/native'

const CardProduct = ({ product }) => {

    const { title, price, stock, thumbnail } = product
    const { width, height } = useWindowDimensions()
    const navigation = useNavigation()

    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate("ProductsDetail", { product })}>
            <Image style={styles.image} source={{ uri: thumbnail }} resizeMode='cover' />
            <View>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.containerText}>
                    <Text style={width > 400 ? styles.text : styles.textMin}>Precio: ${price}  USD</Text>
                    <Text style={width > 400 ? styles.text : styles.textMin}>Stock: {stock}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default CardProduct

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Celeste,
        margin: 10,
        borderRadius: 5,
        padding: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    image: {
        minWidth: 50,
        minHeight: 50,
        maxWidth: 90,
        maxHeight: 90,
        width: "15vw",
        height: "15vw",
        backgroundColor: "white",
    },
    title: {
        color: "black",
        fontSize: 14,
        padding: 5
    },
    containerText: {
        flexDirection: "row",
        gap: 20,
        padding: 10
    },
    text: {
        color: "black",
        fontSize: 16
    },
    textMin: {
        color: "black",
        fontSize: 12
    }
})