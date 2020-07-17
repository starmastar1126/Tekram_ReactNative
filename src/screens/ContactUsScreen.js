import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../constants/Colors';
import Header from '../components/Header';
import IconF from 'react-native-vector-icons/Feather';
import IconE from 'react-native-vector-icons/EvilIcons';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {driverApi} from '../api';

const {height, width} = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'name must be more than 3')
    .max(30, 'maximum name is 30')
    .required(),
  email: Yup.string().email().required(),
  message: Yup.string()
    .min(15, 'message must be more than 3')
    .max(300, 'maximum name is 30')
    .required(),
});

const Field = ({name, multiple, value, onchange}) => (
  <View>
    <Text style={styles.formText}>{name}</Text>
    {multiple ? (
      <View
        style={[
          styles.formInput,
          {
            borderRadius: 20,
            //height: "45%"
          },
        ]}>
        <TextInput
          style={{
            height: 140,
            width: '100%',
            justifyContent: 'flex-start',
            textAlignVertical: 'top',
          }}
          multiline
          numberOfLines={8}
          placeholder="type something"
          maxLength={400}
          value={value}
          onChangeText={onchange}
          name={name}
        />
      </View>
    ) : (
      <TextInput
        maxLength={100}
        value={value}
        name={name}
        onChangeText={onchange}
        style={styles.formInput}
      />
    )}
  </View>
);

export default class ContactUsScreen extends Component {
  state = {
    loading: false,
  };

  onTextChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
        //keyboardVerticalOffset={500}
      >
        <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
          <ScrollView style={{flex: 1, height: '100%'}}>
            <Header
              title="contact us"
              leftIcon={
                <Icon name="menu" size={25} color={Colors.$primaryBlue} />
              }
              drawer
              //rightIcon={<Icon name="star" size={22} color={Colors.$starOrange} />}
            />
            <View style={styles.contactContainer}>
              <TouchableOpacity>
                <View style={styles.whatappBtn}>
                  <Icon name="whatsapp" size={35} color={Colors.$white} />
                  <View style={{marginLeft: 5}}>
                    <Text style={styles.wASubText}>
                      click here to contact us directly on
                    </Text>
                    <Text style={styles.wAText}>whatsApp</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <View style={styles.textcontainer}>
                <IconF name="map-pin" size={16} color={Colors.$white} />
                <Text style={styles.text}>tripoli-lebanon</Text>
              </View>
              <View style={styles.textcontainer}>
                <IconE name="envelope" size={25} color={Colors.$white} />
                <Text style={styles.text}>Trkram.lb@gmail.com</Text>
              </View>
            </View>
            <View style={styles.separator} />
            <View style={styles.formContainer}>
              <Text style={styles.formTitle}>
                Please contact us using the form below
              </Text>
              <Formik
                initialValues={{name: '', email: '', message: ''}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                  this.setState({loading: true});
                  setSubmitting(true);
                  driverApi
                    .sendContactUsMessage(values)
                    .then((res) => {
                      console.log(res);
                      if (res.status) {
                        alert(res.message);
                      } else alert('error try again later');
                      setSubmitting(false);
                      resetForm();
                      this.setState({loading: false});
                    })
                    .catch((err) => {
                      console.log(err.response);
                      alert('error try again later');
                      setSubmitting(false);
                      resetForm();
                      this.setState({loading: false});
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
                    <Field
                      name="name"
                      value={values.name}
                      onchange={handleChange('name')}
                    />
                    <Field
                      name="email"
                      value={values.email}
                      onchange={handleChange('email')}
                    />
                    <Field
                      name="message"
                      multiple
                      value={values.message}
                      onchange={handleChange('message')}
                    />
                    <View
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        style={styles.button}
                        disabled={this.state.loading}
                        onPress={handleSubmit}>
                        {this.state.loading ? (
                          <View style={{paddingVertical: 7}}>
                            <ActivityIndicator
                              size="small"
                              color={Colors.$white}
                            />
                          </View>
                        ) : (
                          <Text style={styles.buttonText}>submit</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  contactContainer: {
    backgroundColor: Colors.$primaryBlue,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  whatappBtn: {
    backgroundColor: Colors.$whatappBG,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 15,
  },
  wAText: {
    fontSize: 18,
    color: Colors.$white,
    fontWeight: 'bold',
  },
  wASubText: {
    fontSize: 8,
    color: Colors.$white,
    marginBottom: -5,
  },
  text: {
    fontSize: 15,
    color: Colors.$white,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    paddingLeft: 5,
    borderLeftColor: Colors.$lightOrange,
    borderLeftWidth: 1.2,
    marginLeft: 5,
    marginBottom: 10,
  },
  textcontainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  separator: {
    width,
    height: 4,
    borderBottomColor: Colors.$borderHeader,
    borderBottomWidth: 1,
  },
  formContainer: {
    margin: 25,
  },
  formTitle: {
    color: Colors.$lightOrange,
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 15,
    marginBottom: 20,
  },
  formText: {
    color: Colors.$gray,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'capitalize',
    marginLeft: 15,
    marginBottom: 4,
  },
  formInput: {
    backgroundColor: Colors.$textInputGray,
    borderColor: Colors.$borderGray,
    borderWidth: 1.5,
    borderRadius: 50,
    marginBottom: 15,
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    paddingHorizontal: 25,
    width: '80%',
    marginTop: 10,
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 25,
    paddingVertical: 7,
    textTransform: 'capitalize',
    //width: "100%"
  },
});

export {ContactUsScreen};
