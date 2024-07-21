import React from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {CategoryProps} from '../../data/categories';
import ImageComponent from '../icons/ImageComponent';
import {palette} from '../../styles/pallete';
import {HeartVector, PlaceVector, StarVector} from '../icons/Vectors';
import RatingList from '../list/RatingList';

type Props = {
  item: CategoryProps;
};

function PlaceCard(props: Props) {
  const id = props.item.category_id;
  const categoryName = props.item.category_name;
  const iconURL = props.item.icon_uri;

  const totalStar = 5;
  const starRating = 4.8;

  return (
    <View key={id} style={[styles.card, id !== 1 && styles.marginHorizontal]}>
      <View style={styles.container}>
        <ImageComponent
          width={200}
          height={250}
          url={require('../../assets/data/places/bali.png')}
          source="internal"
          radius={20}
        />
        <View style={styles.containerCard}>
          <View style={styles.favorite}>
            <HeartVector active={true} fontSize={20} fontColor="red" />
          </View>
          <View style={styles.frontOfBox}>
            <Text style={styles.placeName}>Kuta Beach</Text>
            <View style={styles.region}>
              <PlaceVector fontSize={18} fontColor={palette.white} />
              <Text style={styles.description}>Bali, Indonesia</Text>
            </View>
            <RatingList rate={4.8} color={palette.white} />
          </View>
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
    width: 185,
    borderRadius: 10,
  },
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  containerCard: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  favorite: {
    width: 40,
    height: 40,
    backgroundColor: palette.white,
    borderRadius: 50,
    margin: 10,
    alignSelf: 'flex-end',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  frontOfBox: {
    minHeight: 80,
    maxHeight: 120,
    paddingHorizontal: 10,
  },
  placeName: {
    color: palette.white,
    textShadowColor: palette.dark,
    textShadowRadius: 3,
    fontSize: 18,
    fontWeight: 'bold',
  },
  region: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  description: {
    color: palette.white,
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: palette.dark,
    textShadowRadius: 3,
    marginLeft: 4,
  },
  marginHorizontal: {
    marginHorizontal: 10,
  },
});

export default PlaceCard;
