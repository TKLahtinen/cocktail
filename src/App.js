import './style/style.css';
import { useState, useRef } from 'react';

const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
const URLRandom = 'https://www.thecocktaildb.com/api/json/v1/1/random.php'

function App() {
  const [data, setData] = useState({})
  const [ingredientsList, setIngredientsList] = useState([])
  const coctailName = useRef()

  // Palauttaa ainekset ja mitat sivulle järjestyksessä
  function List(){
    return ingredientsList.map((p ,i) => {
      return (<div key={i}>{p.ingredient}  {p.measure}</div>)
    })
  }

  // Funktio joka kasittelee random klikkauksen
  function handleRandom(e){
    e.preventDefault()
    
      fetch(URLRandom)
      .then(response => response.json())
      .then(
        (response) => {
          const drink = response.drinks[0]

          setData(drink)
          // Tyhja lista aineksille ja mitoille jotka kaydaan lapi for loopilla
          let ingredients = []
          for(let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`]
            const measure = drink[`strMeasure${i}`]
             ingredients.push({ ingredient, measure })
            
          }
          setIngredientsList(ingredients)
        },  (error) => {
            alert(error)
          }
        )
    }

  // Funktio joka käsittelee haku klikkauksen
  function handleSearch(e){
    e.preventDefault()
    const name = coctailName.current.value
    const address = URL + name
    
    if(name !== ''){
      fetch(address)
      .then(response => response.json())
      .then(
        (response) => {
          const drink = response.drinks[0]

          setData(drink)
          
          let ingredients = []
          for(let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`]
            const measure = drink[`strMeasure${i}`]
             ingredients.push({ ingredient, measure })
            
          }
          setIngredientsList(ingredients)
        },  (error) => {
            alert(error)
          }
        )
    }
    else{
      alert('You must search something!')
    }
  }

  return (
    <>
    <div className='container text-center border border-dark rounded'>
        <h2>Coctail Finder</h2>
        <input type="text" ref={coctailName} placeholder='Search something'/>
        <div className='d-flex justify-content-evenly m-3'>
          <button onClick={handleSearch} className='btn btn-success'>Search</button>
          <button onClick={handleRandom} className='btn btn-danger'>Random</button>
        </div>
        <div>
          <h2>{data.strDrink}</h2>
          <h3>Ingredients</h3>
          <hr className='my-2' />
          {List()}
          <h3>Instructions</h3>
          <hr />
          <p>{data.strInstructions}</p>
        </div>
    </div>
    </>
  );
}

export default App;