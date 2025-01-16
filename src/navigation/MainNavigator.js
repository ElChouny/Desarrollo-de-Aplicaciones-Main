import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import TabNavigator from "./TabNavigator";

const MainNavigator =() => {
    const [user, setUser] = useState(null);
    return (
        <NavigationContainer>
            {user? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );  
}

export default MainNavigator;