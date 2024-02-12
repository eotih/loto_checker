import React, { useState, memo } from "react";
import { SafeAreaView, Button, Image } from "react-native";
// import * as ImagePicker from "expo-image-picker";

 function HomeScreen() {
//   const [image, setImage] = useState(null);
//   const defaultOptions = {
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [16, 9],
//     quality: 1,
//   };

//   const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//     let result = await ImagePicker.launchImageLibraryAsync(defaultOptions);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };
//   const openCamera = async () => {
//     // Ask the user for the permission to access the camera
//     const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

//     if (permissionResult.granted === false) {
//       alert("You've refused to allow this appp to access your camera!");
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync(defaultOptions);

//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>home</Text>
      {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="openCamera" onPress={openCamera} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}
    </SafeAreaView>
  );
}

export default memo(HomeScreen);