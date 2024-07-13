import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {palette} from '../../../styles/pallete';
import {CategoryProps} from '../../../data/categories';

type Props = {
  item: CategoryProps;
};

function CategoryTag(props: Props) {
  const id = props.item.category_id;
  const categoryName = props.item.category_name;
  const iconURL = props.item.icon_uri;
  return (
    <View style={[styles.categoryBox, id !== 1 && styles.marginHorizontal]}>
      <View style={styles.iconBox}>
        <Image source={iconURL} alt={categoryName} style={styles.icon} />
      </View>
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    padding: 10,
    borderWidth: 2,
    borderColor: palette['white-grey'],
    borderRadius: 10,
  },
  iconBox: {
    width: 50,
    height: 50,
    backgroundColor: palette['white-grey'],
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    marginLeft: 10,
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
  },
  icon: {
    width: '90%',
    height: '90%',
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
});

export default CategoryTag;
