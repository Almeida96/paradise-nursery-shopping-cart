# Paradise Nursery Shopping Cart

A responsive plant shopping application built with React, Vite and Redux Toolkit.

## Features
- Landing page with a background image and Get Started button
- Six unique plants across three categories
- Add-to-cart buttons that disable when a plant is already in the cart
- Shopping cart badge displaying total quantity
- Redux state management with `addItem`, `removeItem`, and `updateQuantity`
- Increase/decrease quantities, remove products, and calculate totals
- Navigation between Home, Plants and Cart
- Checkout placeholder ("Coming Soon!")

## Run locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

## Project structure

- `src/App.jsx`: landing page and navigation
- `src/App.css`: layouts, responsive styling and hero background
- `src/components/AboutUs.jsx`: company information
- `src/components/ProductList.jsx`: categorized plant listings
- `src/components/CartItem.jsx`: interactive shopping cart
- `src/store/CartSlice.jsx`: Redux cart slice
- `src/store/store.js`: Redux store setup

## Tech stack
React, Redux Toolkit, React Redux, Vite, CSS.
