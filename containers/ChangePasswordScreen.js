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


const ChangePasswordScreen = ({ navigation, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [details, setDetails] = useState(
    {

      'old_password': "",
      'new_password': ""

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

  const handleSubmit = async () => {
    setError("");
    if (details.new_password == details.old_password) {
      alert("Choose a different password!");
    }
    else {
      const user = firebase.auth().currentUser;

      // TODO(you): prompt the user to re-provide their sign-in credentials
      const credential = firebase.auth.EmailAuthProvider.credential(user.email, details.old_password);

      user.reauthenticateWithCredential(credential).then(() => {

        user.updatePassword(details.new_password).then(() => {
          setError('password changed successfully');

        }).catch((error) => {
          setError('Try Again!');
        });
      }).catch((error) => {
        setError(`${error}`);
      });
      setDetails((pv) => {
        return {
          ...pv,
          'new_password': "",
          'old_password': ""
        }
      });









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
          <MainTitle title={"Change Password"} />
        </View>

        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Input


            value={details.old_password}
            placeholder={'current password'}
            onChangeText={text => { onDetailsChange('old_password', text) }}
            secureTextEntry={true}
          />

          <Input
            placeholder="New Password"

            value={details.new_password}
            placeholder={'new password'}
            onChangeText={text => { onDetailsChange('new_password', text) }}
            secureTextEntry={true}
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
        <Text style={{ color: "red", textAlign: "center", padding: 10, fontSize: 18 }}>{error}</Text>

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Update</Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

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
