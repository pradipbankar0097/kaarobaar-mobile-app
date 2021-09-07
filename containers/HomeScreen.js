import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
});
