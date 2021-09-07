import React, { useState } from "react";

import {
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";

import Logo from "../components/Logo.js";
import MainTitle from "../components/MainTitle.js";
import Input from "../components/Input.js";
import LargeInput from "../components/LargeInput.js";

const SignUpScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      setError("");
      if (password === confirmPassword) {
        setError("");
        try {
          /* Requete serveur */

          const response = await axios.post(
            "https://express-airbnb-api.herokuapp.com/user/sign_up",
            { email, username, password, description }
          );
          console.log(response.data);
          if (response.data.token) {
            setToken(response.data.token);
          }
        } catch (error) {
          if (
            error.response.data.error ===
              "This email already has an account." ||
            error.response.data.error ===
              "This username already has an account."
          ) {
            setError(error.response.data.error);
          } else {
            setError("An error occured");
          }
        }
      } else {
        setError("Password must be the same");
      }
    } else {
      setError("Please fill all fields");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Logo />
            <MainTitle title={"Sign up"} />
          </View>

          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Input
              setFunction={setEmail}
              placeholder="email"
              secureTextEntry={false}
            />

            <Input
              setFunction={setUsername}
              placeholder="username"
              secureTextEntry={false}
            />

            <LargeInput
              setFunction={setDescription}
              placeholder="Describe yourself in a few words..."
              secureTextEntry={false}
            />

            <Input
              placeholder="password"
              secureTextEntry={true}
              setFunction={setPassword}
            />

            <Input
              placeholder="confirm password"
              secureTextEntry={true}
              setFunction={setConfirmPassword}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "red", textAlign: "center", marginTop: 20 }}>
              {error}
            </Text>

            <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.btnText}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignIn");
              }}
            >
              <Text style={{ color: "grey", textAlign: "center" }}>
                Already have an account ? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scrollView: {
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },

  btn: {
    paddingVertical: 10,
    paddingHorizontal: 40,

    borderColor: "indianred",
    borderWidth: 2,
    borderRadius: 30,
    margin: 10,
  },

  btnText: {
    color: "grey",
    fontSize: 20,
  },
});
