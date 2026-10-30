# Paradise Nursery

[![CI](https://github.com/Almeida96/paradise-nursery-shopping-cart/actions/workflows/ci.yml/badge.svg)](https://github.com/Almeida96/paradise-nursery-shopping-cart/actions/workflows/ci.yml)

A React and Redux shopping-cart exercise based on the IBM Paradise Nursery assignment. Browse six sample plants, adjust a basket, reload it from local storage, and export an order summary as JSON.

This is a demo store. It does not place orders, take payment or calculate shipping.

## Run

Requires Node.js 22.12+ and npm:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite. For a production build, run `npm run build` and `npm run preview`.

## Cart behavior

- Each catalog product appears once; quantities range from 1 to 99.
- Decreasing a quantity to zero removes the item.
- Totals are calculated in integer cents before formatting.
- The browser saves product IDs and quantities. Prices and names always come from the current catalog.
- Invalid or outdated stored data is ignored. If storage is unavailable, the cart still works for the current page session.
- **Export order JSON** downloads line items and a reconciled total, with `demo: true`. No customer details are requested.

The JSON export is a local quote snapshot, not proof of purchase. Prices are illustrative and use USD. Product images are loaded from Unsplash; the cart itself makes no server requests.

## Development

```sh
npm test
npm run build
```

[Catalog](src/catalog.js), [cart model](src/store/cart.js), [storage adapter](src/store/store.js) and [cart UI](src/components/CartItem.jsx) are separate. Tests exercise malformed storage, price tampering, quantity limits and order totals.

When changing cart behavior, add a regression case. For UI changes, verify keyboard navigation, an empty cart, reloading a saved cart and exporting from a narrow viewport. Dependency versions are recorded in `package-lock.json`.

The original Redux assignment structure is retained. The former checkout placeholder has been replaced with the local order export.
