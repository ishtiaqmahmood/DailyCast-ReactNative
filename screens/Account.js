import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from 'react-native';
import UserInput from '../components/auth/UserInput';
import SubmitButton from '../components/auth/SubmitButton';
import axios from 'axios';
import CircleLogo from '../components/auth/CircleLogo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/auth';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Account = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState({
    url: '',
    public_id: '',
  });
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadImage, setUploadImage] = useState();

  const [state, setState] = useContext(AuthContext);

  const handleSubmit = () => {};

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const handleUpload = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      // videoQuality: 'low',
      // durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
      base64: true,
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      let uri = response['assets'][0]['uri'];
      setUploadImage(uri);
      console.log(uri);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
    });
    // let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    // if (isCameraPermitted && isStoragePermitted) {
    //   launchCamera(options, response => {
    //     console.log('Response = ', response);

    //     if (response.didCancel) {
    //       alert('User cancelled camera picker');
    //       return;
    //     } else if (response.errorCode == 'camera_unavailable') {
    //       alert('Camera not available on device');
    //       return;
    //     } else if (response.errorCode == 'permission') {
    //       alert('Permission not satisfied');
    //       return;
    //     } else if (response.errorCode == 'others') {
    //       alert(response.errorMessage);
    //       return;
    //     }
    //     console.log(response);
    //     console.log('base64 -> ', response.base64);
    //     console.log('uri -> ', response.uri);
    //     console.log('width -> ', response.width);
    //     console.log('height -> ', response.height);
    //     console.log('fileSize -> ', response.fileSize);
    //     console.log('type -> ', response.type);
    //     console.log('fileName -> ', response.fileName);
    //     setUploadImage(response.uri);

    //     const {data} = axios.post('/upload-image', {image: uploadImage});
    //     console.log('UPDATED RESPONSE =>>> ', data);
    //   });
  };

  useEffect(() => {
    if (state) {
      const {name, email, image, role} = state.user;
      setName(name);
      setImage(image);
      setEmail(email);
      setRole(role);
    }
  }, [state]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          justifyContent: 'center',
        }}>
        <View style={{marginVertical: 5}}>
          <CircleLogo>
            {image && image.url ? (
              <Image
                source={{
                  uri: image.url,
                }}
                style={{
                  width: 190,
                  height: 190,
                  borderRadius: 100,
                  marginVertical: 20,
                }}
              />
            ) : uploadImage ? (
              <Image
                source={{
                  uri: uploadImage,
                }}
                style={{
                  width: 190,
                  height: 190,
                  borderRadius: 100,
                  marginVertical: 20,
                }}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handleUpload('photo');
                }}>
                <FontAwesome5 name="camera" size={25} />
              </TouchableOpacity>
            )}
          </CircleLogo>
          {uploadImage ? (
            <TouchableOpacity
              onPress={() => {
                handleUpload('photo');
              }}>
              <FontAwesome5
                name="camera"
                size={25}
                style={{marginTop: -5, marginBottom: 10, alignSelf: 'center'}}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              paddingBottom: 10,
              fontWeight: 'bold',
            }}>
            {name}
          </Text>
          <Text style={{textAlign: 'center', fontSize: 20, paddingBottom: 10}}>
            {email}
          </Text>
          <Text style={{textAlign: 'center', fontSize: 13, paddingBottom: 10}}>
            {role}
          </Text>
          <UserInput
            name="Password"
            value={password}
            setValue={setPassword}
            secureTextEntry={true}
            autoCompleteType="password"
          />
          <SubmitButton
            title="Update Password"
            handleSubmit={handleSubmit}
            loading={loading}
          />
          <SubmitButton
            title="Logout"
            handleSubmit={handleSubmit}
            loading={loading}
            style={{backgroundColor: 'red'}}
          />
        </View>
      </KeyboardAwareScrollView>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <FooterTabs />
      </View>
    </SafeAreaView>
  );
};

export default Account;
