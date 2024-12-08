// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');  // For password hashing

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true,  // Automatically add createdAt and updatedAt fields
});

// Encrypt password before saving it to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Skip hashing if password hasn't been modified
  
  const salt = await bcrypt.genSalt(10);  // Generate salt for hashing
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();  // Proceed to save the user
});

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // Compare entered password with stored hash
};

// Create a model from the schema and export it
const User = mongoose.model('User', userSchema);
module.exports = User;
