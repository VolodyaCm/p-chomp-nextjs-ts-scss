import app from '.';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@firebase/storage';

const db = getStorage(app);

export const uploadFile = async (file: File) => {
  const storageRef = ref(db, 'products/' + file.name);
  const response = await uploadBytes(storageRef, file);
  const url: string = await getDownloadURL(storageRef);

  return { response, url };
};
