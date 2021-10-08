import React, { useState } from "react";
import MyComponent from "../components/Tour.js";

import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


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
const firebaseConfig = {
  apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
  authDomain: "kaarobaar-mobile-app.firebaseapp.com",
  projectId: "kaarobaar-mobile-app",
  storageBucket: "kaarobaar-mobile-app.appspot.com",
  messagingSenderId: "1035731338707",
  appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
  measurementId: "G-VSG6MB0S61"
};

const SignUpScreen = ({ navigation, setToken }) => {

  const [details, setDetails] = useState(
    {
      'email': '',
      'password': '',
      'confirm_password': '',
      'name': ''

    }
  )
  const onDetailsChange = (name, value) => {
    setDetails((prev) => {
      return {
        ...prev,
        [name]: value
      }

    })
  }


  const [error, setError] = useState("");
  const [istourdone, setIsTourDone] = useState(false)
  const handleSubmit = async () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.app();
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(firebaseConfig);
    // firebase.app();
    var db = firebase.firestore();
    const fireAuth = firebase.auth()
    const valid = () => {
      if (details.confirm_password != '' && details.password != '' && details.email != '' && details.confirm_password == details.password) {
        return true;
      }
      else {
        return false;
      }
    }

    console.log(details.email + ' ' + details.password);
    if (valid()) {
      console.log('done');

      await fireAuth.createUserWithEmailAndPassword(details.email, details.password)
        .then((userCredential) => {
          // Signed in 
          console.log('signed in \n');
          var user = userCredential.user;
          setToken(user.uid);
          db.collection('users').doc(user.uid).set({
            email: details.email,
            name: details.name,
            company_name: '',
            phone: '',
            gender: '',
            social_profiles: [],
            designation: '',




          }).then(() => { console.log('done at least think soo') }).catch((error) => { console.log(error) })

          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
      // setError("");
      // if (password === confirmPassword) {
      //   setError("");
      //   try {
      //     /* Requete serveur */

      //     const response = await axios.post(
      //       "https://express-airbnb-api.herokuapp.com/user/sign_up",
      //       { email, username, password, description }
      //     );
      //     console.log(response.data);
      //     if (response.data.token) {
      //       setToken(response.data.token);
      //     }
      //   } catch (error) {
      //     if (
      //       error.response.data.error ===
      //         "This email already has an account." ||
      //       error.response.data.error ===
      //         "This username already has an account."
      //     ) {
      //       setError(error.response.data.error);
      //     } else {
      //       setError("An error occured");
      //     }
      //   }
      // } else {
      //   setError("Password must be the same");
      // }
    } else {
      setError("Please fill all fields");
      console.log(details.email, details.password, details.confirm_password)
    }
  };

  return (
    istourdone ? <SafeAreaView style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 20
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
            padding: 20
          }}
        >



          <Input



            value={details.email}
            placeholder={'email'}
            onChangeText={text => { onDetailsChange('email', text) }}
            secureTextEntry={false}
          />
          <Input



            value={details.name}
            placeholder={'name'}
            onChangeText={text => { onDetailsChange('name', text) }}
            secureTextEntry={false}
          />
          <Input



            value={details.password}
            placeholder={'password'}

            onChangeText={text => { onDetailsChange('password', text) }}
            secureTextEntry={true}
          />

          <Input



            value={details.confirm_password}
            placeholder={'confirm password'}
            onChangeText={text => { onDetailsChange('confirm_password', text) }}
            secureTextEntry={true}
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

    </SafeAreaView> : <MyComponent method={setIsTourDone} />
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50
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
