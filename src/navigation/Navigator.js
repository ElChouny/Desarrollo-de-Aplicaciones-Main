import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { useDispatch, useSelector } from "react-redux"
import { fetchSession } from "../config/dbSqlite"
import { setUser } from "../features/userSlice"
import TabNavigator from "./TabNavigator"
import AuthStack from "./AuthStack"

const Navigator = () => {
    const user = useSelector((state) => state.user.value.idToken)
    const dispatch = useDispatch()

    useEffect(() => {
        const checkSession = async () => {
            try {
                const sessionUser = await fetchSession()
                if (sessionUser && sessionUser.length > 0) {
                    dispatch(
                        setUser({
                            email: sessionUser[0].email,
                            idToken: sessionUser[0].idToken,
                            localId: sessionUser[0].localId,
                        }),
                    )
                }
            } catch (error) {
                console.log("Error checking session:", error)
            }
        }

        checkSession()
    }, [dispatch])

    return <NavigationContainer>
        {user ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
}

export default Navigator

