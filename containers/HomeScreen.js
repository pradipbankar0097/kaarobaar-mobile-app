import React, { useState, useEffect } from "react";
import axios from "axios";
import MyCarousel from "../components/Carousel";
import firebase from "firebase/app";
import 'firebase/firestore' 




import {
  ActivityIndicator,
  Image,
  Text,
  View,
  FlatList,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Button,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
// MANUALLY ADDED PLANS DATA
const firebaseConfig = {
  apiKey: "AIzaSyDVaHvaYxSIOEknWgkJniFwPhXNZuUXzY8",
  authDomain: "kaarobaar-mobile-app.firebaseapp.com",
  projectId: "kaarobaar-mobile-app",
  storageBucket: "kaarobaar-mobile-app.appspot.com",
  messagingSenderId: "1035731338707",
  appId: "1:1035731338707:web:efee5776bfb2d95d069b26",
  measurementId: "G-VSG6MB0S61"
};

const DATA = [
  {
    id: 'desksabcd',
    title: 'DESKS',
    price: 3490,
    priceForDuration: 'Month',
  },
  {
    id: 'privatecabinsabcd',
    title: 'PRIVATE CABINS',
    price: 6490,
    priceForDuration: 'Month',
  },
  {
    id: 'conferenceroomabcd',
    title: 'CONFERENCE ROOMS',
    price: 6490,
    priceForDuration: 'Month',
  },
  {
    id: 'virtualofficeabcd',
    title: 'VIRTUAL OFFICE',
    price: 9990,
    priceForDuration: 'Year',
  },
];


// END MANUALLY ADDED PLANS DATA

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [plansData, setPlansData] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get(
  //       "https://express-airbnb-api.herokuapp.com/rooms"
  //     );
  //     setData(response.data);
  //     setIsLoading(false);
  //   };
  //   fetchData();
  // }, []);

  const displayStars = (value) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      tab.push(
        <Ionicons
          name="star"
          size={24}
          color={i <= value ? "goldenrod" : "grey"}
          key={i}
        />
      );
    }

    return tab;
  };

  // data retrieval from firebase
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      firebase.app();
    } else {
      firebase.app(); // if already initialized, use that one
    }
    // firebase.initializeApp(firebaseConfig);
    // firebase.app();
    var db = firebase.firestore();

    db.collection("plans").get().then((querySnapshot) => {
      var cities = [];
      querySnapshot.forEach((doc) => {
        cities.push(doc.data().name);
        setPlansData((prev) => {
          return [...prev, doc.data()];
        });
      });
    });
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="indianred" />
  ) : (
    <ScrollView>
      <MyCarousel />


      {plansData.map((plan) => (
        <View
          key={plan.id}
          style={{
            padding: 20,
          }}
        >
          <TouchableOpacity
            underlayColor='red'
            onPress={() => {
              navigation.navigate("Room", { roomId: plan.id });
              console.log(`passed the paramater from home ${plan.Id}`);
            }}
          >
            <View
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                shadowRadius: 7,
                shadowColor: 'rgba(0, 0, 0, 0.11)',
                backgroundColor: '#EE4F4F',
              }}
            >
              <View style={{ paddingTop: 15, }}><Text style={{ fontSize: 30, fontWeight: 'bold', }}>{plan.title}</Text></View>
              <View style={{ paddingTop: 10, }}><Text style={{ fontSize: 20, }}>STARTS AT</Text></View>
              <View style={{ paddingTop: 10, paddingBottom: 12, }}><Text style={{ fontSize: 25, color: '#F7DB15', }}>₹ {plan.price}/{plan.priceForDuration}</Text>
              </View>
              <View style={{ paddingTop: 8, paddingBottom: 15 }}><Button color='#F7DB15' title="SEE ALL PLANS" /></View>

            </View>
          </TouchableOpacity>
        </View>
      ))}

      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.container}
              onPress={() => {
                navigation.navigate("Room", { roomId: item._id });
              }}
            >
              <ImageBackground
                source={{ uri: item.photos[0].url }}
                style={styles.bgImg}
              >
                <View style={styles.price}>
                  <Text style={styles.priceText}>{item.price} €</Text>
                </View>
              </ImageBackground>
              <View style={styles.line}>
                <View style={styles.infosContainer}>
                  <Text numberOfLines={1} style={styles.title}>
                    {item.title}
                  </Text>
                  <View style={styles.rating}>
                    {displayStars(item.ratingValue)}
                    <Text style={{ marginLeft: 10 }}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <View style={{ justifyContent: "center", marginLeft: 10 }}>
                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.profileImg}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
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
    height: 100,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
  },
  eventsView: {
    //width:'100vw',
    height: Dimensions.get('screen').width * 1.3,
    backgroundColor: 'green',
  }
});
