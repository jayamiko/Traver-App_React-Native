import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {palette} from '../../styles/pallete';

type Props = {
  label: string;
  color: string;
  borderColor: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
};

function ButtonOpacity(props: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {backgroundColor: props.color, borderColor: props.borderColor},
      ]}
      onPress={props.onPress}
      disabled={props.disabled}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    padding: 14,
  },
  label: {
    fontWeight: 'bold',
    color: palette.black,
    textTransform: 'capitalize',
  },
});

export default ButtonOpacity;
