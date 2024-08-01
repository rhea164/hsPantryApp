'use client'
import { useState, useEffect } from 'react';
import { firestore } from '@/firebase';
import { Typography, Button, Box, Modal, TextField, IconButton } from '@mui/material';
import Stack from '@mui/material/Stack';
import { collection, getDocs, query, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot)
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({ name: doc.id, ...doc.data() });

    })
    console.log(pantryList);
    setPantryItems(pantryList);
  }

  useEffect(() => {
    updatePantry();
  }, [])
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updatePantry()
  }

  const handleAddItem = () => {
    addItem(itemName);
    setItemName('');
    handleClose();
  }

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
  }

  const handleDeleteItem = async (item) => {
      await deleteItem(item);
    
  }

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredPantryItems = pantryItems.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <Box
      width='100vw'
      height='100vh'
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      flexDirection={'column'}
      gap={2} >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
      />
      <Button onClick={handleOpen} variant="contained">ADD</Button>
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
  )
}
