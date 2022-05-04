import React, { useState, useEffect } from 'react'
import {View, Alert, ActivityIndicator} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./App.styles";
import {ImageMultipleChoiceQuestions, OpenEndedQuestion, Header, FillInTheBlank} from "./src/components";
import questions from "./assets/data/allQuestions";

const App = () => {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(questions[currentQuestionIndex]);
    const [lives, setLives] = useState(5);
    const [hasLoaded, setHasLoaded] = useState(false);

    //side Effect
    useEffect(()  => {
        if(currentQuestionIndex >= questions.length){
            Alert.alert("Congratulations! You won!");
            setCurrentQuestionIndex(0);
        }else{
            setCurrentQuestion(questions[currentQuestionIndex])
        }
    }, [currentQuestionIndex]);


    useEffect(() =>{
        loadData();
    }, []);

    useEffect(() =>{
        if(hasLoaded){
            saveData();
        }
    }, [lives, currentQuestionIndex, hasLoaded]);


    const onCorrect = () => {
         setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    const restart = () => {
        setLives(5);
        setCurrentQuestionIndex(0)
    }

     const onWrong = () => {
        if(lives <= 1){
            Alert.alert("Game over", "Try again", [
                {
                    text: "Try again",
                    onPress: restart,
                },
            ]);
        }else{
            Alert.alert("Wrong answer");
            setLives(lives - 1);
        }
    }

    const saveData = async() => {
        try {
            await AsyncStorage.setItem('lives', lives.toString());
            await AsyncStorage.setItem('currentQuestionIndex', currentQuestionIndex.toString());
        } catch (e) {
            // saving error
        }
    }

    const loadData = async() => {
        try {
           const loadedLives = await AsyncStorage.getItem('lives');
           if(loadedLives){
               setLives(parseInt(loadedLives));
           }
        } catch (e) {
            // saving error
        }
        try {
            const currentQuestionIndex = await AsyncStorage.getItem('currentQuestionIndex');
            if(currentQuestionIndex){
                setCurrentQuestionIndex(0)
                // setCurrentQuestionIndex(parseInt(currentQuestionIndex));
            }
            setHasLoaded(true);
        } catch (e) {
            // saving error
        }

    }

    if (!hasLoaded){
        return (<ActivityIndicator />)
    }

    return (
        <View style={styles.root}>
            <Header progress={currentQuestionIndex / questions.length} lives={lives}/>
            {currentQuestion.type === "FILL_IN_THE_BLANK" && (
                <FillInTheBlank
                    question={currentQuestion}
                    onCorrect={onCorrect}
                    onWrong={onWrong}
                />
            )}
            {currentQuestion.type === "IMAGE_MULTIPLE_CHOICE" &&
                (
                    <ImageMultipleChoiceQuestions
                        question={currentQuestion}
                        onCorrect={onCorrect}
                        onWrong={onWrong}
                    />
                )}
            {currentQuestion.type === "OPEN_ENDED" ?
                (<OpenEndedQuestion
                    question={currentQuestion}
                    onCorrect={onCorrect}
                    onWrong={onWrong}
                />
                )
            :null}

      </View>
  );
};

export default App;

