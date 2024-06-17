import {Image, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {palette} from '../../styles/pallete';
import {useState} from 'react';
import TextInputField from '../../components/inputs/TextInput';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import {Page} from '../../constants/Page';
import showAlert, {DANGER, SUCCESS, WARNING} from '../../commons/showAlert';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function goToRegisterAccount() {
    navigation.navigate(Page.Register);
  }

  async function login() {
    if (email && password) {
      try {
        await auth().signInWithEmailAndPassword(email, password);

        showAlert(SUCCESS, 'Login has been succesfully');
        setTimeout(() => {
          navigation.navigate(Page.Identity);
        }, 3000);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          const errorMessage = 'That email address is already in use!';
          showAlert(WARNING, errorMessage);
        }

        if (error.code === 'auth/invalid-email') {
          const errorMessage = 'That email address is invalid!';
          showAlert(DANGER, errorMessage);
        }

        console.error(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <Image source={require('../../assets/icons/traver-icon.png')} />
      </View>
      <View style={styles.form}>
        <TextInputField
          type="email-address"
          label="Email"
          mode="outlined"
          secureText={false}
          state={email.toLocaleLowerCase()}
          setState={setEmail}
        />
        <TextInputField
          label="Password"
          mode="outlined"
          secureText={true}
          state={password}
          setState={setPassword}
        />
      </View>
      <View style={styles.btnContainer}>
        <ButtonOpacity
          label="Create Account"
          color={palette.white}
          borderColor={palette.grey}
          onPress={goToRegisterAccount}
        />
        <ButtonOpacity
          label="Sign In"
          color={palette.orange}
          borderColor={palette.orange}
          onPress={login}
          disabled={!email || !password ? true : false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    paddingHorizontal: 20,
  },
  head: {
    height: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: 20,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 20,
  },
  button: {
    backgroundColor: palette.white,
    borderColor: palette.grey,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    padding: 14,
  },
});

export default LoginScreen;
