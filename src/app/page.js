'use client'
import { useEffect, useState } from 'react';
import { Box, Stack, Typography, Button, Modal, TextField } from '@mui/material';
import { firestore } from '@/firebase';
import { collection, doc, getDocs, query, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const updatePantry = async () => {
      const snapshot = query(collection(firestore, 'pantry'));
      const docs = await getDocs(snapshot);
      const pantryList = [];
      docs.forEach((doc) => {
        pantryList.push({ name: doc.id, ...doc.data() });
      });
      console.log(pantryList);
      setPantry(pantryList);
    };

    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updatePantry();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    updatePantry();
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
      sx={{ backgroundColor: 'green' }} // Change the background color to green
    >
      <Typography variant="h2">Emmanuel&apos;s Pantry Tracker</Typography>
      <Button variant="contained" onClick={handleOpen} sx={{ backgroundColor: 'green', color: 'black' }}>
        Add
      </Button>
      <TextField
        id="search-bar"
        label="Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onFocus={(e) => setSearchQuery('')}
        onBlur={(e) => setSearchQuery(e.target.value)}
        onChange={(e) => setSearchQuery(e.target.value)}
        InputProps={{ style: { color: 'white' } }} // Change text color to white
        InputLabelProps={{ style: { color: 'white' } }} // Change label color to white
      />
      <Box border="1px solid #333">
        <Box
          width="800px"
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h2" color="#333" textAlign="center">
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="300px" spacing={2} overflow="scroll">
          {pantry.map((item) => (
            <Box
              key={item.name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#f0f0f0"
              paddingX={5}
            >
              <Typography
                variant="h4"
                color="#333"
                textAlign="center"
                fontWeight="bold"
              >
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </Typography>
              <Typography variant="h3" color="#333" textAlign="center">
                Quantity: {item.quantity}
              </Typography>
              <Button variant="contained" onClick={() => removeItem(item.name)} sx={{ backgroundColor: 'green', color: 'black' }}>
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
