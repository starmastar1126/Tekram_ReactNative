import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/FontAwesome";

const FirstRoute = ({ driver }) => (
  <View style={[styles.scene, { alignItems: "center" }]}>
    <View
      style={{
        flexDirection: "row",
        alignItems: "baseline",
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <Text style={styles.menuProp}>name:</Text>
      <Text style={styles.menuText}> {driver.name}</Text>
    </View>
    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
      <Text style={styles.menuProp}>joining since:</Text>
      <Text style={styles.menuText}>{driver.created_at}</Text>
    </View>
    <View style={{ marginTop: 40, justifyContent: "center" }}>
      <Text
        style={[styles.menuText, { textAlign: "center", fontWeight: "bold" }]}
      >
        rating:
      </Text>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10
        }}
      >
        <TouchableOpacity>
          <View
            style={[
              styles.button,
              {
                backgroundColor: Colors.$lightOrange,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }
            ]}
          >
            <Icon name="star" size={20} color={Colors.$white} />
            <Text style={styles.buttonText}>200 review</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    paddingHorizontal: 25,
    width: "50%"
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 7,
    textTransform: "capitalize"
  },
  scene: {
    flex: 1
  },
  menuProp: {
    color: Colors.$primaryBlue,
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "bold",
    marginRight: 10
  },
  menuText: {
    color: Colors.$menuGray,
    textTransform: "capitalize",
    fontSize: 15,
    fontWeight: "900"
  }
});

export default FirstRoute;
