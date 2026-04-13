# Cypress E2E Tests – SauceDemo

This project contains automated end-to-end tests for the SauceDemo application using Cypress.

## 📌 Test Scenarios Covered

### 🔐 Login Tests
- Valid login with correct credentials
- Login fails with wrong password
- Login fails without username
- Login fails with invalid username and password

### 🛒 Checkout Tests
- Successful product add to cart and checkout
- Checkout fails without first name
- Checkout fails without postal code

## 🧠 Testing Approach

- Page Object Model (POM) is used for better structure and maintainability
- Reusable helper function (`login()`) implemented to avoid code duplication
- Negative testing scenarios are included to validate error handling
- Assertions are used to verify:
  - URL navigation
  - Visibility of elements
  - Error messages

## 🛠️ Technologies Used
- Cypress
- JavaScript
- Page Object Model (POM)

## 📂 Project Structure
cypress/ e2e/tests → test cases pages → page objects support → commands and setup

## ▶️ How to Run

1. Install dependencies:
2. npm install
3. Open Cypress

## 🚀 Key Learnings

- Writing automated UI tests using Cypress
- Structuring tests using Page Object Model
- Handling positive and negative scenarios
- Creating reusable functions for cleaner code
- Validating UI behavior with assertions

## 👤 Author
Mario Mladenov
