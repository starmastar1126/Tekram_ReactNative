import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";

const { height, width } = Dimensions.get("window");

const AboutUs = () => {
  return (
    <View style={{ flex: 1, width, backgroundColor: Colors.$white }}>
      <Header
        title="about us"
        leftIcon={<Icon name="menu" size={25} color={Colors.$primaryBlue} />}
        drawer
        //rightIcon={<Icon name="star" size={22} color={Colors.$starOrange} />}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </Text>
        <Text style={[styles.text, { marginTop: 15 }]}>
          Lorem ipsum dolor sit amet, cons ectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
          volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
          ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat, vel illum dolore eu feugiat nulla facilisis at
          vero eros et accumsan et iusto odio dignissim qui blandit praesent
          luptatum zzril delenit augue duis dolore te feugait nulla facilisi.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flex: 1,
    //justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 40
  },
  text: {
    fontSize: 14,
    color: Colors.$primaryBlue,
    textAlign: "center"
  }
});

export default AboutUs;
export { AboutUs };
