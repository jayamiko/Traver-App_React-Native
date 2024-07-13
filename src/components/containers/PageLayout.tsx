import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {palette} from '../../styles/pallete';

type Props = {
  children: ReactNode;
};

function PageLayout(props: Props) {
  return <View style={styles.container}>{props.children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    display: 'flex',
    height: '100%',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
});

export default PageLayout;
