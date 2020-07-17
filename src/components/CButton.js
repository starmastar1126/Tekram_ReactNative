import React from 'react';
import { TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import CView from './CView';


// Custom button

const CButton = (props) => {
  var defaultStyle = {
    flexDirection: 'row',
    width: '100%',
    height: 46,
    backgroundColor: Colors.$primaryBlue,
    borderRadius: 34,
    borderColor: Colors.$primaryBlue,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent:  'center',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: .4,
    shadowRadius: 1,
    elevation: 2,
  };
  var iconStyle = {
    height: 22,
    width: 22,
    marginHorizontal: 7,
  };

  var style = props.style && props.style.length? props.style.reduce(function(s0, s){ return {...s0, ...s}}) : props.style;
  style = {...defaultStyle, ...style};

  var textStyle = {
    color: style.color || '#000000',
    fontSize: style.fontSize || 14,
    ...(style.fontWeight= 600)
    //...(style.fontWeight? styles['fontWeight'+style.fontWeight] : styles.fontWeight600),
    //marginHorizontal: 7
  };

  var loaderStyle = {

  };

  return (
    <TouchableOpacity {...props} style={style} activeOpacity={.9} ref={props.cref} disabled={props.loading}>
      <CView if={!props.loading} style={{flexDirection: 'row'}}>
        <CView if={!!props.iconLeft}>
          <Image style={iconStyle} source={props.iconLeft} resizeMode='contain' />
        </CView>
        <Text style={textStyle}>{props.title}</Text>
        <CView if={!!props.iconRight}>
          <Image style={iconStyle} source={props.iconRight} resizeMode='contain' />
        </CView>
      </CView>
      <CView if={props.loading}>
        <ActivityIndicator style={loaderStyle} size='large' color={'#FFF'} animating={true}/>
      </CView>
    </TouchableOpacity>
  );
}

export default CButton