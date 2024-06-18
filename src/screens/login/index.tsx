import {Image, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {palette} from '../../styles/pallete';
import {useState} from 'react';
import TextInputField from '../../components/inputs/TextInput';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import {Page} from '../../constants/Page';
import showAlert, {DANGER, SUCCESS, WARNING} from '../../commons/showAlert';
import {LogoAnimated} from '../../components/icons/Logo';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const animateDuration = 2000; // a minute

  function goToRegisterAccount() {
    navigation.navigate(Page.Register);
  }

  async function login() {
    if (email && password) {
      try {
        await auth().signInWithEmailAndPassword(email, password);

        showAlert(SUCCESS, 'Login has been succesfully');
        setTimeout(() => {
          navigation.navigate(Page.Home);
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
      <Image
        style={styles.background}
        source={require('../../assets/backgrounds/background-orange.png')}
      />

      <View style={styles.lights}>
        <Animated.Image
          style={styles.light}
          source={require('../../assets/utils/light.png')}
          entering={FadeInUp.delay(200).duration(400).springify()}
        />
        <Animated.Image
          style={styles.light}
          source={require('../../assets/utils/light.png')}
          entering={FadeInUp.delay(400).duration(400).springify()}
        />
      </View>

      {/* HEADER */}
      <View style={styles.head}>
        <LogoAnimated
          URL={require('../../assets/icons/traver-black.png')}
          entering={FadeInUp.duration(animateDuration).springify()}
        />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        <Animated.View
          entering={FadeInDown.duration(animateDuration).springify()}
          style={styles.formInputs}>
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
        </Animated.View>
        <Animated.View
          entering={FadeInDown.delay(200).duration(animateDuration).springify()}
          style={styles.forgotPasswordView}>
          <Text style={styles.forgotPassword}>Forgot password</Text>
        </Animated.View>
      </View>

      {/* BUTTONS */}
      <Animated.View
        entering={FadeInDown.delay(400).duration(animateDuration).springify()}
        style={styles.btnContainer}>
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
        <Animated.View
          entering={FadeInDown.delay(600).duration(animateDuration).springify()}
          style={styles.socialMediaContainer}>
          <Text>Or create account using social media</Text>
          <View style={styles.socialMedia}>
            <Image
              style={styles.socialMediaIcon}
              source={require('../../assets/icons/Facebook.png')}
            />
            <Image
              style={styles.socialMediaIcon}
              source={require('../../assets/icons/Twitter.png')}
            />
            <Image
              style={styles.socialMediaIcon}
              source={require('../../assets/icons/Google.png')}
            />
          </View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  background: {
    position: 'absolute',
    width: 400,
    height: 680,
  },
  lights: {
    width: 400,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
  },
  light: {
    width: 65,
    height: 160,
  },
  head: {
    height: 260,
    marginTop: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: 20,
  },
  formInputs: {
    gap: 20,
  },
  forgotPasswordView: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  forgotPassword: {
    color: palette.grey,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 20,
    marginTop: 40,
  },
  button: {
    backgroundColor: palette.white,
    borderColor: palette.grey,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    padding: 14,
  },
  socialMediaContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  socialMedia: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 28,
    marginVertical: 20,
  },
  socialMediaIcon: {
    width: 55,
    height: 55,
  },
});

export default LoginScreen;
