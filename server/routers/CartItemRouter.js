const express = require("express");
const router = express.Router();
const CartItem = require("../models/CartItemModel");
const Book = require("../models/BookModel.js");
const User = require("../models/UsersModel");
const middleware = require("../middleware/middleware.js");


// Add a book to the cart
router.post("/cart/add",middleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    const cartItem = await CartItem.findOne({ bookId, userId: req.user.id });

    if (cartItem) {
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      const newCartItem = new CartItem({ bookId, userId: req.user.id });
      await newCartItem.save();
    }

    res.status(200).json({ message: "Book added to cart successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add book to cart" });
  }
});

// Update the quantity of a book in the cart
router.put("/cart/update/:cartItemId", middleware, async (req, res) => {
  try {
    const { cartItemId } = req.params;
    const { quantity } = req.body;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    // Decrease the quantity by the desired value
    cartItem.quantity -= quantity;

    await cartItem.save();

    res.status(200).json({ message: "Cart item updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update cart item" });
  }
});


// Decrease the quantity of a book in the cart
router.put("/cart/decreaseQuantity/:cartItemId", async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (cartItem.quantity === 1) {
      // Remove the cart item if the quantity is 1
      await cartItem.remove();
    } else {
      // Decrease the quantity by 1
      cartItem.quantity -= 1;
      await cartItem.save();
    }

    res.status(200).json({ message: "Cart item quantity decreased successfully" });
  } catch (error) {
    console.error("Failed to decrease item quantity:", error);
    res.status(500).json({ error: "Failed to decrease item quantity" });
  }
});



// Get cart items by user
router.post("/cart/user", middleware, async (req, res) => {
  try {
    const { userId } = req.body;

    const cartItems = await CartItem.find({ userId })
      .populate("bookId")
      .populate("userId");

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: "Failed to get cart items" });
  }
});




// Remove a book from the cart
router.delete("/cart/remove/:cartItemId",middleware, async (req, res) => {
  try {
    const { cartItemId } = req.params;

    const cartItem = await CartItem.findById(cartItemId);
    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    await cartItem.remove();

    res.status(200).json({ message: "Cart item removed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove cart item" });
  }
});

module.exports = router;
