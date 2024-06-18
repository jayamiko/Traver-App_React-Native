import React from 'react';
import {Image, ImageProps} from 'react-native';
import Animated from 'react-native-reanimated';

type Props = {
  URL: ImageProps;
};

function Logo(props: Props) {
  return <Image source={props.URL} />;
}

export function LogoAnimated(props: Props) {
  return <Animated.Image source={props.URL} />;
}

export default Logo;
