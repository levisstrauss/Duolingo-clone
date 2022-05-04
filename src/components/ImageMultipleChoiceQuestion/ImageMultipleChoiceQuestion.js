import React, {useState} from 'react';
import {Alert, Text, View} from "react-native";
import styles from "./styles";
import { Button, ImageOption} from "../index";
import PropTypes from "prop-types";

const ImageMultipleChoiceQuestion = ({ question, onCorrect, onWrong }) => {
    const [selected, setSelected] = useState(null);

    function onButtonPress() {
        if(selected.correct) {
            // Alert.alert("Correct");
            // Move to the next question
            // setCurrentQuestionIndex(currentQuestionIndex + 1);
            onCorrect();
            setSelected(null);
        }else{
            onWrong();
        }
    }
    return (
        <>
            <Text style={styles.title}>{question.question}</Text>
            <View style={styles.optionsContainer}>
                {question.options.map((option) => (
                    <ImageOption
                        key={option.id}
                        image={option.image}
                        text={option.text}
                        isSelected={selected?.id === option.id}
                        onPress={() => setSelected(option)}
                    />
                ))}
            </View>
            <Button text="Check" onPress={onButtonPress} disabled={!selected} />
        </>
    );
}

ImageMultipleChoiceQuestion.propTypes = {
  question: PropTypes.shape({
      question: PropTypes.string.isRequired,
      options: PropTypes.arrayOf(
          PropTypes.shape({
              id: PropTypes.string,
              text: PropTypes.string,
              image: PropTypes.string,
              correct: PropTypes.bool
          })
      ).isRequired,
  }).isRequired,
};

export default  ImageMultipleChoiceQuestion;
