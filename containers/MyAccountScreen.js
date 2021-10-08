import React, { useState, useEffect } from "react";

import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/storage"
import * as ImagePicker from 'expo-image-picker';




import {
    Text,
    Image,
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Platform,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";



import Input from "../components/Input.js";


const MyAccountScreen = ({ navigation, setToken, getToken }) => {
    const [details, setDetails] = useState({
        'email': '',
        'name': '',
        'company_name': '',
        'designation': '',
        'phone': '',
        'gender': '',


    });

    const [isLoading, setIsLoading] = useState(true);
    const firebaseConfig = {
        apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
        authDomain: "kaarobaar-mobile-app.firebaseapp.com",
        projectId: "kaarobaar-mobile-app",
        storageBucket: "kaarobaar-mobile-app.appspot.com",
        messagingSenderId: "1035731338707",
        appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
        measurementId: "G-VSG6MB0S61"
    };
    ///////////////////////////////////image upload////////////////////////////////








    const [image, setImage] = useState(null);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            uploadImage(result.uri);

        }
    };

    const uploadImage = async (uri) => {
        const response = await fetch(uri);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + getToken() + "/profilepic/img");

        return ref.put(blob);
    }


    const handleImageUpload = () => {
        if (!firebase.apps.length) {

            firebase.initializeApp(firebaseConfig);
        } else {

            var app = firebase.app(); // if already initialized, use that one
        }

        pickImage();

    }

    ////////////////////////////////////////////////////////////////////


    const onDetailsChange = (name, value) => {
        setDetails((prev) => {
            return {
                ...prev,
                [name]: value


            }

        })
    }

    const handleSubmit = () => {
        if (!firebase.apps.length) {

            firebase.initializeApp(firebaseConfig);
        } else {

            firebase.app(); // if already initialized, use that one
        }
        // firebase.initializeApp(firebaseConfig);
        // firebase.app();

        var db = firebase.firestore();
        var token = getToken();



        db.collection('users').doc(token).set({
            ...details



        }).then(() => { console.log('done updating user info') }).catch((error) => { console.log(error) })




    }


    useEffect(() => {

        if (!firebase.apps.length) {

            firebase.initializeApp(firebaseConfig);
        } else {

            firebase.app(); // if already initialized, use that one
        }
        // firebase.initializeApp(firebaseConfig);
        // firebase.app();
        var db = firebase.firestore();
        var token = getToken();

        if (getToken() != null) {
            var str = getToken();

            var docRef = db.collection('users').doc(str);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data new:", doc.data());
                    var obj = doc.data()
                    setDetails((prev) => {
                        return {
                            ...prev,
                            ...obj,

                        }

                    })
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });

            let imageRef = firebase.storage().ref("images/" + str + "/profilepic/img");
            imageRef
                .getDownloadURL()
                .then((url) => {
                    //from url you can fetched the uploaded image easily
                    setImage(url);
                })
                .catch((error) => {
                    setImage(null);
                    console.log(error)


                });


        }


        setIsLoading(false);

    }, []);


    return isLoading ? (
        <ActivityIndicator size="large" color="indianred" />
    ) : (
        <View style={styles.container}>

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
            >
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingTop: 20

                    }}
                >
                    {image ? <Image source={{ uri: image }} style={{ width: 200, height: 180, borderRadius: 50 }} /> : <ActivityIndicator size="large" color="blue" />}
                </View>

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 20
                    }}
                >
                    <Button color="#F7DB15" title="upload image" onPress={pickImage} />
                    {/* <Button title="Upload image" onPress={uploadImage} /> */}
                    <Input



                        value={details.email}
                        placeholder={'email'}
                        onChangeText={text => { onDetailsChange('email', text) }}
                        secureTextEntry={false}
                    />

                    <Input
                        onChangeText={text => { onDetailsChange('name', text) }}

                        value={details.name}
                        placeholder="name"
                        secureTextEntry={false}
                    />
                    <Input
                        onChangeText={text => { onDetailsChange('company_name', text) }}

                        value={details.company_name}
                        placeholder="Comapny Name"
                        secureTextEntry={false}
                    />
                    <Input
                        onChangeText={text => { onDetailsChange('designation', text) }}

                        value={details.designation}
                        placeholder="Designation"
                        secureTextEntry={false}
                    />
                    <Input
                        onChangeText={text => { onDetailsChange('phone', text) }}

                        value={details.phone}
                        placeholder="Phone"
                        secureTextEntry={false}
                    />
                    <Input
                        onChangeText={text => { onDetailsChange('gender', text) }}

                        value={details.gender}
                        placeholder="Gender"
                        secureTextEntry={false}
                    />



                </View>



                <View style={{ alignItems: 'center' }}>

                    <TouchableOpacity style={styles.btn} onPress={handleImageUpload}>
                        <Text style={styles.btnText}>Update</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>
    );

};
export default MyAccountScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor:'red'

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
    btn: {
        paddingVertical: 10,
        paddingHorizontal: 40,


        borderColor: "indianred",
        borderWidth: 2,
        borderRadius: 30,
        margin: 10,
        alignItems: 'center'
    },

    btnText: {
        color: "grey",
        fontSize: 20,
    },
});
