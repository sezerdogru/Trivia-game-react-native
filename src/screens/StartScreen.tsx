import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import {Picker} from "@react-native-community/picker";
import {StackActions} from '@react-navigation/native';
import Strings from "../components/Strings";

export interface Props {
    navigation: any
}

const StartScreen: React.FC<Props> = (props) => {
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [difficulties, setDifficulties] = useState([
        'Easy', 'Medium', 'Hard'
    ]);
    const [difficulty, setDifficulty] = useState('');

    const start = () => {
        const category1 = category === 0 ? categories[Math.floor(Math.random() * categories.length)].id : category;
        const difficulty1 = difficulty === '' ? difficulties[Math.floor(Math.random() * difficulties.length)] : difficulty;
        console.log({category:category1, difficulty: difficulty1.toLowerCase()});
        const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}`;
        axios.get(url)
            .then(res => {
                if (res.data.response_code !== 0) {
                    alert(Strings.noQuestion);
                }
                else{
                    props.navigation.navigate('Question', {questions:res.data.results});
                }
            });

        // props.navigation.navigate('Question', {category, difficulty: difficulty.toLowerCase()});

    };

    useEffect(() => {
        const url = 'https://opentdb.com/api_category.php';
        axios.get(url)
            .then(res => setCategories(res.data.trivia_categories));
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{Strings.introHeader}</Text>
            <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={(id, itemIndex) => {
                    setCategory(id)
                }}>
                <Picker.Item label={Strings.noCat} value={0}/>
                {categories.map((cat, i) => {
                    return <Picker.Item key={i} label={cat.name} value={cat.id}/>
                })}
            </Picker>
            <Picker
                selectedValue={difficulty}
                style={styles.picker}
                onValueChange={(value, itemIndex) => {
                    setDifficulty(value)
                }}>
                <Picker.Item label={Strings.noDiff} value={''}/>
                {difficulties.map((diff, i) => {
                    return <Picker.Item key={i} label={diff} value={diff}/>
                })}
            </Picker>
            <Button
                disabled={categories.length === 0}
                title={Strings.start}
                onPress={start}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    picker: {
        height: 50,
        marginVertical: 10,
    },
    header: {
        marginBottom: 40,
        alignSelf: 'center',
        fontSize: 20
    }
});

export default StartScreen;
