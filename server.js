if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

// Importing libraries and initializing them.

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.set('view-engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/views'));

const port = process.env.PORT
const db = require('./dbService');

//Defining the standard routes


app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/restaurant', (req, res) => {
    res.render('restaurant.ejs');
})

app.get('/charity', (req, res) => {
    res.render('charity.ejs');
})

app.get('/pickup', (req, res) => {
    res.render('pickup.ejs');
})

// Restaurant Login and Registration

app.post('/restaurant/login', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.loginRUser(userData)
        .then((user) => {
            if (user.restaurantName === userData.username &&
                user.password === userData.password) {
                const id = user.id;
                res.redirect(`/restaurant/${id}`)
            } else {
                console.log("Username or password incorrect");
            }
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})


app.post('/restaurant/register', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.registerRUser(userData)
        .then(() => {
            res.redirect('/restaurant')
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Charity Login and Registration

app.post('/charity/login', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.loginCUser(userData)
        .then((user) => {
            if (user.charityName === userData.username &&
                user.password === userData.password) {
                const id = user.id;
                res.redirect(`/charity/${id}`)
            } else {
                console.log("Username or password incorrect");
            }
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})


app.post('/charity/register', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.registerCUser(userData)
        .then(() => {
            res.redirect('/charity')
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Pickup Login and Registration


app.post('/pickup/login', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.loginPUser(userData)
        .then((user) => {
            if (user.deliveryagentName === userData.username &&
                user.password === userData.password) {
                const id = user.id;
                res.redirect(`/pickup/${id}`)
            } else {
                console.log("Username or password incorrect");
            }
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})


app.post('/pickup/register', async (req, res) => {
    const userData = req.body;
    // Perform registration logic here
    db.registerPUser(userData)
        .then(() => {
            res.redirect('/pickup')
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Get food Items on Restaurant dashboard

app.get('/restaurant/:id', (req, res) => {
    const id = req.params.id;
    Promise.all([db.getRUser(id), db.getRHistory(id)])
        .then((results) => {
            const [foodData, DeliveredData] = results;
            // Assuming you want to render both sets of data on the same page
            res.render('Rhome.ejs', { id, foodData, DeliveredData });
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Post food Items by Restaurant

app.post('/restaurant/:id/postFoodItem', async (req, res) => {
    const food = req.body;
    const id = req.params.id;
    // Perform post logic here
    db.postFood(food, id)
        .then(() => {
            res.redirect(`/restaurant/${id}`)
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Get food Items on Charity dashboard


app.get('/charity/:id', (req, res) => {
    const id = req.params.id;
    Promise.all([db.getCUser(id), db.getCHistory(id), db.getCView(id)])
        .then((results) => {
            const [foodData, DeliveredData, foodView] = results;
            // Assuming you want to render both sets of data on the same page
            res.render('Chome.ejs', { id, foodData, DeliveredData, foodView });
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Update food Items Status by Charity 

app.post('/c/updateStatus/:id/:foodId', async (req, res) => {
    const idm = req.params.id;
    const id = req.params.foodId;
    Promise.all([db.updateCStatusi(id, idm)])
        .then((user) => {
            res.redirect(`/charity/${idm}`)

        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
});

// Get food Items on Pickup dashboard

app.get('/pickup/:id', (req, res) => {
    const id = req.params.id;
    Promise.all([db.getPUser(id), db.getPHistory(id), db.getPView(id)])
        .then((results) => {
            const [foodData, DeliveredData, foodView] = results;
            // Assuming you want to render both sets of data on the same page
            res.render('Phome.ejs', { id, foodData, DeliveredData, foodView });
        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
})

// Update food Items Status by Pickup

app.post('/p/updateStatus/:id/:foodId', async (req, res) => {
    const idm = req.params.id;
    const id = req.params.foodId;
    Promise.all([db.updatePStatusi(id, idm)])
        .then((user) => {
            res.redirect(`/pickup/${idm}`)

        })
        .catch(error => {
            res.status(400).json({ success: false, message: error.message });
        });
});

// Update food Items Status by Pickup to delivered

app.post('/p1/updateStatus/:id/:foodId', async (req, res) => {
    const idm = req.params.id;
    const id = req.params.foodId;
    Promise.all([db.updatePStatus(id, idm)])
        .then((user) => {
            res.redirect(`/pickup/${idm}`)

        })
        .catch(error => {
            console.log(error.sqlMessage);
            res.status(400).json({ success: false, message: error.message });
        });
});

// Logout route

app.delete('/logout', (req, res) => {

    res.redirect('/')
})

//Assign a port to start the server

app.listen(port);