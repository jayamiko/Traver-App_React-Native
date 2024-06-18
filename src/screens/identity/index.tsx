import {useState} from 'react';
import {Button, Image, StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {palette} from '../../styles/pallete';
import TextInputField from '../../components/inputs/TextInput';
import ButtonOpacity from '../../components/buttons/ButtonOpacity';
import {Page} from '../../constants/Page';
import showAlert, {DANGER, SUCCESS} from '../../commons/showAlert';
import ButtonBack from '../../components/buttons/ButtonBack';
import {launchImageLibrary} from 'react-native-image-picker';
import sizeInBytes from '../../commons/sizeInBytes';

const IdentityScreen = ({navigation}: any) => {
  const [fullName, setFullName] = useState<string>('');
  const [fileResponse, setFileResponse] = useState<any>([]);

  const user = auth().currentUser;

  function shouldEnableButton() {
    if (fullName && fileResponse) {
      return true;
    }
    return false;
  }

  const options: any = {
    title: 'Select Image',
    type: 'library',
    options: {
      mediaType: 'photo',
      maxWidth: 800,
      maxHeight: 600,
      selectionLimit: 1,
      includeBase64: false,
    },
  };

  const openGallery = async () => {
    await launchImageLibrary(options, (res: any) => {
      setFileResponse(res.assets[0]);
    });
  };

  function cancelPicture() {
    setFileResponse(null);
  }

  async function profileSaved() {
    if (shouldEnableButton()) {
      await user
        ?.updateProfile({
          displayName: fullName,
          photoURL: fileResponse?.uri,
        })
        .then(() => {
          navigation.navigate(Page.Home);
          showAlert(SUCCESS, 'Profile Saved');
        })
        .catch(error => {
          console.log(error);
          showAlert(DANGER, error.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <ButtonBack navigation={navigation} />
      </View>
      <Text style={styles.title}>What's Your Name?</Text>
      <View style={styles.form}>
        <TextInputField
          label="Full Name"
          mode="outlined"
          state={fullName}
          setState={setFullName}
        />
        {fileResponse && (
          <View style={styles.preview}>
            <Image
              width={75}
              height={75}
              style={{
                borderRadius: 50,
              }}
              source={{
                uri: fileResponse.uri,
              }}
            />
            <View style={styles.previewInfo}>
              <Text style={styles.info}>{fileResponse.fileName}</Text>
              <Text style={styles.info}>{fileResponse.type}</Text>
              <Text style={styles.info}>
                {sizeInBytes(fileResponse.fileSize)}
              </Text>
            </View>
          </View>
        )}
        <Button
          title={fileResponse ? 'Cancel' : 'Select Profile Picture'}
          color={fileResponse ? 'red' : 'purple'}
          onPress={fileResponse ? cancelPicture : openGallery}></Button>
      </View>
      <View style={styles.btnContainer}>
        <ButtonOpacity
          label="Save"
          color={shouldEnableButton() ? palette.orange : palette.grey}
          borderColor={shouldEnableButton() ? palette.orange : palette.grey}
          onPress={profileSaved}
          disabled={!shouldEnableButton() ? true : false}
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
    height: 100,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 20,
    fontStyle: 'italic',
    marginVertical: 32,
  },
  form: {
    gap: 20,
  },
  preview: {
    display: 'flex',
    flexDirection: 'row',
  },
  previewInfo: {
    flexWrap: 'wrap',
    gap: 10,
    paddingHorizontal: 10,
  },
  info: {
    fontSize: 10,
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

export default IdentityScreen;
