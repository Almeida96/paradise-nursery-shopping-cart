import {useDispatch, useSelector} from 'react-redux';
import {selectItems, selectCount, selectTotal, updateQuantity, removeItem} from '../store/CartSlice';

export default function CartItem({navigate}) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const count = useSelector(selectCount);
  const total = useSelector(selectTotal);
  return <main className="container">
    <header className="page-head"><small>YOUR BASKET</small><h1>Your plant cart.</h1><p>{count} plants in your basket</p></header>
    {!items.length ? <div className="empty"><h2>Your cart is empty.</h2><button className="primary" onClick={() => navigate('products')}>Explore plants →</button></div> :
      <div className="cart-layout">
        <div>{items.map(plant => <article className="cart-row" key={plant.id}>
          <img src={plant.image} alt={plant.name} />
          <div><h3>{plant.name}</h3><p>Unit price: ${plant.price.toFixed(2)}</p>
            <div className="quantity">
              <button aria-label={'Decrease ' + plant.name} onClick={() => dispatch(updateQuantity({id: plant.id, quantity: plant.quantity - 1}))}>−</button>
              <span>{plant.quantity}</span>
              <button aria-label={'Increase ' + plant.name} onClick={() => dispatch(updateQuantity({id: plant.id, quantity: plant.quantity + 1}))}>+</button>
            </div>
            <button className="text-button" onClick={() => dispatch(removeItem(plant.id))}>Remove</button>
          </div><strong>${(plant.price * plant.quantity).toFixed(2)}</strong>
        </article>)}</div>
        <aside className="summary">
          <h2>Order summary</h2>
          <p>Items: {count}</p><p>Shipping calculated at checkout</p>
          <h2>Total: ${total.toFixed(2)}</h2>
          <button className="primary" onClick={() => window.alert('Coming Soon!')}>Checkout</button>
          <button className="text-button" onClick={() => navigate('products')}>← Continue shopping</button>
        </aside>
      </div>}
  </main>;
}
