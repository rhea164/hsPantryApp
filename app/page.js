'use client'
import { useState, useEffect, useRef } from 'react';
import { firestore } from '@/firebase';
import { Typography, Button, Box, Modal, TextField, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { Camera } from 'react-camera-pro';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [pantryItems, setPantryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('');
  const [image, setImage] = useState(null);
  const camera = useRef(null);

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });
    });
    console.log(pantryList);
    setPantryItems(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updatePantry();
  };
  

  const handleAddItem = () => {
    addItem(itemName);
    setItemName('');
    handleClose();
  };

  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity > 1) {
        await setDoc(docRef, { quantity: quantity - 1 });
      } else {
        await deleteDoc(docRef);
      }
      console.log('Item deleted successfully');
    }
    await updatePantry();
  };

  const handleDeleteItem = async (item) => {
    await deleteItem(item);
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPantryItems = pantryItems.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleTakePhoto = () => {
    const photo = camera.current.takePhoto();
    setImage(photo);
    setCameraOpen(false);
  };

  const sendImageToServer = async (imageData) => {
  const formData = new FormData();
  formData.append('image', dataURItoBlob(imageData), 'image.jpg');

  try {
    const response = await fetch('http://localhost:5000/api/analyze-image', {
      method: 'POST',
      body: formData,
      mode: 'cors',
      credentials: 'omit',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
  

  // const sendImageToServer = async (imageData) => {
  //   const formData = new FormData();
  //   formData.append('image', dataURItoBlob(imageData), 'image.jpg');
  
  //   try {
  //     const response = await fetch('http://localhost:5000/api/analyze-image', {
  //       method: 'POST',
  //       body: formData,
  //     });
  
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  
  //     const data = await response.json();
  //     return data.result;
  //   } catch (error) {
  //     console.error('Error:', error);
  //     return null;
  //   }
  // };

  // Helper function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

const handleAddFromPhoto = async () => {
  if (image) {
    const result = await sendImageToServer(image);
    if (result) {
      addItem(result);
      setImage(null);
    }
  }
};

  return (
    <Box
      width='100vw'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h6">Take a picture of the item</Typography>
        <IconButton onClick={() => setCameraOpen(true)}>
          <CameraAltIcon />
        </IconButton>
        </Box>
        {cameraOpen && (
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
            <Camera ref={camera} />
            <Button onClick={handleTakePhoto} variant="contained">Take Photo</Button>
          </Box>
        )}
        {image && <img src={image} alt="Taken photo" />}
      </Box>
      <Button onClick={handleAddFromPhoto} variant="contained">ADD FROM PHOTO</Button>
      <Button onClick={handleOpen} variant="contained">ADD MANUALLY</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2"
            display={'flex'}
            justifyContent={'center'}
          >
            ADD ITEM
          </Typography>
          <Box display={'flex'} alignItems={'center'} justifyContent={'space-around'}>
            <TextField id="outlined-basic" label="Outlined" variant="outlined"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button variant="outlined"
              onClick={handleAddItem}> ADD </Button>
          </Box>
        </Box>
      </Modal>
      <Box border={'1px black solid'}>
        <Box bgcolor={'#ADD8E6'} width={'800px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'} >
          <Typography
            textAlign={'center'}
            variant={'h4'}
            color={'#333'}
          >
            Pantry Items
          </Typography>
        </Box>
        <Stack width='800px' height={'300px'} spacing={2} overflow={'scroll'}>
          {filteredPantryItems.length > 0 ? (
            filteredPantryItems.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                height="100px"
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
                bgcolor={'#f5f5f5'}
              >
                <Typography
                  variant={'h5'}
                  color={'#333'}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  variant={'h5'}
                  color={'#333'}>
                  Quantity : {quantity}
                </Typography>
                <IconButton onClick={() => handleDeleteItem(name)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            pantryItems.map(({ name, quantity }) => (
              <Box
                key={name}
                width="100%"
                height="100px"
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
                bgcolor={'#f5f5f5'}
              >
                <Typography
                  variant={'h5'}
                  color={'#333'}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography
                  variant={'h5'}
                  color={'#333'}>
                  Quantity : {quantity}
                </Typography>
                <IconButton onClick={() => handleDeleteItem(name)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            ))
          )}
        </Stack>
      </Box>
    </Box>
  );
}
