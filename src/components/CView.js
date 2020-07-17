import React from 'react';
import { View } from 'react-native';

// Conditional view

CView = (props) => {
  return props.if? (<View {...props}>{props.children}</View>) : null;
};

export default CView