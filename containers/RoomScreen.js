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
import { db } from './HomeScreen';

export default function RoomScreen({ route }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);
  const [allPlansData, setAllPlansData] = useState([]);

  useEffect(() => {
    db.collection("plans/"+route.params.roomId+"/allplans").orderBy("price").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data())
        setAllPlansData((prev) => {
          return [...prev, doc.data()];
        });
      });
      setIsLoading(false);
    });
  }, []);

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
  

  const displayStars = (value) => {
    const tab = [];

    for (let i = 1; i <= 5; i++) {
      tab.push(
        <FontAwesome
          name="star"
          size={24}
          color={i <= value ? "goldenrod" : "grey"}
          key={i}
        />
      );
    }
    return tab;
  };

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
          <TouchableOpacity
            underlayColor = 'red'
            onPress={() => {
              navigation.navigate("Room", { roomId: plan.id });
            }}
          >
          <View 
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
          <View style={{paddingTop:8,paddingBottom:15}}><Button color='#F7DB15' title="GET WORKPLACE"/></View>
            
        </View>
        </TouchableOpacity>
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
