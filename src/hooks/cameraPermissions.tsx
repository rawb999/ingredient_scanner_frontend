import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  useCameraDevices,
  CameraPermissionStatus,
  useCameraPermission,
} from 'react-native-vision-camera';

export function cameraPermissions() {
  const {
    hasPermission: hasCameraPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  useEffect(() => {
    (async () => {
      if (!hasCameraPermission) {
        await requestCameraPermission();
      }
    })();
  }, [hasCameraPermission, requestCameraPermission]);

  return hasCameraPermission;
}
