/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import StartScreen from "./src/screens/StartScreen";
import QuestionScreen from "./src/screens/QuestionScreen";
import Last from "./src/screens/Last";

type RootStackParamList = {
    Start: undefined;
    Question: { category: number, difficulty: string };
    Last: undefined;
};


const RootStack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <NavigationContainer>
            <RootStack.Navigator
                initialRouteName="Start"
                screenOptions={{
                    headerShown: false
                }}>
                <RootStack.Screen
                    name="Start"
                    component={StartScreen}
                />
                <RootStack.Screen
                    name="Question"
                    component={QuestionScreen}
                />
                <RootStack.Screen
                    name="Last"
                    component={Last}
                />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default App;
