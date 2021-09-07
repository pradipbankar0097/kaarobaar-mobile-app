import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";

const LargeInput = ({ setFunction, placeholder }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={(text) => {
        setFunction(text);
      }}
      multiline={true}
    />
  );
};

export default LargeInput;

const styles = StyleSheet.create({
  input: {
    height: 120,
    width: "70%",
    borderColor: "indianred",
    borderWidth: 2,
    marginTop: 20,
  },
});
