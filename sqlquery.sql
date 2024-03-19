---------------Creating Database and Using it-------------------

CREATE DATABASE MEAL_CONNECT;
USE MEALCONNECT;

---------------Creating Tables-------------------

CREATE TABLE Restaurants (
  RestaurantID INT AUTO_INCREMENT PRIMARY KEY,
  RestaurantName VARCHAR(255),
  ContactNumber VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
);

CREATE TABLE food_items (
  FoodItemID INT AUTO_INCREMENT PRIMARY KEY,
  ItemName VARCHAR(255),
  Category VARCHAR(255),
  Quantity INT,
  ExpiryDate Date,
  RestaurantID INT,
  CharityID INT,
  ScheduleID INT,
  Status VARCHAR(255),
  FOREIGN KEY (CharityID) REFERENCES charities(CharityID),
  FOREIGN KEY (ScheduleID) REFERENCES pickup_schedule(ScheduleID),
  FOREIGN KEY (RestaurantID) REFERENCES Restaurants(RestaurantID)
);

CREATE TABLE charities (
  CharityID INT AUTO_INCREMENT PRIMARY KEY,
  CharityName VARCHAR(255),
  ContactNumber VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
);

CREATE TABLE pickup_schedule (
  ScheduleID INT AUTO_INCREMENT PRIMARY KEY,
  DeliverAgentName VARCHAR(255),
  ContactNumber VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255)
);

CREATE TABLE distribution_history (
  DistributionID INT AUTO_INCREMENT PRIMARY KEY,
  FoodItemID INT,
  FOREIGN KEY (FoodItemID) REFERENCES food_items(FoodItemID)
);

----------------------Trigger Function for Updating the Distribution History Table-----------------

DELIMITER //

CREATE TRIGGER update_distribution_history
AFTER UPDATE ON food_items
FOR EACH ROW
BEGIN
  IF NEW.Status = 'delivered' THEN
    INSERT INTO distribution_history (FoodItemID)
    VALUES (NEW.FoodItemID);
  END IF;
END;
//DELIMITER ;

------------- Stored Procedure to show the posted food items on the Restaurants Dashboard ---------------

DELIMITER //

CREATE PROCEDURE GetNonDeliveredFoodItemsByRestaurant(IN restaurantID INT)
BEGIN
    SELECT f.fooditemid AS foodid, 
           f.category, 
           f.itemname AS item, 
           f.quantity AS qty, 
           f.status
    FROM food_items f 
    WHERE f.restaurantid = restaurantID
      AND f.status != 'delivered';
END //

DELIMITER ;

-----------------To call storded procedure-------------

CALL GetNonDeliveredFoodItemsByRestaurant(?);

-----------------Trigger to show error while inserting duplicate delivered food items------------

DELIMITER //

CREATE TRIGGER distribution_history_insert_trigger
BEFORE INSERT ON distribution_history
FOR EACH ROW
BEGIN
    DECLARE error_message VARCHAR(255);

    -- Check if FoodItemID already exists
    IF EXISTS (SELECT 1 FROM distribution_history WHERE FoodItemID = NEW.FoodItemID) THEN
        SET error_message = 'FoodItemID already exists in distribution_history';
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = error_message;
    END IF;
END;
//DELIMITER ;

