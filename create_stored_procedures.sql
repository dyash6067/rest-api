CREATE PROCEDURE InsertCustomer(
  IN p_firstName VARCHAR(255),
  IN p_lastName VARCHAR(255),
  IN p_email VARCHAR(255),
  IN p_mobileNumber VARCHAR(20),
  IN p_address VARCHAR(255),
  IN p_pincode VARCHAR(10)
)
BEGIN
  INSERT INTO customer_details (first_name, last_name, email, mobile_number, address, pincode)
  VALUES (p_firstName, p_lastName, p_email, p_mobileNumber, p_address, p_pincode);
END;
