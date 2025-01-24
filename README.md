# Home Accounting App

## Overview

A web application for managing personal finances and tracking expenses. Built with Angular 17+, standalone components, Angular Material, SCSS, and RxJS. Designed for desktop users with a clean and modern interface.

## Demo

Check out the [DEMO]() to see the project in action!

## Features

- **Expense Tracking**: Record and categorize your expenses.
- **Income Management**: Track income sources and manage budgets.
- **Visual Reports**: Interactive graphs and charts for expense tracking and budgeting.
- **Standalone Components**: Angular's standalone components for better modularity and reusability.
- **Responsive Layout**: Clean and user-friendly interface optimized for desktop.
- **RxJS**: For managing asynchronous data streams and state changes.

## Technologies Used

- **Framework**: Angular 17+ with standalone components
- **UI Design**: Angular Material
- **Styling**: SCSS
- **State Management**: RxJS for handling asynchronous operations
- **Backend**: JSON Server for mock API

## Getting Started

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/vlesia/home-accounting-app.git

   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd home-accounting-app

   ```

3. **Install Dependencies**:

   ```bash
   npm install

   ```

4. **To run the project in your browser**:

Run the following command to start both the frontend and the backend:

```bash
npm run start

```

## Folder Structure

The project follows a standard folder structure for better organization:

```
src/
├── app/
│   ├── auth/          # Authentication logic
│   ├── config/        # App configuration
│   ├── guards/        # Route protection
│   ├── layout/        # Shared layout components (e.g., header, footer)
│   ├── pages/         # Application pages 
│   ├── services/      # Reusable services
│   ├── app.component.*  # Root component files
│   ├── app.config.ts     # App configuration providers
│   └── app.routes.ts     # Application routes
├── environments/       # Environment-specific settings
├── styles/             # Global styles
├── index.html          # Entry point
├── main.ts             # Main application file
├── styles.scss         # Main styles

```
