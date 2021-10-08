import React from "react";
import { StyleSheet, TextInput } from "react-native";
// import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";

const Input = (props) => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      style={styles.input}

    />
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: "70%",
    borderBottomColor: "indianred",
    borderBottomWidth: 2,
    margin: 10,
  },
});
