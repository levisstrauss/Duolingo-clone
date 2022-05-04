import React from "react";
import {Text, Pressable} from "react-native";
import PropTypes from "prop-types";
import styles from "./styles"

const Button = ({ text, onPress, disabled }) => {
    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, disabled ? styles.disabledContainer : {}]}
            disabled={disabled}
        >
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}


Button.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func,
    disable: PropTypes.bool,
}


Button.defaultProps = {
    onPress: () => {},
    disabled: false,
}

export default Button;
