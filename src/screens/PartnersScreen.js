import React from 'react';
import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../components/Header';

const {height, width} = Dimensions.get('window');

const PartnersScreen = () => {
  return (
    <View style={{flex: 1, width, backgroundColor: Colors.$white}}>
      <Header
        title="Soufi"
        leftIcon={
          <Icon name="angle-left" size={25} color={Colors.$primaryBlue} />
        }
        //rightIcon={<Icon name="star" size={22} color={Colors.$starOrange} />}
      />
      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/soufi.png')}
            style={styles.img}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.partnerDescription}>
          orem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
          nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
        </Text>
      </View>
      <View style={{alignItems: 'center', marginTop: 40}}>
        <Icon
          style={{fontWeight: 'bold'}}
          name="whatsapp"
          size={27}
          color={Colors.$whatapp}
        />
        <Text style={styles.text}>+961 71 888 888</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Icon
            style={{marginHorizontal: 5}}
            name="facebook-square"
            size={27}
            color={Colors.$facebook}
          />
          <Icon
            style={{marginHorizontal: 5}}
            name="instagram"
            size={27}
            color={Colors.$instagram}
          />
        </View>
        <Text style={styles.text}> soufi print - مطبعة الصوفي</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    padding: 5,
    borderRadius: 100,
    borderColor: Colors.$lightOrange,
    borderWidth: 0.3,
    width: width / 2 + 10,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  img: {
    width: width / 2,
    height: width / 2,
    borderRadius: 100,
  },
  partnerDescription: {
    fontSize: 14,
    color: Colors.$gray,
    textAlign: 'center',
  },
  descriptionContainer: {
    margin: 20,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.$destinationBlack,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default PartnersScreen;
export {PartnersScreen};
