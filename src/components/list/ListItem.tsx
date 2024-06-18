import {View, useWindowDimensions, StyleSheet} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {palette} from '../../styles/pallete';
import PaginationElement from '../paginations/PaginationElement';
import ButtonAnimated from '../buttons/ButtonAnimated';
import {OnboardProps, onboards} from '../../constants/onboards';
import LinearGradient from 'react-native-linear-gradient';
import {LogoAnimated} from '../icons/Logo';

type Props = {
  navigation: any;
  item: OnboardProps;
  index: number;
  x: Animated.SharedValue<number>;
  flatListRef: any;
  refIndex: SharedValue<number>;
};

const ListItem = ({
  navigation,
  item,
  index,
  x,
  flatListRef,
  refIndex,
}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();
  const rnImageStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100, 100],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      width: '100%',
      height: '100%',
      transform: [{translateY}],
    };
  }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  }, [index, x]);
  return (
    <View style={[styles.container, {width: SCREEN_WIDTH}]}>
      <Animated.Image
        source={item.image}
        style={rnImageStyle}
        resizeMode="cover"
      />
      <LinearGradient
        colors={[palette.transparent, palette.transparent, '#191919']}
        style={styles.gradientView}>
        <View style={styles.bottomContainer}>
          <LogoAnimated URL={require('../../assets/icons/traver-white.png')} />
          <Animated.Text style={[styles.title, rnTextStyle]}>
            {item.title}
          </Animated.Text>
          <Animated.Text style={[styles.summary, rnTextStyle]}>
            {item.summary}
          </Animated.Text>
          <PaginationElement length={onboards.length} x={x} />
          <ButtonAnimated
            navigation={navigation}
            item={item}
            currentIndex={refIndex}
            length={onboards.length}
            flatListRef={flatListRef}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  gradientView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  title: {
    width: '100%',
    color: palette.white,
    fontWeight: '600',
    lineHeight: 48,
    fontSize: 48,
  },
  summary: {
    width: '100%',
    color: palette.white,
    textTransform: 'lowercase',
    fontWeight: '500',
    fontSize: 16,
  },
  bottomContainer: {
    width: '100%',
    height: 450,
    gap: 40,
    paddingHorizontal: 32,
  },
});
