import React from "react";
import { View, Text, StyleSheet, Image, ColorPropType } from "react-native";
import Colors from "../constants/Colors";
import appConfig from "../constants/AppConfig.json";

const MotorcycleInfo = ({ driver }) => {
  return (
    <View style={styles.scene}>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={
            driver.image_url
              ? { uri: appConfig.api.baseUrl + driver.image_url }
              : require("../../assets/moto.jpg")
          }
        />
        <View
          style={{ justifyContent: "center", marginLeft: 15, width: "50%" }}
        >
          <Text style={styles.text}>{driver.description}</Text>
          <Text style={styles.text}>{driver.plate_number}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  img: {
    width: 150,
    height: 150,
    borderColor: Colors.$lightOrange,
    borderWidth: 1,
    marginLeft: 5
  },
  container: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 40
  },
  text: {
    fontSize: 15,
    color: Colors.$gray,
    textTransform: "capitalize"
  }
});

export default MotorcycleInfo;
