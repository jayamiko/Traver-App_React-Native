import React from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
} from 'react-native';
import {palette} from '../../styles/pallete';

type Props = {
  type?: KeyboardTypeOptions | undefined;
  placeholder: string;
  value: string;
  setValue: Function;
};

function InputRounded(props: Props) {
  const handleChangeText = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    props.setValue(e.nativeEvent.text);
  };

  return (
    <TextInput
      style={styles.input}
      onChange={handleChangeText}
      value={props.value}
      placeholder={props.placeholder}
      keyboardType={props.type ?? 'default'}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    fontWeight: '500',
    backgroundColor: palette['white-grey'],
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});

export default InputRounded;
