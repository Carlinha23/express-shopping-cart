const express = require('express');
const router = new express.Router();
const ExpressError = require("./expressError");
const itemRoutes = require("./fakeDb")

const ITEMS = [ 
    {name: "popsicle", price: 1.45},
    {name: "cheerios", price: 3.40},
    ]


router.get('/', (req, res) => {
  res.json({ users: ITEMS })
})

router.get('/:name', (req, res) => {
  const itemName = req.params.name;
  const item = ITEMS.find(u => u.name === itemName);
  if (item) {
    res.json({ item });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

router.post('/', (req, res) => {
  const newItem = req.body;
  ITEMS.push(newItem);
  res.status(201).json({ added: newItem });
});

router.patch('/:name', (req, res) => {
  const itemName = req.params.name;
  const { name, price } = req.body;

  const itemIndex = ITEMS.findIndex(u => u.name === itemName);
  if (itemIndex !== -1) {
    if (name) {
      ITEMS[itemIndex].name = name;
    }
    if (price) {
      ITEMS[itemIndex].price = price;
    }
    res.json({ updated: ITEMS[itemIndex] });
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});


router.delete('/:name', (req, res) => {
  const itemName = req.params.name;

  // Find the index of the item with the provided name
  const itemIndex = ITEMS.findIndex(u => u.name === itemName);
  
  // If item found, remove it from the array
  if (itemIndex !== -1) {
    ITEMS.splice(itemIndex, 1);
    res.json({ message: "Deleted" });
  } else {
    // If item not found, respond with 404 Not Found
    res.status(404).json({ error: "Item not found" });
  }
});



module.exports = router;