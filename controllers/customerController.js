const db = require('../database/db');
const fs = require('fs');

// Create customer
exports.createCustomer = (req, res) => {
  const { firstName, lastName, email, mobileNumber, address, pincode } = req.body;

  // Validation
  if (!firstName || !lastName || !email || !mobileNumber || !address || !pincode) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Validation for email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Validation for pincode format (assuming 6 digits)
  const pincodeRegex = /^\d{6}$/;
  if (!pincodeRegex.test(pincode)) {
    return res.status(400).json({ message: 'Invalid pincode format' });
  }

  // Validation for mobile number format (starting with +91 and followed by 10 to 12 digits)
  const mobileRegex = /^\+91\d{10,12}$/;
  if (!mobileRegex.test(mobileNumber)) {
    return res.status(400).json({ message: 'Mobile number must start with +91 and be followed by 10 to 12 digits' });
  }

  // Define table creation SQL query
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customer_details (
      customer_id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255),
      mobile_number VARCHAR(20),
      address VARCHAR(255),
      pincode VARCHAR(10)
    )
  `;

  // Call query to create table (if not exists)
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Error creating table:', err);
      return res.status(500).json({ message: 'Failed to create table' });
    }

    // Insert data into the customer_details table using the existing stored procedure
    const insertQuery = `
      CALL InsertCustomer(?, ?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [firstName, lastName, email, mobileNumber, address, pincode], (err, results) => {
      if (err) {
        console.error('Error inserting customer:', err);
        return res.status(500).json({ message: 'Failed to insert customer' });
      }
      console.log('Customer inserted successfully');
      return res.status(201).json({ message: 'Customer created successfully' });
    });
  });
};
