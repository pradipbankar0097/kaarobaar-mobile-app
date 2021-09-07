import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  View,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

export default function RoomScreen({ route }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [displayAllText, setDisplayAllText] = useState(false);

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
      <ImageBackground
        source={{ uri: data.photos[0].url }}
        style={styles.bgImg}
      >
        <View style={styles.price}>
          <Text style={styles.priceText}>{data.price} €</Text>
        </View>
      </ImageBackground>
      <View style={styles.line}>
        <View style={styles.infosContainer}>
          <Text numberOfLines={1} style={styles.title}>
            {data.title}
          </Text>

          <View style={styles.rating}>
            {displayStars(data.ratingValue)}
            <Text style={{ marginLeft: 10, color: "grey" }}>
              {data.reviews} reviews
            </Text>
          </View>
        </View>
        <View style={{ justifyContent: "center", marginLeft: 10 }}>
          <Image
            source={{ uri: data.user.account.photo.url }}
            style={styles.profileImg}
          />
        </View>
      </View>
      <View style={styles.description}>
        <Text
          numberOfLines={displayAllText === false ? 3 : null}
          onPress={() => {
            setDisplayAllText(!displayAllText);
          }}
        >
          {data.description}
        </Text>
      </View>
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
