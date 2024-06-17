import { useEffect, useState } from 'react'
import './App.css'
import { ProductList } from './component/ProductList'
import { BasketList } from './component/BasketList'

function App() {
  const [book, setBook] = useState([])
  const [basket, setBasket] = useState([])
  //const [saleApplied, setSaleApplied] = useState(false)
  const [total, setTotal] = useState(0)


  useEffect(()=>{
    fetch("http://localhost:3004/books")
    .then(res => res.json())
    .then(res=> {
      setBook(res)
    }), []
})
  
  const moveToCart = id =>{
    const found = book.find(x => x.id === id)
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
     //setSaleApplied(true)
  }

  useEffect(()=>{
    setTotal(basket.reduce((acc, item) => acc + item.price * item.count, 0))
  }, [basket])
  
  return (
    <>
      <div className = "row">
        <ProductList items = {book} onMove = {moveToCart}/>
        <BasketList items = {basket} 
              onAdd = {addToCart} 
              onDown = {minusFromCart} 
              onDelete = {deleteFromCart} 
              onSale={onSale} 
              //setSaleApplied={saleApplied}
              total = {total}
              />
        
      </div>
    </>
  )
}

export default App
