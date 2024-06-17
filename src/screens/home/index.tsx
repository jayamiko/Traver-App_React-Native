import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Page} from '../../constants/Page';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import {palette} from '../../styles/pallete';

function HomeScreen({navigation}: any) {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>();

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
    <View>
      <Text>Welcome {user?.email}</Text>
      <ButtonOpacity
        label="Log Out"
        color={palette.orange}
        borderColor={palette.orange}
        onPress={logOut}
      />
    </View>
  );
}

export default HomeScreen;
