import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {CategoryProps} from '../../data/categories';
import ImageComponent from '../icons/ImageComponent';
import {palette} from '../../styles/pallete';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HeartVector, PlaceVector, StarVector} from '../icons/Vectors';
import RatingList from '../list/RatingList';

type Props = {
  item: CategoryProps;
};

function PackageCard(props: Props) {
  const id = props.item.category_id;
  const categoryName = props.item.category_name;
  const iconURL = props.item.icon_uri;

  const totalStar = 5;
  const starRating = 4.8;

  return (
    <View key={id} style={styles.card}>
      <View style={styles.container}>
        <ImageComponent
          width={100}
          height={100}
          url={require('../../assets/data/packages/bali_resort.png')}
          source="internal"
          radius={20}
        />
        <View style={styles.frontOfBox}>
          <Text style={styles.packageName}>Kuta Resort</Text>
          <Text style={styles.packagePrice}>$ 245,00</Text>
          <RatingList rate={4.8} color={palette.black} />
          <Text style={styles.description}>
            A resort is a place used for vacation, relaxation or as a day...
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 175,
    marginBottom: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: palette.grey,
    borderRadius: 30,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frontOfBox: {
    width: '100%',
    height: '100%',
    padding: 10,
  },
  packageName: {
    color: palette.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  packagePrice: {
    color: 'red',
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
  },
  description: {
    width: 200,
    color: palette.grey,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
  },
});

export default PackageCard;
