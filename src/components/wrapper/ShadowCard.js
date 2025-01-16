import { StyleSheet, View } from 'react-native'

const ShadowCard = ({ children, style }) => {
    return (
        <View style={{...style, ...styles.container}}>
            {children}
        </View>
    )
}

export default ShadowCard

const styles = StyleSheet.create({
    container: {
        elevation: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 5,
        shadowRadius: 4,
    }
})