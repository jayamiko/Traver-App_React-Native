import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

function ButtonNotification({navigation}: any) {
  return (
    <TouchableOpacity>
      <View style={[styles.ping]}></View>
      <Image source={require('../../assets/utils/notification.png')} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  ping: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: 'red',
    alignSelf: 'flex-end',
    top: 5,
    right: 3,
  },
});

export default ButtonNotification;
