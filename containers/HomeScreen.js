import React, { useState, useEffect } from "react";
import axios from "axios";
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
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// MANUALLY ADDED PLANS DATA

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];


// END MANUALLY ADDED PLANS DATA

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://express-airbnb-api.herokuapp.com/rooms"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

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
      {/* for events */}
      <View
        style={styles.eventsView}
      >
        <Text>Space for events</Text>
      </View>
      {/* end for events */}
      <FlatList
      data={DATA}
      keyExtractor={(item) => item.id}
      renderItem={
        ({item})=>{
          return (
            <View>
              <Text>{item.title}</Text>
            </View>
          );
        }
      }/>
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
  eventsView:{
    //width:'100vw',
    height: Dimensions.get('screen').width*1.3,
    backgroundColor:'green',
  }
});
