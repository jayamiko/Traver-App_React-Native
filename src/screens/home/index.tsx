import React, {useState, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Page} from '../../constants/Page';
import PageLayout from '../../components/containers/PageLayout';
import ImageComponent from '../../components/icons/ImageComponent';
import ButtonNotification from '../../components/buttons/ButtonNotification';
import InputRounded from '../../components/inputs/InputRounded';
import {palette} from '../../styles/pallete';
import categories from '../../data/categories';
import CategoryTag from '../../components/utils/tags/CategoryTag';
import PlaceCard from '../../components/cards/PlaceCard';
import PackageCard from '../../components/cards/PackageCard';

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
      <View style={[styles.header, styles.marginHz]}>
        <View style={styles.userProfile}>
          <ImageComponent
            width={40}
            height={40}
            url={user.photoURL}
            source="external"
            radius={50}
          />
          <Text style={styles.userName}>Hello, {user.displayName}!</Text>
        </View>
        <View>
          <ButtonNotification />
        </View>
      </View>

      <View style={styles.marginHz}>
        <Text style={styles.caption}>Where do you want to explore today?</Text>

        <InputRounded
          placeholder="Search destination"
          value={query}
          setValue={setQuery}
        />
      </View>

      <View style={[styles.section, styles.marginHz]}>
        <View style={styles.headSection}>
          <Text style={styles.titleSection}>Choose Category</Text>
          <Text style={styles.moreContent}>See All</Text>
        </View>
        <FlatList
          horizontal={true}
          data={categories}
          renderItem={({item}) => (
            <CategoryTag key={item.category_id} item={item} />
          )}
          keyExtractor={(item: any) => item.category_id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={styles.section}>
        <View style={[styles.headSection, styles.marginHz]}>
          <Text style={styles.titleSection}>Favorite Place</Text>
          <Text style={styles.moreContent}>Explore</Text>
        </View>
        <FlatList
          style={{marginLeft: 20}}
          horizontal={true}
          data={categories}
          renderItem={({item}) => (
            <PlaceCard key={item.category_id} item={item} />
          )}
          keyExtractor={(item: any) => item.category_id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={[styles.section, styles.marginHz]}>
        <View style={styles.headSection}>
          <Text style={styles.titleSection}>Populer Package</Text>
          <Text style={styles.moreContent}>See All</Text>
        </View>
        <FlatList
          data={categories}
          renderItem={({item}) => (
            <PackageCard key={item.category_id} item={item} />
          )}
          keyExtractor={(item: any) => item.category_id}
        />
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
  section: {
    marginVertical: 24,
  },
  headSection: {
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleSection: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreContent: {
    color: palette.grey,
  },
  marginHz: {
    marginHorizontal: 20,
  },
});

export default HomeScreen;
