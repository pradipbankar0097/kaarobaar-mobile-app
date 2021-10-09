import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import firebase from 'firebase/app'
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
  authDomain: "kaarobaar-mobile-app.firebaseapp.com",
  projectId: "kaarobaar-mobile-app",
  storageBucket: "kaarobaar-mobile-app.appspot.com",
  messagingSenderId: "1035731338707",
  appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
  measurementId: "G-VSG6MB0S61"
};

export default function RoomScreen({ route,getToken }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);
  const [allPlansData, setAllPlansData] = useState([]);
  const [details, setDetails] = useState({
    'email': '',
    'name': '',
    'company_name': '',
    'designation': '',
    'phone': '',
    'gender': '',
  });

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(firebaseConfig);
    // firebase.app();
    var db = firebase.firestore();

    db.collection("plans/"+route.params.roomId+"/allplans").orderBy("price").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setAllPlansData((prev) => {
          return [...prev, doc.data()];
        });
      });
      setIsLoading(false);
    });

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
    }

  }, []);

  const bookThisPlan = async(e,planId,title,price,priceForDuration) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(firebaseConfig);
    // firebase.app();
    var db = firebase.firestore();
    const userId = getToken();
    const myBooking1 = await db.collection(`bookings/${userId}/mybookings`).add({
          confirmed : false,
          depositeamount : 0,
          durationnumber : 2,
          durationper : priceForDuration,
          name : details.name,
          outstanding : 0,
          paidamount : price,
          planid : planId,
          title : title,
          userid : userId,
    });
    console.log("Booking done with Id : ");
    alert("Booking done!");
  }

  /*
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://express-airbnb-api.herokuapp.com/rooms/${route.params.roomId}`
      );
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);
  */
  


  return isLoading ? (
    <ActivityIndicator size="large" color="indianred" />
  ) : (
    <ScrollView>
      {allPlansData.map((plan)=>(
        <View
          key={plan.id}
          style={{
            padding:20,
          }}
        >
          <View 
            key={plan.id}
            style={{
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              shadowRadius:7,
              shadowColor:'rgba(0, 0, 0, 0.11)',
              backgroundColor:'#EE4F4F',
            }}
          >
          <View style={{paddingTop:15,}}><Text style={{ fontSize:30, fontWeight:'bold', }}>{plan.title}</Text></View>
          <View style={{paddingTop:10,}}><Text style={{ fontSize:20, }}>PRICE</Text></View>
          <View style={{paddingTop:10,paddingBottom:12, }}><Text style={{ fontSize:25, color:'#F7DB15',  }}>₹ {plan.price}/{plan.priceForDuration}</Text>
          </View>
          <View style={{paddingTop:8,paddingBottom:15}}><Button color='#F7DB15' onPress={ (e)=>{bookThisPlan(e,plan.id,plan.title,plan.price,plan.priceForDuration)} } title="GET WORKPLACE"/></View>
            
        </View>
        </View>
      ))}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: "indianred",

    padding: 20,
  },
  bgImg: {
    width: "100%",
    height: 300,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  price: {
    backgroundColor: "black",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    minWidth: 100,
  },
  priceText: { color: "white", fontSize: 20 },
  infosContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  line: {
    flexDirection: "row",
    padding: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
  },
  description: {
    padding: 10,
  },
});
