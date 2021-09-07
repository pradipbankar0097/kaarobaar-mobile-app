import React from "react";

import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  );
};

export default GoBack;
