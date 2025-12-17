# React Password Generator

A robust, highly customizable password generator application built with React and Tailwind CSS. This project focuses on a modern, user-friendly interface using a pastel glassmorphism aesthetic while implementing efficient state management and optimization techniques.

# Project Overview

This application generates random, secure passwords based on user-defined criteria (length, numeric inclusion, and special character inclusion). It features a real-time password strength evaluator and one-click clipboard copying functionality.

# Features

* Customizable Security: Users can adjust password length (6-32 characters) and toggle numbers or special characters.
* Real-time Strength Assessment: An algorithmic strength meter evaluates the complexity of the generated password and provides visual feedback (Weak/Medium/Strong).
* Clipboard Integration: One-click copy functionality using the browser's Clipboard API with visual feedback.
* Modern UI/UX: Designed with a responsive "Glassmorphism" aesthetic using Tailwind CSS, featuring backdrop filters, custom toggle switches, and fluid gradients.
* Performance Optimized: Utilizes React memoization hooks to prevent unnecessary re-renders.

# Technologies Used

* React: Frontend library for building the component-based architecture.
* Tailwind CSS: Utility-first CSS framework for styling, responsiveness, and complex UI effects (gradients, blur, shadows).
* JavaScript (ES6+): Core logic for random character generation and strength validation.

# Technical Implementation Details

This project demonstrates the practical application of core React Hooks:

 1. State Management (`useState`)
Managed the application state for password length, character inclusion settings, the generated password string, and UI feedback states (e.g., the "Copied" notification).

 2. Optimization (`useCallback`)
The `passwordGenerator` and `copyPasswordToClipboard` functions are wrapped in `useCallback`. This ensures that these functions are memoized and only re-created when their specific dependencies (length, allowed characters) change, optimizing performance by preventing unnecessary function re-declarations on every render.

3. Side Effects (`useEffect`)
Used to synchronize the password generation logic with the state. Whenever the user modifies the length slider or toggles a setting, the `useEffect` hook triggers the generator function immediately to reflect the changes in real-time.

# 4. DOM Access (`useRef`)
Implemented to maintain a reference to the password input field. This allows for programmatic selection of the text range for the user experience highlight effect during the copy action.

# Installation and Setup

To run this project locally:

1.  Clone the repository
    ```bash
    git clone [https://github.com/your-username/password-generator.git](https://github.com/your-username/password-generator.git)
    ```

2.  Navigate to the project directory
    ```bash
    cd password-generator
    ```

3.  Install dependencies
    ```bash
    npm install
    ```

4.  Start the development server
    ```bash
    npm run dev
    ```

# Usage

1.  Length: Drag the slider to set the desired character count (6 to 32).
2.  Settings: Toggle "Numbers" or "Symbols" to increase complexity.
3.  Generate: The password updates automatically upon changing settings, or click "Generate New Password" to refresh manually.
4.  Copy: Click the "Copy" button to save the password to your clipboard.

# License

This project is open source and available under the [MIT License](LICENSE).
