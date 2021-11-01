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

import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
  authDomain: "kaarobaar-mobile-app.firebaseapp.com",
  projectId: "kaarobaar-mobile-app",
  storageBucket: "kaarobaar-mobile-app.appspot.com",
  messagingSenderId: "1035731338707",
  appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
  measurementId: "G-VSG6MB0S61"
};
export default SignInScreen = ({ navigation, setToken }) => {

  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    'email': "",
    'password': ""
  });
  const onDetailsChange = (name, value) => {
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }

    })
  };

  const handleSubmit = async () => {

    if (details.email && details.password) {
      setError('');
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
        firebase.app();
      } else {
        firebase.app(); // if already initialized, use that one
      }



      firebase.auth().signInWithEmailAndPassword(details.email, details.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          setToken(user.uid);
          navigation.navigate('HomeScreen');
          // ...
        })
        .catch((error) => {
          console.log(error);
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage);
        });
    }
    else {
      setError("Don't leave any fields empty!");

    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
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
            value={details.email}
            placeholder={'email'}
            onChangeText={text => { onDetailsChange('email', text) }}
            secureTextEntry={false}


          />

          <Input
            value={details.password}
            placeholder={'password'}
            onChangeText={text => { onDetailsChange('password', text) }}
            secureTextEntry={true}

          />
        </View>
      </View>
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
