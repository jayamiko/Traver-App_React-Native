import React from 'react';
import {TextInput} from 'react-native-paper';
import {palette} from '../../styles/pallete';
import {KeyboardTypeOptions} from 'react-native';

type Props = {
  type?: KeyboardTypeOptions | undefined;
  label: string;
  mode: 'flat' | 'outlined';
  secureText?: boolean;
  state: string;
  setState: Function;
};

function TextInputField(props: Props) {
  function generateValue(value: string) {
    if (props.type == 'numeric') {
      return value.replace(/[^0-9]/g, '');
    }

    if (props.label == 'Full Name') {
      return value.replace(/[0-9]/g, '');
    }

    return value;
  }

  return (
    <TextInput
      keyboardType={props.type}
      label={props.label}
      mode={props.mode}
      secureTextEntry={props.secureText}
      outlineColor={palette.grey}
      activeOutlineColor={palette.orange}
      textColor={palette.black}
      value={props.state}
      onChangeText={value => props.setState(generateValue(value))}
    />
  );
}

export default TextInputField;
