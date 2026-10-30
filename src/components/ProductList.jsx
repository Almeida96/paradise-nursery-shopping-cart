import {useDispatch, useSelector} from 'react-redux';
import {addItem, selectItems} from '../store/CartSlice';

import {plants} from '../catalog.js';
export {plants} from '../catalog.js';

export default function ProductList({navigate}) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const categories = [...new Set(plants.map(plant => plant.category))];
  return <main className="container">
    <header className="page-head"><small>THE COLLECTION</small><h1>Find your new favorite plant.</h1><p>Bring a little more nature into your everyday.</p></header>
    {categories.map(category => <section key={category}>
      <h2>{category}</h2>
      <div className="grid">{plants.filter(plant => plant.category === category).map(plant => {
        const inCart = items.some(item => item.id === plant.id);
        return <article className="product" key={plant.id}>
          <img src={plant.image} alt={plant.name} />
          <div className="product-body">
            <div className="product-title"><h3>{plant.name}</h3><strong>${plant.price.toFixed(2)}</strong></div>
            <button className="primary" disabled={inCart} onClick={() => dispatch(addItem(plant))}>{inCart ? 'Added to cart ✓' : 'Add to cart +'}</button>
          </div>
        </article>;
      })}</div>
    </section>)}
    <button className="text-button" onClick={() => navigate('cart')}>View cart →</button>
  </main>;
}
