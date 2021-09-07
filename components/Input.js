import React from "react";
import { StyleSheet, TextInput } from "react-native";

const Input = ({ setFunction, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => {
        setFunction(text);
      }}
      secureTextEntry={secureTextEntry}
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
