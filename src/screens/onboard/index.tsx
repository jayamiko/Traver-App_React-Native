import {useCallback} from 'react';
import {ImageURISource, ViewToken} from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import ListItem from '../../components/list/ListItem';
import {OnboardProps, onboards} from '../../constants/onboards';

function OnboardScreen({navigation}: any) {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      text: string;
      image: ImageURISource;
    }>
  >();

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      flatListIndex.value = viewableItems[0].index ?? 0;
    },
    [],
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({item, index}: {item: OnboardProps; index: number}) => {
      return (
        <ListItem
          navigation={navigation}
          item={item}
          index={index}
          x={x}
          flatListRef={flatListRef}
          refIndex={flatListIndex}
        />
      );
    },
    [x],
  );
  return (
    <Animated.FlatList
      ref={flatListRef}
      onScroll={scrollHandle}
      horizontal
      scrollEventThrottle={16}
      pagingEnabled={true}
      data={onboards}
      keyExtractor={(_, index) => index.toString()}
      bounces={false}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={true}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
}

export default OnboardScreen;
