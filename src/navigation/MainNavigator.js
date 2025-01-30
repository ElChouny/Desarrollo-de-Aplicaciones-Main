import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import Navigator from "./Navigator";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchSession } from "../config/dbSqlite";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { init } from "../config/dbSqlite";
import { removeUser } from "../features/userSlice";
const MainNavigator = () => {
    const idToken = useSelector((state) => state.user.idToken);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            try {
                await init();
                //dispatch(removeUser());
                const sessionUser = await fetchSession();
                console.log(sessionUser);
                if (sessionUser) {
                    dispatch(setUser(sessionUser));
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);

    return (
        <NavigationContainer>
            {idToken ? <Navigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default MainNavigator;