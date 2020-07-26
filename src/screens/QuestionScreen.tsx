import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Button from "../components/Button";
import Colors from "../components/Colors";
import {StackActions} from "@react-navigation/routers";

export interface Props {
    navigation: any,
    index?: number,
    questions: Array<any>,
    joker?: number
}

type TQuestion = {
    question: string,
    correct_answer: string,
    incorrect_answers: Array<string>
}

type CurrQuestion = {
    question: string,
    answers: Array<string>,
    correct_answer: string
}

let timer: any;
const QuestionScreen: React.FC<Props> = (props) => {
    const [questions, setQuestions] = useState(props.questions || []);
    const [current_question, setCurrentQuestion] = useState({question: '', answers: [], correct_answer: ''});
    const [index, setIndex] = useState(props.index || 1);
    const [counter, setCounter] = useState(15);
    const [point, setPoint] = useState(0);
    const [disable, setDisable] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [joker, setJoker] = useState(props.joker || 0);

    // shuffle array to be randomly
    const shuffle = (a: Array<string>) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    };

    const getQuestion = (q: TQuestion) => {
        const {question, correct_answer, incorrect_answers} = q;
        const answers = [correct_answer, ...incorrect_answers];
        return {question, answers: shuffle(answers), correct_answer};
    };

    const answer = (q: string) => {
        setDisable(true);
        console.log({q, res: current_question.correct_answer === q, current_question});
        clearInterval(timer);
        if (current_question.correct_answer === q) {
            const questions_ = [...questions];
            questions_.shift();
            console.log({status: 'success', point, index})
            props.navigation.dispatch(
                StackActions.replace('Last', {
                    joker,
                    questions: questions_,
                    totalTime,
                    status: 'success',
                    point,
                    index
                }))
        } else {
            props.navigation.dispatch(
                StackActions.replace('Last', {status: 'fail', totalTime, point})
            );
        }
    };

    const useJoker = () => {
        setJoker(1);
        const current = {...current_question};
        const {correct_answer} = current;
        let {answers} = current;
        const len = answers.length === 4 ? 2 : 1;
        answers = answers.filter(a => a !== correct_answer);
        for (let i: number = 0; i < len; i++) {
            const rand = Math.floor(Math.random() * Math.floor(answers.length));
            answers = answers.filter((v: string, index: number) => index !== rand);
        }
        answers = [correct_answer,...answers];
        current.answers = answers;
        setCurrentQuestion(current)
    };

    useEffect(() => {
        const {questions, point, joker,index} = props.route.params;
        setQuestions(questions);
        if (typeof index === 'number') setIndex(index);
        if (typeof point === 'number') setPoint(point);
        if (typeof joker === 'number') setJoker(joker);
        setCurrentQuestion(getQuestion(questions[0]));
        let i = 15;
        timer = setInterval(() => {
            i--;
            setCounter(i);
            if (i === 0) {
                clearInterval(timer);
                props.navigation.dispatch(
                    StackActions.replace('Last', {status: 'timeup', totalTime, point})
                );
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [questions]);
    return (
        <>
            <View style={styles.top}>
                <View style={styles.box}><Text style={styles.boxText}>{`${index}/10`}</Text></View>
                <View style={styles.box}><Text style={styles.boxText}>{`Score: ${point}`}</Text></View>
                <View style={styles.box}><Text style={styles.boxText}>{counter}</Text></View>
            </View>
            {joker === 0 &&
            <TouchableOpacity style={styles.joker} onPress={useJoker}>
                <Text style={styles.jokerText}>50%</Text>
            </TouchableOpacity>
            }
            <View style={styles.container}>
                {current_question && current_question.answers.length > 0 &&
                <>
                    <Text style={styles.question}>{current_question.question}</Text>
                    {current_question.answers.map((q: string, i: number) => {
                        return <Button
                            key={i}
                            title={q}
                            disabled={disable}
                            onPress={() => answer(q)}
                        />
                    })}
                </>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    question: {
        marginBottom: 30,
        fontSize: 22
    },
    top: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.btn
    },
    box: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
    },
    boxText: {
        color: Colors.white
    },
    joker: {
        height: 80,
        backgroundColor: Colors.btn,
        borderRadius: 50,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    jokerText: {
        color: Colors.white,
        fontSize: 20
    }
});

export default QuestionScreen;
