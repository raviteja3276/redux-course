import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { decreaseQuantity, increaseQuantity, removeAllCartItems, removeCart } from './slice/CartSlice'
function Cart() {
  const navigate = useNavigate()
  const cartList = useSelector(state => state.carts.cartList)
  const dispatch = useDispatch()

  return (
    <>
    <div className='header'>
    <h1>shopping application</h1>
    <div>
    <button onClick={()=>navigate('/')}>Home</button>
    <button onClick={()=>{dispatch(removeAllCartItems([]))}}>Remove All</button>
    </div>
    </div>
    {
    cartList.length > 0 ?
      <div className="cart-container">
        <div className="cart-items-container">
          <div className="cart-header cart-item-container">
            <div className="cart-item">Item</div>
            <div className="item-price">Price</div>
            <div className="quantity">Quantity</div>
            <div className="total">Total</div>
            <div className="remove">Remove</div>

          </div>
          {
            cartList.map(data => (
              <div id={data.id} className="cart-item-container">
                <div className="cart-item">
                  <img src={data.image} alt={data.title} />
                  <div>
                    <h3>{data.title}</h3>
                  </div>
                </div>
                <div className="item-price">${data.price}</div>
                <div className="item-quantity">
                  <button onClick={() => {dispatch(decreaseQuantity(data))}}>
                    -
                  </button>
                  <span>{data.quantity || 1}</span>
                  <button onClick={() => {dispatch(increaseQuantity(data))}}>
                    +
                  </button>
                </div>
                <div className="item-total">${data.quantity * data.price}</div>
                <div className="item-delete">
                  <button onClick={() => {dispatch(removeCart(data))}}>Remove Item</button>
                </div>

              </div>
            ))
          }

          <div className="cart-header cart-item-container">
            <div></div>
            <div></div>
            <div></div>
            <div className="total">
              ${
                cartList.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
              }
            </div>
          </div>
        </div>
      </div>
     :
    
    <h1>There is not cart items</h1>
    }
    </>
  )
}

export default Cart


