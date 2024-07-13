import React from 'react';
import {Image} from 'react-native';

type Props = {
  size: number;
  url: string;
  radius?: number;
};

function ImageComponent(props: Props) {
  return (
    <Image
      width={props.size}
      height={props.size}
      style={{
        borderRadius: props.radius,
      }}
      source={{
        uri: props.url,
      }}
    />
  );
}

export default ImageComponent;
