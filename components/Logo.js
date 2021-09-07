import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";

const Logo = ({ size }) => {
  return (
    <FontAwesome5
      name="airbnb"
      color="indianred"
      size={size === "small" ? 40 : 100}
    />
  );
};

export default Logo;
