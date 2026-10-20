import {useDispatch, useSelector} from 'react-redux';
import {addItem, selectItems} from '../store/CartSlice';

const image = id => 'https://images.unsplash.com/' + id + '?auto=format&fit=crop&w=700&q=80';
export const plants = [
  {id: 1, name: 'Monstera Deliciosa', category: 'Statement Plants', price: 35, image: image('photo-1501004318641-b39e6451bec6')},
  {id: 2, name: 'Fiddle Leaf Fig', category: 'Statement Plants', price: 49, image: image('photo-1485955900006-10f4d324d411')},
  {id: 3, name: 'Snake Plant', category: 'Easy Care', price: 22, image: image('photo-1593482892290-f54927ae2b7e')},
  {id: 4, name: 'Golden Pothos', category: 'Easy Care', price: 18, image: image('photo-1416879595882-3373a0480b5b')},
  {id: 5, name: 'Peace Lily', category: 'Flowering Favorites', price: 29, image: image('photo-1497250681960-ef046c08a56e')},
  {id: 6, name: 'Anthurium', category: 'Flowering Favorites', price: 32, image: image('photo-1463320726281-696a485928c7')}
];

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
