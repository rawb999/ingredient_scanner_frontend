import { useRef } from 'react';
import { Camera } from 'react-native-vision-camera';

export function useCamera() {
  const cameraRef = useRef<Camera>(null);


  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto();
      return `file://${photo.path}`;
    }
    return null;
  };

  return { cameraRef, takePicture };
}