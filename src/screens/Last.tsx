import React from 'react';
import {StyleSheet, Text, View} from "react-native";
import {StackActions} from "@react-navigation/routers";
import Strings from "../components/Strings";
import Colors from "../components/Colors";
import Button from "../components/Button";

export interface Props {
    navigation?: any,
}

const Last: React.FC<Props> = (props) => {
    const {status, questions, point, joker, totalTime, index} = props.route.params;
    const header = status === 'fail' ? Strings.fail : status === 'success' ? Strings.success : Strings.timeup;
    const color = status === 'fail' ? Colors.red : status === 'timeup' ? Colors.gray : Colors.green;
    console.log({totalTime})
    return (
        <View style={styles.container}>
            <Text style={[styles.header, {color}]}>{header}</Text>
            <Text
                style={[styles.point, {color}]}>{`${Strings.yourpoint}: ${status === 'success' ? point + 60 :
                typeof point === 'number' ? point : 0}`}</Text>
            {status === 'success' && index < 10 ?
                <Button title={"Next Question"}
                        onPress={() => props.navigation.dispatch(
                            StackActions.replace('Question', {
                                questions,
                                joker,
                                point: point + 60,
                                index: index + 1
                            }))}
                />
                :
                <>
                    <Button
                        title={"Main Page"}
                        onPress={() => props.navigation.dispatch(
                            StackActions.pop())}
                    />
                </>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        alignSelf: 'center'
    },
    point: {
        alignSelf: 'center',
        color: Colors.red,
        fontSize: 20,
        marginBottom: 20
    }
});


export default Last;
