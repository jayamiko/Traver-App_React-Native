import React, {ReactNode} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {palette} from '../../styles/pallete';

type Props = {
  children: ReactNode;
};

function PageLayout(props: Props) {
  return (
    <View style={styles.container}>
      <ScrollView>{props.children}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.white,
    display: 'flex',
    height: '100%',
    paddingTop: 60,
  },
});

export default PageLayout;
