import { StyleSheet, Pressable } from 'react-native'
import ShadowCard from './wrapper/ShadowCard'
import Colors from '../globals/Colors'
import TextPrimary from './TextPrimary'
import { useNavigation } from '@react-navigation/native'

const CardItemCategory = ({ item: category }) => {

    const navigation = useNavigation()

    return (
        <Pressable onPress={() => {
            navigation.navigate("ProductsByCategory", { category })

        }}>
            <ShadowCard style={styles.container} >
                <TextPrimary style={styles.text}>{category}</TextPrimary>
            </ShadowCard>
        </Pressable>
    )
}

export default CardItemCategory

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.Beige,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7
    },
    text: {
        color: Colors.lightGray
    }
})