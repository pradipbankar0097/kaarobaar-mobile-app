import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { View,Text,ScrollView } from 'react-native'
import BookingCard from './BookingCard';
import firebase from 'firebase/app'
import "firebase/firestore"
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
    authDomain: "kaarobaar-mobile-app.firebaseapp.com",
    projectId: "kaarobaar-mobile-app",
    storageBucket: "kaarobaar-mobile-app.appspot.com",
    messagingSenderId: "1035731338707",
    appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
    measurementId: "G-VSG6MB0S61"
};

const BookingScreen = props => {
    const [myBookings, setMyBookings] = useState([]);
    const [once, setOnce] = useState("");
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
            .then((docs)=>{
                if(!docs.empty){
                    console.log("bookings found");
                    docs.forEach((doc)=>{
                        console.log(JSON.stringify(doc.data()));
                        var toAppend = doc.data();
                        toAppend.bookingid = doc.id;
                        setMyBookings((prev)=>{
                            return [...prev,toAppend];
                        });
                    });
                }
                else{
                    console.log("no bookings found");
                }
            });
        }
        getBookingDetails();
    }, [once]);
    return (
        <ScrollView
            style={{
                flex:1,
                backgroundColor:'white',
            }}
        >
            {
                myBookings.map((booking)=>{

                    return <BookingCard booking={booking} />
                })
            }
        </ScrollView>
    )
}

BookingScreen.propTypes = {

}

export default BookingScreen
