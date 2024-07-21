import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  active?: boolean;
  fontSize: number;
  fontColor: string;
};

// ANT DESIGN
export function HeartVector(props: Props) {
  return (
    <AntDesign
      name={props.active ? 'heart' : 'hearto'}
      style={{fontSize: props.fontSize, color: props.fontColor}}
    />
  );
}

export function StarVector(props: Props) {
  return (
    <AntDesign
      name="star"
      style={{fontSize: props.fontSize, color: props.fontColor}}
    />
  );
}

// MATERIAL ICONS
export function PlaceVector(props: Props) {
  return (
    <MaterialIcons
      name="place"
      style={{fontSize: props.fontSize, color: props.fontColor}}
    />
  );
}
