export async function uploadImage(imagePath: string, activeSetting: string) {
    const formData = new FormData();
    formData.append('image', {
      uri: imagePath,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    formData.append('activeSetting', activeSetting);
  //https://ingredient-scanner-38a7d9459a00.herokuapp.com/upload-image
    try {
      const response = await fetch("https://ingredient-scanner-38a7d9459a00.herokuapp.com/upload-image", {
        method: 'POST',
        body: formData, 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }