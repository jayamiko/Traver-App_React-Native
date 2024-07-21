import React from 'react';
import {Image, ImageSourcePropType} from 'react-native';

type Props = {
  width: number;
  height: number;
  url: any;
  source: 'internal' | 'external';
  radius?: number;
};

type ExtSourceProps = {
  uri: string;
};

export const SourceType = {
  Internal: 'internal',
  External: 'external',
};

function ImageComponent(props: Props) {
  const src = props.source;
  const url = props.url;

  const externalSource: ExtSourceProps = {
    uri: url,
  };

  return (
    <Image
      width={props.width}
      height={props.height}
      style={{
        borderRadius: props.radius,
      }}
      source={src === SourceType.External ? externalSource : url}
    />
  );
}

export default ImageComponent;
