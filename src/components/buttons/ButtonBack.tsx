import React from 'react';
import {Image, TouchableOpacity} from 'react-native';

function ButtonBack({navigation}: any) {
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={require('../../assets/utils/base-arrow.png')} />
    </TouchableOpacity>
  );
}

export default ButtonBack;
