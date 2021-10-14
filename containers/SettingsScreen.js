import React, { useState } from "react";
import { Button, Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar, Pressable } from "react-native";
import { FontAwesome, Ionicons } from '@expo/vector-icons'


export default function SettingsScreen({ navigation, setToken }) {
  const [setting, setSetting] = useState(true);
  const [contact, setContact] = useState(false);
  const [about, setAbout] = useState(false);
  const [pass, setPass] = useState(false);
  const [account, setAccount] = useState(false);
  function setfalse() {
    setSetting(false);
    setAccount(false);
    setAbout(false);
    setPass(false);
    setContact(false);
  }
  return (

    setting ?

      <View style={{ flex: 1, padding: 1 }}>
        <View style={{ flex: 0.7, flexDirection: 'column' }}>
          <Pressable onPress={() => { navigation.navigate('MyAccountScreen')}} style={styles.Pressable}>
            <View style={styles.rowitem}>
              <View style={styles.icons}><Ionicons
                name='person-outline'
                size={18}
              /></View>
              <View><Text style={styles.text}>My Account</Text></View>


            </View>


          </Pressable>
          <Pressable onPress={() => { navigation.navigate('ChangePasswordScreen')}} style={styles.Pressable}>
            <View style={styles.rowitem}>
              <View style={styles.icons}><Ionicons
                name='key-outline'
                size={18}
              /></View>
              <View><Text style={styles.text}>Change Password</Text></View>


            </View>


          </Pressable>
          <Pressable onPress={() => {
            //setContact(true);

            navigation.navigate("AboutUsScreen");
          }} style={styles.Pressable}>
            <View style={styles.rowitem}>
              <View style={styles.icons}><Ionicons
                name='information-circle-outline'
                size={18}
              /></View>
              <View><Text style={styles.text}>About us</Text></View>


            </View>


          </Pressable>
          <Pressable onPress={() => {
            //setContact(true);

            navigation.navigate("ContactUsScreen");
          }} style={styles.Pressable}>
            <View style={styles.rowitem}>
              <View style={styles.icons}><Ionicons
                name='call-outline'
                size={18}
              /></View>
              <View><Text style={styles.text}>Contact us</Text></View>


            </View>


          </Pressable>
        </View>

        <View style={{ flex: 0.3, flexDirection: 'column-reverse', padding: 10, alignItems: 'flex-end' }} >

          <View style={{ left: 0, width: 130 }}>
            <Button
              title="Log Out"
              onPress={() => { setToken(null) }}

            />

          </View>

        </View>


      </View>


      :
      contact ?
        <View>
          <Text>
            Contact Us
          </Text>
        </View>
        :
        about ?
          <View>
            <Text>
              About
            </Text>
          </View>
          :
          pass ?
            <View>
              <Text>Change Password</Text>
            </View>
            : null

  );








}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },

  Pressable: {
    padding: 20,
    backgroundColor: '#FFF',
    borderColor: "#F7DB15",
    borderWidth: 1,
    borderBottomEndRadius: 5



  },
  text: {

    fontSize: 18,
    padding: 5
  },
  icons: {
    padding: 5
  },
  rowitem: { flexDirection: "row" }
});