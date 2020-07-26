import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from "./Colors";

export interface Props {
    onPress: any,
    title: string,
    disabled?: boolean
}

const Button: React.FC<Props> = (props) => {
    return (
        <TouchableOpacity
            style={styles.container} onPress={props.onPress} disabled={props.disabled}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.btn
    },
    text: {
        color: Colors.white
    }
});

export default Button;
