import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { fetchData } from './slice/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './slice/CartSlice';
import { useNavigate } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const {productList,status} = useSelector(state => state.products);
  const cartList = useSelector(state => state.carts.cartList)
  const navigate = useNavigate()
  useEffect(() => {
    if (status === 'idel') {
      dispatch(fetchData());
    }
  }, [status, dispatch]);
  
  return (
    <>
    <div className='header'>
    <h1>shopping application</h1>
    <button onClick={()=>navigate('/cart')}>Cart ({
    cartList.reduce((acc,curr)=> acc + curr.quantity,0)
    })</button>
    <button onClick={()=>navigate('/todo')}>TodoApp</button>
    </div>
    <div className='productList'>
      {
        productList.map(data=>(
          <div id={data.id} className='productCard'>
            <img src={data.image} alt='img' />
            <h5>{data.title.length>10 ? data.title.substring(0,25).concat('...') : data.title}</h5>
            <h5>{data.price}</h5>
            <button onClick={()=>{dispatch(addToCart(data))}}>Add to cart</button>
          </div>
        ))
      }
    </div>
    </>
  );
}

export default App;
