import React, {useState} from 'react';
import {Button, Image, StyleSheet, View} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

interface ImagePickerInputProps {
  onImageSelect: (imageUri: string) => void;
}

const ImagePickerInput: React.FC<ImagePickerInputProps> = ({onImageSelect}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
  const ImagePicker = () => {
    launchImageLibrary(options, response => {
      console.log(response);
    });
  };

  return (
    <View style={styles.container}>
      {selectedImage && (
        <Image source={{uri: selectedImage}} style={styles.previewImage} />
      )}
      <Button title="Select Image" onPress={() => ImagePicker()}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 16,
  },
  previewImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 16,
  },
});

export default ImagePickerInput;
