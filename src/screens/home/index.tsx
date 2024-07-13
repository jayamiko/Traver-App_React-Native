import React, {useState, useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Page} from '../../constants/Page';
import PageLayout from '../../components/containers/PageLayout';
import ImageComponent from '../../components/icons/ImageComponent';
import ButtonNotification from '../../components/buttons/ButtonNotification';
import InputRounded from '../../components/inputs/InputRounded';
import {palette} from '../../styles/pallete';
import categories from '../../data/categories';
import CategoryTag from '../../components/utils/tags/CategoryTag';

function HomeScreen({navigation}: any) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

  const [query, setQuery] = useState<string>('');

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  function toLoginScreen() {
    navigation.navigate(Page.Login);
  }

  function logOut() {
    auth()
      .signOut()
      .then(() => {
        toLoginScreen();
      });
  }

  if (!user) {
    toLoginScreen();
  }

  return (
    <PageLayout>
      <View style={styles.header}>
        <View style={styles.userProfile}>
          <ImageComponent size={40} url={user.photoURL} radius={50} />
          <Text style={styles.userName}>Hello, {user.displayName}!</Text>
        </View>
        <View>
          <ButtonNotification />
        </View>
      </View>

      <Text style={styles.caption}>Where do you want to explore today?</Text>

      <InputRounded
        placeholder="Search destination"
        value={query}
        setValue={setQuery}
      />

      <View style={styles.category}>
        <View style={styles.categoryText}>
          <Text style={styles.chooseCategory}>Choose Category</Text>
          <Text style={styles.seeAll}>See All</Text>
        </View>
        <View>
          <ScrollView horizontal style={styles.categoryScroll}>
            <FlatList
              horizontal={true}
              data={categories}
              renderItem={({item}) => (
                <CategoryTag key={item.category_id} item={item} />
              )}
              keyExtractor={(item: any) => item.category_id}
            />
          </ScrollView>
        </View>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userProfile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 16,
  },
  caption: {
    marginVertical: 24,
    fontSize: 28,
    fontWeight: 'bold',
  },
  category: {
    marginVertical: 24,
  },
  categoryText: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chooseCategory: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAll: {
    color: palette.grey,
  },
  categoryScroll: {
    width: '100%',
  },
});

export default HomeScreen;
