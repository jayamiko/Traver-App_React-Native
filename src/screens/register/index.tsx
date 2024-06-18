import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {palette} from '../../styles/pallete';
import TextInputField from '../../components/inputs/TextInput';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import auth from '@react-native-firebase/auth';
import {Page} from '../../constants/Page';
import showAlert, {DANGER, SUCCESS, WARNING} from '../../commons/showAlert';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import Logo, {LogoAnimated} from '../../components/icons/Logo';
import ButtonBack from '../../components/buttons/ButtonBack';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const animateDuration = 200; // two minutes

  const message = {
    emailExist: 'The email address is already in use by another account.',
    emailBadlyFormatted: 'The email address is badly formatted.',
    passwordInvalid: 'The given password is invalid.',
  };

  const ERROR_MESSAGE = {
    EMAIL_EXIST: `[auth/email-already-in-use] ${message.emailExist}`,
    EMAIL_INVALID: `[auth/invalid-email] ${message.emailBadlyFormatted}`,
    PASSWORD_INVALID: `[auth/weak-password] ${message.passwordInvalid}`,
  };

  async function createAccount() {
    if (password === confirmPassword) {
      try {
        const {user} = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        await user.sendEmailVerification();
        showAlert(SUCCESS, 'Create account has been succesfully');
        setTimeout(() => {
          navigation.navigate(Page.Identity);
        }, 3000);
        return true;
      } catch (error: any) {
        const {emailExist, emailBadlyFormatted, passwordInvalid} = message;
        const {EMAIL_EXIST, EMAIL_INVALID, PASSWORD_INVALID} = ERROR_MESSAGE;

        if (error.message === EMAIL_EXIST) {
          showAlert(WARNING, emailExist);
        } else if (error.message === EMAIL_INVALID) {
          showAlert(DANGER, emailBadlyFormatted);
        } else if (error.message === PASSWORD_INVALID) {
          showAlert(DANGER, passwordInvalid);
        }
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
          entering={FadeInUp.delay(200).duration(animateDuration).springify()}
        />
        <Animated.Image
          style={styles.light}
          source={require('../../assets/utils/light.png')}
          entering={FadeInUp.delay(400).duration(animateDuration).springify()}
        />
      </View>

      {/* HEADER */}
      <Animated.View
        entering={FadeInDown.duration(animateDuration).springify()}
        style={styles.head}>
        <View style={styles.buttonBack}>
          <ButtonBack navigation={navigation} />
        </View>
        <View style={styles.header}>
          <LogoAnimated
            entering={FadeInDown.duration(animateDuration).springify()}
            URL={require('../../assets/icons/traver-black.png')}
          />
          <Text style={styles.headerText}>Create Your Account Here</Text>
        </View>
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(200).duration(animateDuration).springify()}
        style={styles.form}>
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
        <TextInputField
          label="Confirm Password"
          mode="outlined"
          secureText={true}
          state={confirmPassword}
          setState={setConfirmPassword}
        />
        {confirmPassword && password !== confirmPassword && (
          <Text style={styles.errorText}>Password is not match</Text>
        )}
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(400).duration(animateDuration).springify()}
        style={styles.btnContainer}>
        <ButtonOpacity
          label="Submit"
          color={palette.orange}
          borderColor={palette.orange}
          onPress={createAccount}
        />
      </Animated.View>

      {/* SOCIAL MEDIA */}
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

      <AlertNotificationRoot>
        <></>
      </AlertNotificationRoot>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
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
    height: 280,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonBack: {
    width: '100%',
    marginTop: 80,
  },
  header: {
    width: '100%',
    height: 150,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: palette.dark,
    marginTop: 24,
  },
  form: {
    gap: 20,
  },
  field: {
    borderRadius: 24,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
    marginBottom: 100,
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
  errorText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
  },
});

export default RegisterScreen;
