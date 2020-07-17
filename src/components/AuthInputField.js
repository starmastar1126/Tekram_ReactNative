import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
//import {Dropdown} from 'react-native-material-dropdown';
//import ModalDropdown from 'react-native-modal-dropdown';
var _menu = null;

const setMenuRef = (ref) => {
  _menu = ref;
};

const hideMenu = () => {
  _menu.hide();
};

const showMenu = () => {
  _menu.show();
};

const AuthInputField = ({
  material,
  placeholder,
  iconName,
  password,
  keyboardType,
  name,
  value,
  handleChange,
  iconColor,
  dropdown,
}) => {
  let data = dropdown
    ? dropdown.map((val) => {
        return (
          <MenuItem
            key={val.name}
            onPress={() => {
              handleChange(val.name);
              hideMenu();
            }}>
            {val.name}
          </MenuItem>
        );
      })
    : null;
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {material ? (
          <IconMat
            size={25}
            name={iconName}
            color={iconColor ? Colors.$redBusy : Colors.$primaryBlue}
          />
        ) : (
          <Icon
            size={25}
            name={iconName}
            color={iconColor ? Colors.$redBusy : Colors.$primaryBlue}
          />
        )}
      </View>
      <View style={styles.textinputContainer}>
        {dropdown ? (
          <Menu
            ref={setMenuRef}
            button={
              <TouchableOpacity onPress={showMenu}>
                <TextInput
                  value={value}
                  name={name}
                  style={styles.textinput}
                  placeholderTextColor={Colors.$textInputTextGray}
                  keyboardType={keyboardType}
                  placeholder={placeholder}
                  secureTextEntry={password}
                  onChangeText={handleChange}
                  editable={false}
                />
              </TouchableOpacity>
            }>
            {data}
          </Menu>
        ) : (
          // <ModalDropdown options={data} />
          // <Dropdown
          //   // renderAccessory={() => (
          //   //   <Icon
          //   //     style={{marginRight: 10}}
          //   //     name="angle-down"
          //   //     size={22}
          //   //     color={Colors.$textInputTextGray}
          //   //   />
          //   // )}
          //   label="dada"
          //   data={data}
          //   // value={value}
          //   // style={{paddingLeft: 15, color: Colors.$textInputTextGray}}
          //   // baseColor={Colors.$textInputTextGray}
          //   // dropdownOffset={{top: 0, left: 0}}
          //   // placeholderTextColor={Colors.$textInputTextGray}
          //   // fontSize={15}
          //   // rippleInsets={{top: 0, bottom: -8}}
          //   // placeholder="city"
          //   // itemColor={Colors.$textInputTextGray}
          //   // selectedItemColor={Colors.$primaryBlue}
          //   // rippleCentered
          //   // //itemTextStyle={{ color: "red" }}
          //   // inputContainerStyle={{
          //   //   height: 50,
          //   //   width: '100%',
          //   //   justifyContent: 'center',
          //   //   borderBottomColor: 'transparent',
          //   // }}
          //   // onChangeText={handleChange}
          //   // propsExtractor={({value, index}) => {
          //   //   return value === 'lastElement' // change value
          //   //     ? {style: {}}
          //   //     : {
          //   //         style: {
          //   //           borderBottomColor: Colors.$textInputGray,
          //   //           borderBottomWidth: 0.6,
          //   //           paddingTop: 5,
          //   //         },
          //   //       };
          //   // }}
          // />
          <TextInput
            value={value}
            name={name}
            style={styles.textinput}
            placeholderTextColor={Colors.$textInputTextGray}
            keyboardType={keyboardType}
            placeholder={placeholder}
            secureTextEntry={password}
            onChangeText={handleChange}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '65%',
    height: 50,
    borderRadius: 50,
    borderWidth: 1.5,
    borderColor: Colors.$borderGray,
    //backgroundColor: "red",
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconContainer: {
    backgroundColor: Colors.$iconsGray,
    justifyContent: 'center',
    alignItems: 'center',
    width: '22%',
    height: '100%',
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  textinput: {
    //backgroundColor: ,
    width: '95%',
    height: '100%',
    fontSize: 15,
    paddingLeft: 15,
    paddingVertical: 15,
    color: Colors.$textInputTextGray,
    //backgroundColor: "red"
  },
  textinputContainer: {
    width: '78%',
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    overflow: 'hidden',
    backgroundColor: Colors.$textInputGray,
    //opacity: 0.1
  },
});

export default AuthInputField;
