import { StyleSheet, ActivityIndicator, View } from 'react-native'
import Colors from '../globals/Colors'

const LoadingSpinner = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={80} color="white" />
        </View>
    )
}

export default LoadingSpinner

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Arena,
        position: "absolute",
        zIndex: 1000,
    }
})