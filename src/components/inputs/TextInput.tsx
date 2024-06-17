import React from 'react';
import {TextInput} from 'react-native-paper';
import {palette} from '../../styles/pallete';

type Props = {
  label: string;
  mode: 'flat' | 'outlined';
  secureText: boolean;
  state: string;
  setState: Function;
};

function TextInputField(props: Props) {
  return (
    <TextInput
      label={props.label}
      mode={props.mode}
      secureTextEntry={props.secureText}
      outlineColor={palette.grey}
      activeOutlineColor={palette.orange}
      textColor={palette.black}
      value={props.state}
      onChangeText={value => props.setState(value)}
    />
  );
}

export default TextInputField;
