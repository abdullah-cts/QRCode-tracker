# QR Code Tracker App

## Overview
The QR Code Tracker App allows users (e.g., students) to scan QR codes to borrow and return items. The app uses React Native with Expo for the frontend and 
Supabase for the backend.

## Features
- **Borrow Item:** Scan student and product QR codes to borrow items.
- **Return Item:** Scan product QR code to return items.
- **Where to Return:** Scan product QR code to find its return location.
- **Error Handling:** Redirects to an error screen if scanning fails.

## Project Structure
```
QRCode-tracker/
├── assets/                 # Contains app icons and splash images
├── screens/                # Contains all the screen components
│   ├── BorrowScreen.js
│   ├── ErrorScreen.js
│   ├── HomeScreen.js
│   ├── ReturnScreen.js
│   └── WhereToReturnScreen.js
├── App.js                  # Main app component with navigation setup
├── app.json                # Expo configuration file
├── index.js                # Entry point for the app
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Setup Instructions
1. **Clone the repository:**
   ```sh
   git clone https://github.com/abdullah-cts/QRCode-tracker.git
   cd QRCode-tracker
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the app:**
   ```sh
   npm start
   ```

4. **Run on Android:**
   ```sh
   npm run android
   ```

5. **Run on iOS:**
   ```sh
   npm run ios
   ```

6. **Run on Web:**
   ```sh
   npm run web
   ```

## Screens
### Home Screen
- **Components:**
  - `Borrow Item` button
  - `Return Item` button
  - `Where to Return` button
- **Navigation:**
  - Navigates to BorrowScreen, ReturnScreen, or WhereToReturnScreen

### Borrow Screen
- **Components:**
  - Camera for scanning QR codes
  - `Scan Student QR Code` button
  - `Scan Product QR Code` button
  - `Borrow` button
- **Functionality:**
  - Scans student and product QR codes
  - Stores data in Firebase
  - Shows confetti animation on successful borrow

### Return Screen
- **Components:**
  - Camera for scanning QR codes
  - `Scan Product QR Code` button
  - `Return Product` button
- **Functionality:**
  - Scans product QR code
  - Deletes entry from Firebase
  - Shows confetti animation on successful return

### Where to Return Screen
- **Components:**
  - Camera for scanning QR codes
  - `Where to Return` button
  - Displays location of the product
- **Functionality:**
  - Scans product QR code
  - Displays return location

### Error Screen
- **Components:**
  - Error message
  - `Return Home` button
- **Functionality:**
  - Redirects to HomeScreen on error

## Technical Details
### QR Code Data
- **Product QR Code:**
  - `device_id` (UUID4)
  - `name`
  - `device_type`
  - `device_sub_type`
  - `isFaulty`
  - `location`
  - `purpose`
- **Student QR Code:**
  - `id` (UUID4)
  - `role`
  - `magic`

### Supabase Structure
- **Borrower List:**
  - `device_id` (key)
  - `student_id`
  - `role`
  - `magic`

## Dependencies
- React Native
- Expo
- React Navigation
- Expo Camera
- React Native Confetti Cannon
- Firebase

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
