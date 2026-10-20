import {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectCount} from './store/CartSlice';
import AboutUs from './components/AboutUs';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

export default function App() {
  const [page, setPage] = useState('home');
  const count = useSelector(selectCount);
  const navigate = nextPage => { setPage(nextPage); window.scrollTo(0, 0); };
  return <>
    <header className="site-header"><div className="container nav">
      <button className="logo" onClick={() => navigate('home')}>✳ paradise nursery.</button>
      <nav aria-label="Main navigation">
        <button onClick={() => navigate('home')}>Home</button>
        <button onClick={() => navigate('products')}>Plants</button>
        <button onClick={() => navigate('cart')} aria-label={'Cart with ' + count + ' items'}>Cart <span className="count">{count}</span></button>
      </nav>
    </div></header>
    {page === 'home' && <>
      <section className="hero"><div className="container hero-content">
        <small>BRING THE OUTSIDE IN</small>
        <h1>Grow a little<br/><em>happiness.</em></h1>
        <p>Beautiful houseplants, thoughtfully chosen for the spaces you call home.</p>
        <button className="light-button" onClick={() => navigate('products')}>Get Started ↗</button>
      </div></section>
      <div className="container">
        <div className="features">
          <div><h3>✳ Curated with care</h3><p>Plants chosen for beauty and resilience.</p></div>
          <div><h3>☀ For every space</h3><p>From bright corners to cozy rooms.</p></div>
          <div><h3>♡ Made to grow</h3><p>Simple choices for happier homes.</p></div>
        </div>
        <AboutUs />
      </div>
    </>}
    {page === 'products' && <ProductList navigate={navigate} />}
    {page === 'cart' && <CartItem navigate={navigate} />}
    <footer><div className="container">✳ paradise nursery. <span>Grow something good.</span></div></footer>
  </>;
}
