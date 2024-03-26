if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DBPORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})

// Function to authenticate user --Restaurant
function loginRUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "select * from restaurants where restaurantname = ?";
        connection.query(query, [
            userData.username
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const user = {
                    id: results[0].RestaurantID,
                    restaurantName: results[0].RestaurantName,
                    password: results[0].Password
                }
                resolve(user);
            }
        });
    });
}

// Function to register user --Restaurant
function registerRUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO RESTAURANTS (restaurantname, contactnumber, email, password) VALUES (?, ?, ?, ?)";
        connection.query(query, [
            userData.username,
            userData.contact,
            userData.email,
            userData.password1
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

// Function to authenticate user --Charity
function loginCUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "select * from charities where charityname = ?";
        connection.query(query, [
            userData.username
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results[0])
                const user = {
                    id: results[0].CharityID,
                    charityName: results[0].CharityName,
                    password: results[0].Password
                }
                console.log(user);
                resolve(user);
            }
        });
    });
}

// Function to register user --Charity
function registerCUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO CHARITIES (charityname, contactnumber, email, password) VALUES (?, ?, ?, ?)";
        connection.query(query, [
            userData.username,
            userData.contact,
            userData.email,
            userData.password
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


// Function to authenticate user --Pickup
function loginPUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "select * from pickup_schedule where deliveragentname = ?";
        connection.query(query, [
            userData.username
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results[0])
                const user = {
                    id: results[0].ScheduleID,
                    deliveryagentName: results[0].DeliverAgentName,
                    password: results[0].Password
                }
                console.log(user);
                resolve(user);
            }
        });
    });
}

// Function to register user --Pickup
function registerPUser(userData) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO PICKUP_SCHEDULE (deliveragentname, contactnumber, email, password) VALUES (?, ?, ?, ?)";
        connection.query(query, [
            userData.username,
            userData.contact,
            userData.email,
            userData.password
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


// Function to get user dashboard --Restaurant 
function getRUser(id) {
    return new Promise((resolve, reject) => {
        const query = "CALL GetNonDeliveredFoodItemsByRestaurant(?)";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {

                const foodData = results[0].map(row => ({
                    foodid: row.foodid,
                    cat: row.category,
                    item: row.item,
                    qty: row.qty,
                    status: row.status
                }));
                resolve(foodData);
            }
        });
    });
}

// Function to get user history --Restaurant 
function getRHistory(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT d.distributionid, d.fooditemid, f.restaurantid , f.charityid, f.scheduleid FROM distribution_history d, food_items f WHERE f.restaurantid = ? AND d.fooditemid = f.fooditemid";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const DeliveredData = results.map(row => ({
                    distributionid: row.distributionid,
                    foodid: row.fooditemid,
                    charityid: row.charityid,
                    scheduleid: row.scheduleid,
                    restaurantid: row.restaurantid
                }));
                resolve(DeliveredData);
            }
        });
    });
}


// Function to post food items --Restaurants
function postFood(food, id) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO FOOD_ITEMS (Itemname, category, quantity, expirydate , restaurantid , status) VALUES (?, ?, ?, ? ,? ,?)";
        connection.query(query, [
            food.ItemName,
            food.Category,
            food.Qty,
            food.date,
            id,
            'posted'
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


// Function to get user dashboard --charity 
function getCUser(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT f.fooditemid AS foodid, f.category, f.itemname AS item, f.quantity AS qty, f.status FROM food_items f WHERE f.charityid = ?  AND f.status != 'delivered'";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const foodData = results.map(row => ({
                    foodid: row.foodid,
                    cat: row.category,
                    item: row.item,
                    qty: row.qty,
                    status: row.status
                }));
                resolve(foodData);
            }
        });
    });
}

// Function to get user history --Charity 
function getCHistory(id) {
    return new Promise((resolve, reject) =>{
        const query = "SELECT d.distributionid, d.fooditemid, f.restaurantid , f.charityid, f.scheduleid FROM distribution_history d, food_items f WHERE f.charityid = ? AND d.fooditemid = f.fooditemid";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const DeliveredData = results.map(row => ({
                    distributionid: row.distributionid,
                    foodid: row.fooditemid,
                    charityid: row.charityid,
                    scheduleid: row.scheduleid,
                    restaurantid: row.restaurantid
                }));

                resolve(DeliveredData);
            }
        });
    });
}

// Function to get food posted --charity 
function getCView(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT f.fooditemid AS foodid, f.category,f.restaurantid, f.itemname AS item, f.quantity AS qty, f.status FROM food_items f WHERE f.charityid is null AND  f.status = 'posted'";
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                const foodView = results.map(row => ({
                    foodid: row.foodid,
                    cat: row.category,
                    item: row.item,
                    qty: row.qty,
                    restaurantid: row.restaurantid
                }));
                resolve(foodView);
            }
        });
    });
}

// Function to update food posted --charity 
function updateCStatusi(id , idm) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE food_items SET status = 'accepted' , charityid = ? where fooditemid = ?";
        connection.query(query, [
            idm , id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


// Function to get user dashboard --pickup 
function getPUser(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT f.fooditemid AS foodid, f.category, f.itemname AS item, f.quantity AS qty, f.status FROM food_items f WHERE f.scheduleid = ?  AND f.status != 'delivered'";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                const foodData = results.map(row => ({
                    foodid: row.foodid,
                    cat: row.category,
                    item: row.item,
                    qty: row.qty
                }));
                resolve(foodData);
            }
        });
    });
}

// Function to get user history --pickup 
function getPHistory(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT d.distributionid, d.fooditemid, f.restaurantid , f.charityid, f.scheduleid FROM distribution_history d, food_items f WHERE f.scheduleid = ? AND d.fooditemid = f.fooditemid";
        connection.query(query, [
            id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                console.log(results);
                const DeliveredData = results.map(row => ({
                    distributionid: row.distributionid,
                    foodid: row.fooditemid,
                    charityid: row.charityid,
                    scheduleid: row.scheduleid,
                    restaurantid: row.restaurantid
                }));
                resolve(DeliveredData);
            }
        });
    });
}

// Function to get food accepted --pickup 
function getPView(id) {
    return new Promise((resolve, reject) => {
        const query = "SELECT f.fooditemid AS foodid, f.category,f.restaurantid, f.charityid, f.itemname AS item, f.quantity AS qty, f.status FROM food_items f WHERE f.scheduleid is null AND  f.status = 'accepted'";
        connection.query(query, (error, results) => {
            if (error) {
                reject(error);
            } else {
                const foodView = results.map(row => ({
                    foodid: row.foodid,
                    restaurantid: row.restaurantid,
                    item: row.item,
                    qty: row.qty,
                    charityid: row.charityid
                }));
                resolve(foodView);
            }
        });
    });
}



// Function to update food accepted --pickup 
function updatePStatusi(id , idm) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE food_items SET status = 'assigned' , scheduleid = ? where fooditemid = ?";
        connection.query(query, [
            idm , id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


function updatePStatus(id , idm) {
    return new Promise((resolve, reject) => {
        const query = "UPDATE food_items SET status = 'delivered' , scheduleid = ? where fooditemid = ?";
        connection.query(query, [
            idm , id
        ], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}


module.exports = { loginRUser, registerRUser, loginCUser, registerCUser, loginPUser, registerPUser, getRUser, postFood, getRHistory, getCUser, getCHistory, getCView, updateCStatusi , getPUser, getPHistory , getPView , updatePStatusi , updatePStatus};