# QR Code Tracker App

## What the App Does
This app allows users (e.g., students) to scan QR codes and perform certain tasks. Each student has a unique QR code that identifies them. They can borrow products by scanning the product's QR code. Once a product is borrowed, the student’s QR code information and the product’s QR code information are stored in a database. When the product is returned, the entry is removed from the database. Additionally, students can scan a product's QR code to find out where to return it.

### Platform
- **Frontend:** React Native with Expo
- **Backend:** Google Firebase for real-time database access
- **Initial Target:** Android app
- **Final Goal:** Publish on Android and Apple app stores for public download

## Home Screen
The default page of the app contains the following components:

- **Button 1:** "Borrow Item" with a relevant icon.
  - **Action:** Launches the Borrow Item page.
- **Button 2:** "Return Item" with a relevant icon.
  - **Action:** Launches the Return Item page.
- **Button 3:** "Where to Return" with a relevant icon.
  - **Action:** Launches the Where to Return page.

### Page Style
- All buttons are centered both vertically and horizontally.
- Buttons span 80% of the viewport width.

## Borrow Item Page
When a user clicks "Borrow Item" on the Home Screen, this page launches. The following components are included:

- **Camera:** An invisible component to access the back camera.
- **Button 1:** "Scan Student QR Code"
  - **Action:** Triggers the camera to scan the QR code.
  - If scanning fails, redirect to the Failure Page.
  - If successful, disable itself and enable Button 2.
- **Button 2:** "Scan Product QR Code"
  - **Action:** Triggers the camera to scan the QR code.
  - If scanning fails, redirect to the Failure Page.
  - If successful, disable itself and enable Button 3.
- **Button 3:** "Borrow"
  - **Action:** Creates a database entry in Firebase with the scanned QR code data.
  - If successful, show confetti animation and return to Home Screen after a few seconds.

### Page Style
- Top 50% of the viewport is reserved for the camera.
- The lower 50% is evenly divided between three buttons, each spanning 80% of the viewport width.

## Return Item Page
This page allows students to return a borrowed product.

- **Camera:** An invisible component to access the back camera.
- **Button 1:** "Scan Product QR Code"
  - **Action:** Triggers the camera to scan the QR code.
  - If scanning fails, redirect to the Failure Page.
  - If successful, delete the entry from Firebase, show confetti, and return to Home Screen after a few seconds.

### Page Style
- Top 50% of the viewport is reserved for the camera.
- The lower 50% is reserved for a single button, spanning 80% of the viewport width.

## Where to Return Page
This page allows users to scan a product’s QR code to find its return location.

- **Camera:** An invisible component to access the back camera.
- **Button 1:** "Where to Return"
  - **Action:** Triggers the camera to scan the product QR code.
  - If scanning fails, redirect to the Failure Page.
  - If successful, store the product’s location in a variable.
- **Text Area:** Displays the stored location in read-only format.

### Page Style
- Top 50% of the viewport is reserved for the camera.
- The lower 50% is evenly divided between the button and text area, each spanning 80% of the viewport width.

## Technical Details
### Product QR Code Data
- `device_id` (UUID4 unique identifier)
- `name`
- `device_type`
- `device_sub_type`
- `isFaulty`
- `location`
- `purpose`

### Student QR Code Data
- `id` (UUID4 unique identifier)
- `role`
- `magic`

### Borrower List (Firebase Realtime Database)
Each borrowed device entry contains:
- `device_id` (key)
- `student_id`
- `role`
- `magic`
