import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {palette} from '../../styles/pallete';
import TextInputField from '../../components/inputs/TextInput';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import auth from '@react-native-firebase/auth';
import {Page} from '../../constants/Page';
import showAlert, {DANGER, SUCCESS, WARNING} from '../../commons/showAlert';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import Logo from '../../components/icons/Logo';

const RegisterScreen = ({navigation}: any) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

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
      <View style={styles.head}>
        <Logo URL={require('../../assets/icons/traver-black.png')} />
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
      </View>
      <View style={styles.btnContainer}>
        <ButtonOpacity
          label="Submit"
          color={palette.orange}
          borderColor={palette.orange}
          onPress={createAccount}
        />
      </View>

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
  head: {
    height: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: 14,
  },
  field: {
    borderRadius: 24,
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
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
  errorText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'red',
  },
});

export default RegisterScreen;
