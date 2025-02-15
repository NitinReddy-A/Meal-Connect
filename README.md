# 🍽️ Meal Connect: A Platform to Reduce Food Wastage

**Meal Connect** is an innovative platform designed to tackle the critical issue of food wastage. It connects local food businesses—such as restaurants and grocery stores—with nearby charities and food banks, creating a seamless process to redistribute surplus food to those in need. By optimizing surplus food tracking, pickup scheduling, and distribution, Meal Connect promotes sustainability while aiding communities in need.

---

## 🌟 Overview

Meal Connect aims to:
- Minimize food wastage by redistributing surplus food.
- Support charities and food banks with timely food donations.
- Facilitate a streamlined communication process between food donors and recipients.

---

## 🔑 Key Features

### 🏢 **Restaurant Management**
- Enables restaurants and grocery stores to register and manage their information.
- List surplus food items with details like quantity, category, and expiry date.

### 🍲 **Food Item Tracking**
- Tracks surplus food items with detailed attributes such as expiration and availability.

### ❤️ **Charity Registration**
- Allows charities and food banks to register, manage profiles, and request pickups.

### 📅 **Pickup Scheduling**
- Facilitates scheduling between businesses and charities for efficient food distribution.

### 📜 **Distribution History**
- Maintains records of food distributions, including recipient details, food items, and schedules.

---

## 🛠️ Tech Stack

### **Backend:**
- Node.js
- Express.js
- MySQL

### **Frontend:**
- ejs (Embedded JavaScript)
- CSS
- JavaScript

### **Database:**
- MySQL (managed via phpMyAdmin)

---

## 🚀 Getting Started

Follow these steps to set up Meal Connect on your local machine for development and testing purposes.

### 1️⃣ Clone the Repository
```bash
   git clone https://github.com/YourUsername/MealConnect.git
   cd MealConnect
```

### 2️⃣ Install Dependencies
Initialize the project and install required packages:
```bash
   npm init -y
   npm install express cors nodemon ejs dotenv mysql method-override express-session
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory to store sensitive information such as:
```env
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
SESSION_SECRET=your_secret_key
```

### 4️⃣ Start the Application
Run the server using the following command:
```bash
   npm run dev
```

> **Note:** Ensure your MySQL database is set up and configured as per the application’s requirements.

---

## 📊 Project Features Breakdown

### Backend:
- **API Design:** RESTful APIs built with Express.js for managing food items, user accounts, and scheduling.
- **Database:** MySQL database schema designed for efficient handling of surplus food data, user registrations, and pickup schedules.
- **Authentication:** Session-based authentication with Express-Session for secure logins.

### Frontend:
- **UI Templates:** Clean and responsive interfaces built using ejs templates, CSS, and JavaScript.
- **Dynamic Forms:** Interactive forms for registering businesses, tracking food items, and scheduling pickups.

### Deployment:
- Local hosting using Node.js.
- MySQL database management via phpMyAdmin for easy maintenance.

---

## 🖼️ Screenshots (Add relevant images here)

| **Feature** | **Screenshot** |
|-------------|-----------------|
| Restaurant Management | ![Restaurant Screenshot](link-to-image) |
| Charity Registration | ![Charity Screenshot](link-to-image) |
| Food Tracking | ![Food Tracking Screenshot](link-to-image) |

---

## 🤝 Contribute to Meal Connect

Join us in the mission to reduce food wastage and support those in need. Contributions, feedback, and feature requests are always welcome!

- **🔗 Repo:** [Meal Connect on GitHub](https://github.com/YourUsername/MealConnect)
- **📬 Contact:** [Your email/Discord/etc.]

---

**💡 Together, let's build a sustainable future by reducing food wastage!**
