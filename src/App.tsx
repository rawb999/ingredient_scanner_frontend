import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
} from 'react-native-vision-camera';
import {cameraPermissions} from './hooks/cameraPermissions';
import {uploadImage} from './services/uploadImage';
import {useCamera} from './hooks/useCamera';
import HighlightedText from './components/HighlightedText';
import styles from './App.styles';

function App() {
  const {cameraRef, takePicture} = useCamera();
  const hasCameraPermission = cameraPermissions();
  const [retrieved, setRetrieved] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [activeSetting, setActiveSetting] = useState('vegan');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePath, setImagePath] = useState<string | null>(null);
  const device = useCameraDevice('back');

  if (!hasCameraPermission) {
    return (
      <View>
        <Text>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (device == null) return <Text>No Camera Device Found</Text>;

  const handleTakePicture = async () => {
    const imagePath = await takePicture();
    if (imagePath) {
      setImagePath(imagePath);
      setIsLoading(true);
      setShowCamera(false);
      try {
        const retrievedData = await uploadImage(imagePath, activeSetting);
        setRetrieved(retrievedData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error uploading image:', error);
        setIsLoading(false);
        setShowCamera(true);
      }
    }
    setShowCamera(false);
  };

  const handleReturnToCamera = () => {
    setShowCamera(true);
    setRetrieved(null);
    setShowSettings(false);
    setImagePath(null);
  };

  const handleOpenSettings = () => {
    setShowCamera(false);
    setShowSettings(true);
  };

  const handleRotate = () => {

  };

  return (
    <View style={StyleSheet.absoluteFill}>
      {showCamera && hasCameraPermission && device && (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
          <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
              style={styles.takePictureButton}
              onPress={handleTakePicture}>
              <Image
                source={require('./images/picture_button.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={handleOpenSettings}>
              <Image
                source={require('./images/settings.png')}
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}

      {isLoading && imagePath && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={{uri: imagePath}}
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
          />
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{position: 'absolute'}}
          />
        </View>
      )}

      {retrieved && !showCamera && (
        <SafeAreaView style={{flex: 1}}>
          <HighlightedText
            text={retrieved.result}
            highlightWords={retrieved.result_highlights}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={handleReturnToCamera}>
              <Text style={styles.returnButtonText}>Return to Camera</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
      {!showCamera && showSettings && (
        <SafeAreaView style={{flex: 1}}>
          <View style={{margin: 20}}>
            <Text>Vegan</Text>
            <Switch
              value={activeSetting === 'vegan'}
              onValueChange={value => {
                if (value) setActiveSetting('vegan');
              }}
            />
          </View>
          <View style={{margin: 20}}>
            <Text>Vegetarian</Text>
            <Switch
              value={activeSetting === 'vegetarian'}
              onValueChange={value => {
                if (value) setActiveSetting('vegetarian');
              }}
            />
          </View>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={handleReturnToCamera}>
              <Text style={styles.returnButtonText}>Return to Camera</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

export default App;
