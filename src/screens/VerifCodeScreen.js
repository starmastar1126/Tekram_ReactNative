import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {authApi} from '../api';
import NavigationService from '../navigation/routes/NavigationService';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');
const CELL_COUNT = 6;

const VerifCodeScreen = (myprops) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <View
      style={{
        flex: 1,
        width,
        backgroundColor: Colors.$white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View style={{marginTop: -70}}>
        <Text style={styles.title}>Verification code</Text>
      </View>
      <View style={styles.root}>
        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          renderCell={({index, symbol, isFocused}) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <View
        style={{
          marginTop: 20,
          flexDirection: 'column',
          width: '65%',
        }}>
        <View>
          <Text style={{color: Colors.$gray}}>
            it might take a minute to receive the code.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            resendCode(myprops.phone);
          }}>
          <Text style={{color: Colors.$primaryBlue}}>resend code ?</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
          //marginTop: 100
        }}>
        <TouchableOpacity
          onPress={() => verify(myprops.phone, value)}
          disabled={!(value.length === CELL_COUNT)}>
          <View
            style={[
              styles.button,
              !(value.length === CELL_COUNT) ? {opacity: 0.4} : null,
            ]}>
            <Text style={styles.buttonText}>verify now</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const resendCode = (phone) => {
  authApi.reSendPasswordSms(phone, 'signup');
  alert('wait');
};

const verify = (phone, verification) => {
  // store token
  //let result = authApi.verifySms(phone, verification);
  let result = authApi.verifySms('+33758099722', verification);
  result
    .then((res) => {
      authApi.StoreToken({
        access_token: 'it me token',
        expires_at: 'date expiration',
      });
      NavigationService.navigate('main');
    })
    .catch((err) => {
      alert('error in the verification please try again');
    });
};

const styles = StyleSheet.create({
  root: {
    width: '65%',
    height: 50,
    backgroundColor: Colors.$textInputGray,
    borderWidth: 1.5,
    borderColor: Colors.$borderGray,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    color: Colors.$gray,
    marginBottom: 10,
  },
  codeFiledRoot: {marginBottom: 10, marginLeft: 10},
  cell: {
    width: 20,
    height: 40,
    lineHeight: 38,
    fontSize: 20,
    borderBottomWidth: 1.5,
    //borderWidth: 1.5,
    borderColor: Colors.$borderGray,
    textAlign: 'center',
    marginRight: 10,
    color: Colors.$gray,
  },
  focusCell: {
    borderColor: Colors.$primaryBlue,
  },
  button: {
    backgroundColor: Colors.$primaryBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
    paddingHorizontal: 25,
    width: '50%',
  },
  buttonText: {
    color: Colors.$white,
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 7,
    textTransform: 'capitalize',
  },
});

const mapStateToProps = ({userReducer}) => {
  console.log(userReducer);
  return {
    phone: userReducer.phone,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveUserPhone: (phone) => dispatch(savePhone(phone)),
  };
};
//export { VerifCodeScreen };
export default connect(mapStateToProps, mapDispatchToProps)(VerifCodeScreen);
