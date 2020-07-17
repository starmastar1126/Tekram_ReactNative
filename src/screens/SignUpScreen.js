import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import Colors from "../constants/Colors";
import AuthInputField from "../components/AuthInputField";
import IconMat from "react-native-vector-icons/MaterialCommunityIcons";
import { Formik } from "formik";
import * as Yup from "yup";
import { authApi } from "../api";
import NavigationService from "../navigation/routes/NavigationService";
import { connect } from "react-redux";
import { savePhone } from "../actions";

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const { width, height } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "phone number is not valide")
    .required("phone number is required"),
  password: Yup.string()
    .min(8, "password must have at least 8 characters")
    .max(60, "maximum length of password is 60 characters")
    .required("password is required"),
  name: Yup.string()
    .min(3, "you name is too small")
    .max(30, " your name is too big")
    .required("name is required"),
  fullAdress: Yup.string()
    .min(3, "your adresse is too small")
    .max(160, "your adresse is too big")
    .required("full adresse is required"),
  confirmPass: Yup.string()
    .oneOf([Yup.ref("password"), "confirmation must be the same as password"])
    .required("confirmation of password is required")
});

class SignUpScreen extends Component {
  state = {
    rememberMe: false,
    chosenCity: ""
  };

  handleCity = val => {
    this.setState({
      chosenCity: val
    });
  };

  savePhoneFromApi = phone => {
    this.props.saveUserPhone(phone);
    NavigationService.navigate("verificationCode");
  };

  render() {
    return (
      <Formik
        initialValues={{
          name: "",
          phone: "",
          city: "",
          fullAdress: "",
          password: "",
          confirmPass: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values, this.state.rememberMe);
          setSubmitting(true);
          authApi.SignUp(
            values,
            this.state.chosenCity,
            this.state.rememberMe,
            this
          );
          // test if the return type is an error or not
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          handleChange,
          errors,
          touched
        }) => (
          <View
            style={{
              flex: 1,
              width,
              backgroundColor: Colors.$white,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.title}>create an account</Text>
              <View style={styles.titleLigne} />
            </View>
            <View style={{ marginBottom: 10 }}>
              <AuthInputField
                value={values.name}
                name="name"
                placeholder="Name"
                keyboardType="default"
                iconName="user"
                handleChange={handleChange("name")}
                iconColor={touched.name && errors.name}
              />
              <AuthInputField
                value={values.phone}
                name="phone"
                placeholder="Phone number"
                keyboardType="phone-pad"
                iconName="phone"
                handleChange={handleChange("phone")}
                iconColor={touched.phone && errors.phone}
              />
              <AuthInputField
                value={this.state.chosenCity}
                name="city"
                placeholder="City"
                keyboardType="default"
                iconName="map-marker-outline"
                material
                handleChange={this.handleCity}
                dropdown={this.props.cities}
                iconColor={touched.city && this.state.chosenCity === ""}
              />
              <AuthInputField
                value={values.fullAdress}
                name="fullAdress"
                placeholder="Full Address"
                keyboardType="default"
                iconName="home"
                handleChange={handleChange("fullAdress")}
                iconColor={touched.fullAdress && errors.fullAdress}
              />
              <AuthInputField
                value={values.password}
                name="password"
                placeholder="Password"
                keyboardType="default"
                password
                iconName="lock"
                material
                handleChange={handleChange("password")}
                iconColor={touched.password && errors.password}
              />
              <AuthInputField
                value={values.confirmPass}
                name="confirmPass"
                placeholder="Confirm Password"
                keyboardType="default"
                password
                iconName="lock"
                material
                handleChange={handleChange("confirmPass")}
                iconColor={touched.confirmPass && errors.confirmPass}
              />
            </View>
            <View style={styles.Wrapper}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({
                    rememberMe: !this.state.rememberMe
                  });
                }}
                style={styles.rememberWrapper}
              >
                <IconMat
                  name={
                    this.state.rememberMe
                      ? "checkbox-marked-outline"
                      : "checkbox-blank-outline"
                  }
                  size={17}
                  color={Colors.$textInputTextGray}
                  style={{ fontWeight: "bold" }}
                />

                <Text style={styles.rememberText}> Remember me </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
            <Text style={styles.fogotText}> Forgot Password? </Text>
          </TouchableOpacity> */}
            </View>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 40
              }}
            >
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={styles.button}
              >
                {/* <View style={{ paddingVertical: 8 }}>
                  <ActivityIndicator size="small" color={Colors.$white} />
                </View> */}

                <Text style={styles.buttonText}>sign up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    );
  }
}

const styles = StyleSheet.create({
  Wrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "65%",
    justifyContent: "space-between"
  },
  rememberWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  rememberText: {
    fontSize: 13,
    color: Colors.$authSecTextGray,
    marginLeft: 7
  },
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
    width: "70%"
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 7,
    textTransform: "capitalize"
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    //marginTop: 70,
    width: "100%",
    marginBottom: 30
  },
  title: {
    color: Colors.$gray,
    textTransform: "uppercase",
    fontSize: 18
  },
  titleLigne: {
    backgroundColor: Colors.$orange,
    width: "30%",
    height: 3,
    borderRadius: 50,
    marginTop: 5
  }
});

const mapStateToProps = ({ userReducer }) => {
  console.log(userReducer);
  return {
    phone: userReducer.phone,
    cities: userReducer.cities
  };
};

const mapDispatchToProps = dispatch => {
  return {
    saveUserPhone: phone => dispatch(savePhone(phone))
  };
};

//export const SignUpScreencc = connect(SignUpScreen);
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
