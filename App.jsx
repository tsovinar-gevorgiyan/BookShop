import { useState } from 'react'
import './App.css'
import { ProductList } from './component/ProductList'
import { BasketList } from './component/BasketList'

function App() {
  const [basket, setBasket] = useState([])
  const [saleApplied, setSaleApplied] = useState(false)

  const [products, setProducts] = useState([
    {id:101, title: "Business", price: 400, photo: "https://m.media-amazon.com/images/I/51njCf7LElL._SX342_SY445_.jpg"},
    {id:102, title: "Economics", price: 340, photo: "https://m.media-amazon.com/images/I/51BacaJcneL._SX342_SY445_.jpg"},
    {id:103, title: "Politics", price: 420, photo: "https://m.media-amazon.com/images/I/71vlj9Vrs-L._SY522_.jpg"},
    {id:104, title: "Religious", price: 780, photo: "https://m.media-amazon.com/images/I/51yy2SZWumL._SX342_SY445_.jpg"},
    {id:105, title: "History", price: 670, photo: "https://m.media-amazon.com/images/I/51vid9LTFuL._SX342_SY445_.jpg"},
    {id:106, title: "Movies", price: 940, photo: "https://m.media-amazon.com/images/I/51dNGV-pNfL._SX342_SY445_.jpg"}
  ])  

  const moveToCart = id =>{
    const found = products.find(x => x.id === id)
    const foundInBasket = basket.find(x => x.id === id)

    if (foundInBasket ) {
      setBasket(basket.map(x => 
        x.id === id ? {...x, count: x.count + 1} : x
      ))
    } else {
      setBasket([...basket, {...found, count: 1 }])
    }
  }
  
  const addToCart = id => {
    setBasket(basket.map(x => 
     x.id === id ? {...x, count: x.count + 1} : x
    ))
  } 

  const minusFromCart = id => {
    setBasket(basket.map(x => 
     x.id === id ? {...x, count: (x.count === 1 ? x.count : x.count - 1)} : x
    ))
  } 

  const deleteFromCart = id =>{
    setBasket(basket.filter(x => x.id !== id))
  }

  const onSale = () => {
    setBasket(basket.map(x => 
     x.count >= 3 ? {...x, count: x.count-1} : x
     ))
     setSaleApplied(true)
  }
  
  return (
    <>
      <div className = "row">
        <ProductList items = {products} onMove = {moveToCart}/>
        <BasketList items = {basket} 
              onAdd = {addToCart} 
              onDown = {minusFromCart} 
              onDelete = {deleteFromCart} 
              onSale={onSale} 
              setSaleApplied={saleApplied}/>
        
      </div>
    </>
  )
}

export default App
