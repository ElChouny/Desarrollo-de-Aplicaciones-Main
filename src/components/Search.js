import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Colors from '../globals/Colors';
import { useState } from 'react';


const Search = ({ onChangeKeyword }) => {

    const [textInput, setTextInput] = useState("")
    const [error, setError] = useState("")

    const search = () => {

        const regex = /[+\-*/%@#&]/

        if (regex.test(textInput)) {
            return setError("Caracter no valido")
        }
        setError("")
        onChangeKeyword(textInput)

    }

    const removeSearch = () => {
        onChangeKeyword("")
        setTextInput("")
        setError("")
    }

    return (
        <View style={styles.container}>
            <View style={styles.containerInput}>
                <TextInput
                    style={styles.input}
                    value={textInput}
                    onChangeText={(text) => setTextInput(text)}
                    placeholderTextColor={Colors.lightGray}
                    placeholder='Buscar' />
                <Pressable style={styles.button} onPress={search}>
                    <FontAwesome name="search" size={30} color="black" />
                </Pressable>
                <Pressable style={styles.button} onPress={removeSearch}>
                    <MaterialIcons name="cancel" size={30} color="black" />
                </Pressable>
            </View>
            <Text style={styles.error}>{error ? error : ""}</Text>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 5,
        paddingTop: 5,
    },
    containerInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    input: {
        backgroundColor: Colors.Azul,
        padding: 5,
        paddingLeft: 10,
        borderRadius: 4,
        color: Colors.lightGray,
        flex: 1
    },
    button: {
        margin: 5
    },
    error: {
        color: "red",
        fontWeight: "bold",
        marginLeft: 10
    }
})