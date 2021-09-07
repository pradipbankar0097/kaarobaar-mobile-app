import React from "react";
import { Image, StyleSheet } from 'react-native';

import { FontAwesome5 } from "@expo/vector-icons";

const Logo = ({ size }) => {
  return (
    // <FontAwesome5
    //   name="airbnb"
    //   color="indianred"
    //   size={size === "small" ? 40 : 100}
    // />
    <Image
        style={styles.tinyLogo}
        source={require('../assets/logos/logo-296x300.jpg')}
      />
  );
};



const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
});

export default Logo;
