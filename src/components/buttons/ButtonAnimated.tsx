import {Pressable, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {palette} from '../../styles/pallete';
import {OnboardProps} from '../../constants/onboards';
import {Page} from '../../constants/Page';

type Props = {
  navigation: any;
  item: OnboardProps;
  currentIndex: Animated.SharedValue<number>;
  length: number;
  flatListRef: any;
};
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ButtonAnimated = ({
  navigation,
  item,
  currentIndex,
  length,
  flatListRef,
}: Props) => {
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width: withSpring('100%'),
      height: 60,
    };
  }, [currentIndex, length]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1),
      transform: [
        {
          translateX: withTiming(0),
        },
      ],
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      navigation.navigate(Page.Login);
      return;
    }
    flatListRef?.current?.scrollToIndex({
      index: currentIndex.value + 1,
    });
  }, []);
  return (
    <AnimatedPressable style={[styles.button, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textButton, rnTextStyle]}>
        {item.textButton}
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default ButtonAnimated;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: palette.orange,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textButton: {
    color: palette.black,
    textTransform: 'capitalize',
    position: 'absolute',
    fontWeight: '600',
    fontSize: 18,
  },
  imageStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
  },
});
