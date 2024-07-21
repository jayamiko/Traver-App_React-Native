import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {StarVector} from '../icons/Vectors';
import {palette} from '../../styles/pallete';

type Props = {
  rate: number;
  color: string;
};

function RatingList(props: Props) {
  const totalStar = 5;
  return (
    <View style={styles.placeRate}>
      {Array(totalStar)
        .fill(totalStar)
        .map((star, i) => {
          const no = i + 1;
          const starFloor = Math.floor(props.rate);
          return (
            <StarVector
              key={i}
              fontSize={18}
              fontColor={no <= starFloor ? palette.gold : palette['white-grey']}
            />
          );
        })}
      <Text style={[styles.rate, {color: props.color}]}>{props.rate}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  placeRate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
});

export default RatingList;
