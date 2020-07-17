import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Colors from '../constants/Colors';
const {height, width} = Dimensions.get('window');
import AuthInputField from '../components/AuthInputField';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch} from '../components/Switch';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {authApi} from '../api';
import NavigationService from '../navigation/routes/NavigationService';
import {connect} from 'react-redux';
import {saveToken, saveIsDriver} from '../actions';

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const secondregex = /(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})/;
const thinrregex = /\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/;

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, 'phone number is not valide')
    .required('phone number is required'),
  password: Yup.string()
    .min(8, 'password must have at least 8 characters')
    .max(60, 'maximum length of password is 60 characters')
    .required('password is required'),
});

class SignInScreen extends Component {
  state = {
    rememberMe: false,
    switchOn: false,
    isDriver: false,
  };

  saveUserTokenAndDate = (token) => {
    this.props.saveUserToken(token.access_token);
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          width,
          //justifyContent: "center",
          backgroundColor: '#ffffff',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 50,
            alignItems: 'flex-end',
            width: '100%',
            paddingHorizontal: 20,
          }}>
          <Switch
            style={{
              backgroundColor: 'red',
              width: 212,
              overflow: 'hidden',
            }}
            value={this.state.switchOn}
            onValueChange={(val) => this.setState({switchOn: val})}
            disabled={false}
            activeText={'Ar'}
            inActiveText={'En'}
            circleSize={27}
            barHeight={28}
            circleBorderWidth={0}
            backgroundActive={Colors.$iconsGray}
            backgroundInactive={Colors.$primaryBlue}
            circleActiveColor={Colors.$primaryBlue}
            circleInActiveColor={Colors.$iconsGray}
            changeValueImmediately={true}
            //renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
            changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
            // style for inner animated circle for what you (may) be rendering inside the circle
            outerCircleStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              //backgroundColor: "red"
            }} // style for outer animated circle
            renderActiveText={this.state.switchOn}
            renderInActiveText={!this.state.switchOn}
            switchLeftPx={7} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
            switchRightPx={9} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
            switchWidthMultiplier={2}
            containerStyle={{
              //marginHorizontal: 10,
              width: 60,
            }}
            activeTextStyle={{
              padding: 0,
              margin: 0,
            }}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Image
              source={require('../../assets/tekram.png')}
              style={styles.img}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            <Text style={styles.welcome}>Welcome to </Text>
            <Text style={styles.tkram}>tkram</Text>
          </View>
        </View>
        <Formik
          initialValues={{phone: '', password: ''}}
          validationSchema={validationSchema}
          onSubmit={(values, {setSubmitting, resetForm}) => {
            console.log(values, this.state.rememberMe);
            setSubmitting(true);
            authApi
              .SignIn(values, this.state.rememberMe, this.saveUserTokenAndDate)
              .then((res) => {
                console.log(res);
                if (res === 'verify') {
                  //console.log("dadadada");
                  //alert("dadada");
                  Alert.alert(
                    'verify code',
                    'we will send another code per sms please check it to activate your account',
                    [
                      {
                        text: 'ok',
                        onPress: () => {
                          authApi
                            .reSendPasswordSms(values.phone, 'signup')
                            .then((res) => {
                              if (res) {
                                //resetForm();
                                setSubmitting(false);
                                NavigationService.navigate('verificationCode');
                              }
                            });
                        },
                      },
                    ],
                  );
                } else if (res === 'Unauthorized') {
                  //resetForm();
                  setSubmitting(false);
                  alert('your phone or password are wrong');
                } else if (res.errors) {
                  alert('phone or mdp wrong');
                  //resetForm();
                  setSubmitting(false);
                } else if (res) {
                  //resetForm();
                  setSubmitting(false);
                  NavigationService.navigate('main');
                } else {
                  alert('an error occured! here lala');
                  //resetForm();
                  setSubmitting(false);
                }
              })
              .catch((err) => {
                alert('an error occured! in catch why');
                setSubmitting(false);
              });
          }}>
          {({
            values,
            handleSubmit,
            isSubmitting,
            handleChange,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.formContainer}>
                <AuthInputField
                  value={values.phone}
                  name="phone"
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  iconName="phone"
                  iconColor={touched.phone && errors.phone}
                  handleChange={handleChange('phone')}
                />
                <AuthInputField
                  value={values.password}
                  name="password"
                  placeholder="Password"
                  keyboardType="default"
                  password
                  iconName="lock"
                  iconColor={touched.password && errors.password}
                  handleChange={handleChange('password')}
                />
              </View>
              <View style={styles.Wrapper}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      rememberMe: !this.state.rememberMe,
                    });
                  }}
                  style={styles.rememberWrapper}>
                  <IconMat
                    name={
                      this.state.rememberMe
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    size={17}
                    color={Colors.$textInputTextGray}
                    style={{fontWeight: 'bold'}}
                  />

                  <Text style={styles.rememberText}> Remember me </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.fogotText}> Forgot Password? </Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.Wrapper, {marginTop: 20}]}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.saveIsDriver(!this.props.isDriver);
                    // this.setState({
                    //   isDriver: !this.state.isDriver,
                    // });
                  }}
                  style={styles.rememberWrapper}>
                  <IconMat
                    name={
                      this.props.isDriver
                        ? 'checkbox-marked-outline'
                        : 'checkbox-blank-outline'
                    }
                    size={17}
                    color={Colors.$textInputTextGray}
                    style={{fontWeight: 'bold'}}
                  />

                  <Text style={styles.rememberText}>are you a driver ?</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                  style={styles.button}>
                  <Text style={styles.buttonText}>log in</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>

        <View
          style={[
            styles.footer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={{flexDirection: 'row', paddingVertical: 5}}>
            <Text style={styles.footerText}>D'ont have an account </Text>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('signUp')}>
              <Text style={styles.footerTextSignUp}> sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 140,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  welcome: {
    fontSize: 27,
    fontWeight: '900',
    color: Colors.$gray,
  },
  tkram: {
    fontSize: 27,
    fontWeight: 'bold',
    color: Colors.$primaryBlue,
    textTransform: 'uppercase',
  },
  formContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 50,
  },
  Wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '65%',
    justifyContent: 'space-between',
  },
  rememberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rememberText: {
    fontSize: 13,
    color: Colors.$authSecTextGray,
    marginLeft: 7,
  },
  fogotText: {
    fontSize: 13,
    color: Colors.$authSecTextGray,
    marginLeft: 7,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    width: '68%',
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 7,
    textTransform: 'capitalize',
  },
  footer: {
    position: 'absolute',
    width,
    bottom: 0,
    backgroundColor: Colors.$primaryBlue,
    //height:50
  },
  footerText: {
    fontSize: 15,
    color: Colors.$white,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  footerTextSignUp: {
    fontSize: 15,
    color: Colors.$orange,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textTransform: 'capitalize',
  },
});

const mapStateToProps = ({userReducer, changeDrawer}) => {
  //console.log(userReducer);
  return {
    phone: userReducer.phone,
    isDriver: changeDrawer.isDriver,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserToken: (token) => dispatch(saveToken(token)),
    saveIsDriver: (is) => dispatch(saveIsDriver(is)),
  };
};

//export { SignInScreen };
export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
