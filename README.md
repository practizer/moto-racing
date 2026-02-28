# 🚀 Full-Stack React Native RBAC App

A full-stack mobile application built using **React Native CLI** with a **Go (Gin) backend**, implementing Role-Based Access Control (RBAC).

This project demonstrates structured navigation, protected routes, dynamic role-based rendering, and secure REST API integration.

---

## 📱 Overview

This app uses **Role-Based Access Control (RBAC)** to dynamically control feature access based on user roles.

The UI and screens remain the same — but permissions and actions change depending on the authenticated user's role.

---

## 👤 User Roles & Permissions

### 👤 User
- View products
- View personal profile
- Limited access (no management permissions)

### 🛠 Admin
- All User features
- Add new products
- Delete products
- View user list
- Delete users

### 👑 SuperAdmin
- All Admin features
- View admin list
- Manage admins
- Delete admins
- Change user roles (User ↔ Admin)
- Full system-level access

---

## 💡 Key Learning Highlights

- Dynamic role-based conditional rendering
- Protected navigation flows
- Clean navigation structuring (Stack + Bottom Tabs)
- Context API-based authentication
- REST API integration
- Debugging complex mobile-specific issues

---

## 🛠 Tech Stack

### 📱 Frontend
- React Native CLI
- React Navigation (Stack Navigator & Bottom Tabs)
- Context API (Authentication & Role Management)
- Role-Based Conditional Rendering
- REST API Integration

### ⚙ Backend
- Go (Golang)
- Gin Framework
- RESTful API architecture
- Structured RBAC logic
- Extended API functionalities for mobile integration

---

## 🧠 Architecture Concept

- Single UI structure
- Role stored in authentication context
- Conditional rendering based on role
- Protected screens using navigation guards
- Backend validates role before sensitive operations

## 📂 Project Structure

```
RNC-FULLSTACK/
│
├── client/                 # React Native App (Frontend)
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── ErrorSender.js
│   │   │   ├── Header.js
│   │   │   ├── ProductCard.js
│   │   │   └── UserCard.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.js
│   │   │
│   │   ├── navigation/
│   │   │   ├── AppStack.js
│   │   │   ├── AuthStack.js
│   │   │   ├── BottomTabNavigator.js
│   │   │   └── RootNavigator.js
│   │   │
│   │   └── screens/
│   │       ├── AdminListScreen.js
│   │       ├── HomeScreen.js
│   │       ├── LoginScreen.js
│   │       ├── ProfileScreen.js
│   │       ├── RegisterScreen.js
│   │       └── UsersListScreen.js
│   │
│   ├── App.js
│   └── package.json
│
├── server/                 # Go (Gin) Backend
│   ├── config/
│   │   └── database.go
│   │
│   ├── handlers/
│   │   ├── admin.go
│   │   ├── auth.go
│   │   ├── superadmin.go
│   │   └── user.go
│   │
│   ├── middlewares/
│   │   └── auth.go
│   │
│   ├── models/
│   │   ├── auth.go
│   │   └── product.go
│   │
│   ├── routes/
│   │   └── routes.go
│   │
│   ├── main.go
│   └── go.mod
│
└── README.md
```
## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2️⃣ Install dependencies
npm install

or

yarn install
3️⃣ Run Metro
npx react-native start
4️⃣ Run on Android
npx react-native run-android
5️⃣ Run on iOS (Mac only)
cd ios
pod install
cd ..
npx react-native run-ios
🔐 Environment Variables

Create a .env file:

API_BASE_URL=http://your-backend-url
🚀 What This Project Strengthened

Mobile debugging skills

Structured state management

Navigation architecture planning

Secure role-based access implementation

Real-world backend integration experience

📌 Future Improvements

JWT refresh token implementation

Pagination & search for product listing

Image upload support

Performance optimization

Deployment-ready build configuration

📜 License

This project is open-source and available under the MIT License.

🙌 Author

Developed by Jaison David

Passionate about full-stack and mobile development.
Continuously learning and building real-world scalable applications.
