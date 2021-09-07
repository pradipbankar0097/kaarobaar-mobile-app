import React, { useState } from "react";

import {
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  View,
} from "react-native";
import Constants from "expo-constants";
import Logo from "../components/Logo";
import MainTitle from "../components/MainTitle";
import Input from "../components/Input";

const SignInScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (email && password) {
      setError("");
      try {
        const data = {};
        data.email = { email };

        data.password = { password };

        /* Requete serveur */

        const response = await axios.post(
          "https://express-airbnb-api.herokuapp.com/user/sign_up",
          data
        );
        console.log(response.data);
        if (response.data) {
          setToken(response.data.token);
        }
      } catch (error) {
        if (
          error.response.data.error === "This email already has an account." ||
          error.response.data.error === "This username already has an account."
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occured");
        }
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
          flex: 2,
        }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
          <MainTitle title={"Sign in"} />
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
            placeholder="password"
            secureTextEntry={true}
            setFunction={setPassword}
          />
        </View>
      </KeyboardAvoidingView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Sign in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={{ color: "grey", textAlign: "center" }}>
            No account ? Register
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;

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
