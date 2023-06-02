import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import { v4 } from 'uuid';
import { storage } from '../../../firebase/firebase';
import { isUserProfilUpdated, userUpdatePicture } from '../../../actions/user';

function UploadFile() {
  const [selectedFile, setSelectedFile] = useState('');
  const dispatch = useDispatch();
  const { user, isProfilEdited, isLogged } = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (isProfilEdited) {
      setSelectedFile('');
      isUserProfilUpdated(false);
    }
  }, [user]);

  const fileChangeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = () => {
    if (selectedFile && isLogged) {
      // Create a reference to user image
      const userImagesRef = ref(storage, `UsersImages/user_${user.id}_${v4()}`);
      // 'file' comes from the Blob or File API
      uploadBytes(userImagesRef, selectedFile).then((snapshot) => {
        // Get picture URL from firebase and dispatch
        getDownloadURL(userImagesRef).then((url) => {
          dispatch(userUpdatePicture(url));
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  };

  return (
    <>
      { selectedFile && <Typography>Image: {selectedFile.name}</Typography> }
      <Button
        sx={{ width: '197px', mt: '5px' }}
        color="primary"
        variant="contained"
        component="label"
      >
        Modifier mon avatar
        <input
          accept="image/*"
          type="file"
          hidden
          onChange={fileChangeHandler}
        />
      </Button>
      <Button
        sx={{ display: selectedFile ? '' : 'none', width: '197px', mt: '10px' }}
        color="warning"
        variant="contained"
        component="label"
        type="submit"
        onClick={handleUploadFile}
      >
        Envoyer
      </Button>
    </>
  );
}

export default UploadFile;
