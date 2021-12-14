import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
    SafeAreaView,
    RefreshControl,
    StyleSheet,
    StatusBar,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Platform,
    PermissionsAndroid,
    Alert,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import BookingCard from './BookingCard';
import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/storage"
import CameraRoll from '@react-native-community/cameraroll';

const firebaseConfig = {
    apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
    authDomain: "kaarobaar-mobile-app.firebaseapp.com",
    projectId: "kaarobaar-mobile-app",
    storageBucket: "kaarobaar-mobile-app.appspot.com",
    messagingSenderId: "1035731338707",
    appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
    measurementId: "G-VSG6MB0S61"
};

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const BookingScreen = props => {
    const [myBookings, setMyBookings] = useState([]);
    const [once, setOnce] = useState(true);
    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => setRefreshing(false));
    }, []);

    const saveFile = async (fileUri) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status === "granted") {
            const asset = await MediaLibrary.createAssetAsync(fileUri)
            await MediaLibrary.createAlbumAsync("Download", asset, false)
            alert("Invoice can be found in gallery");
        }
    }

    const downloadFile = (img_uri, str) => {
        const uri = img_uri;
        let fileUri = FileSystem.documentDirectory + str + ".png";
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                saveFile(uri);
            })
            .catch(error => {
                console.error(error);


            })
        setLoading(false);
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
        var token = props.getToken();
        const getBookingDetails = async () => {
            console.log("called");
            const docRef = db.collection(`/bookings/${token}/mybookings`);
            docRef
                .get()
                .then((docs) => {
                    if (!docs.empty) {
                        console.log("bookings found");
                        setMyBookings([]);
                        docs.forEach((doc) => {

                            console.log(JSON.stringify(doc.data()));
                            var toAppend = doc.data();
                            toAppend.bookingid = doc.id;

                            setMyBookings((prev) => {
                                return [...prev, toAppend];
                            });
                        });
                    }
                    else {
                        console.log("no bookings found");
                    }
                });
        }
        getBookingDetails();
        console.log("This is what i am looking for")
        console.log(myBookings)
        setLoading(false);
    }, [refreshing]);

    const getInvoice = (bookingid) => {
        console.log('called');
        // getPermissionAndroid();
        setLoading(true);
        var str = props.getToken();
        let imageRef = firebase.storage().ref("images/invoices/" + str + "/" + bookingid + "/invoice");
        // '/images/invoices/' + userId + '/' + bookingId + '/invoice'
        imageRef
            .getDownloadURL()
            .then((url) => {
                //from url you can fetched the uploaded image easily
                console.log(url);

                downloadFile(url, str);

            })
            .catch((error) => {

                console.log(error);


            });


    };
    return (
        loading ? <ActivityIndicator size="large" color="blue" /> : <ScrollView
            style={{
                flex: 1,
                backgroundColor: 'white',
            }}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            {
                myBookings.map((booking) => {

                    return <BookingCard id={booking.bookingid} booking={booking} method={getInvoice} />
                })
            }
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}><Text>swipe down to refresh</Text></View>
        </ScrollView>
    )
}

BookingScreen.propTypes = {

}

export default BookingScreen
