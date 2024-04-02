import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bottomButtonContainer: {
      flex: 1, 
      width: '100%', 
      justifyContent: 'flex-end', 
      alignItems: 'center'
    },
    returnButton: {
      alignSelf: 'center', 
      position: 'absolute', 
      bottom: 35,
      backgroundColor: '#007bff', 
      padding: 10,
      borderRadius: 5,
      borderWidth: 1, 
      borderColor: 'black', 
      borderRadius: 5
    },
    returnButtonText: {
      color: 'white', // Example text color
    }, 
    cameraButtonContainer: {
      flex: 1, 
      width: '100%', 
      justifyContent: 'flex-end', 
      alignItems: 'center'
    }, 
    takePictureButton: {
      alignSelf: 'center', 
      position: 'absolute', 
      bottom: 50,
      backgroundColor: 'transparent', 
      width: 75,
      height: 75
    }, 
    buttonIcon: {
      width: 75,
      height: 75
    }, 
    settingsButton: {
      alignSelf: 'flex-end', 
      right: 30, 
      bottom: 50
    }, 
    rotationButton: {
      alignSelf: 'flex-start', 
      left: 30, 
      bottom: -25
    },
    container: {

    }, 
    text: {
      fontSize: 16, 
      backgroundColor: 'white'
    }, 
    highlighted: {
      backgroundColor: 'yellow',
    }, 
    imagePreviewContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5,
    }, 
    imagePreview: {
      width: '100%',
      height: '100%',
    }, 
    loadingIndicator: {

    }, 
    
  });

  export default styles;