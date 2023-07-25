import { useEffect, useState } from 'react';
import './App.css';
import Icons from './components/Icons'


const api = { 
  key:"c5f590d57553377e83cc179157aa83f6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [search, setSearch] = useState('roma')
  const [searchInput, setSearchInput] = useState('');

  const [values, setValues] = useState({

  name: '',
  main: {
    temp: 0,
    temp_min: 0,
    temp_max: 0,
  },
  weather: [{ main: '', description: '' }],
  sys: {
    country: '',
  },
  });
  const [icon, setIcon] = useState('')

  const searchPressed = () => {
    getData();
  };

  const [ darkMode, setDarkMode] = useState(false)

  function toggleDarkMode(){ 
    setDarkMode(!darkMode);
   }
   if (darkMode){ 
    document.body.classList.add('dark-mode');
   } else { 
    document.body.classList.remove('dark-mode')
   }
   function handleKeyDown(event){ 
    if (event.key === "Enter") { searchPressed();
    }
   } 

   const [unitType, setUnitType] = useState('metric');

   const toggleUnitType = () => {
    setUnitType(prevUnitType => (prevUnitType === 'metric' ? 'imperial' : 'metric'));
  };

  useEffect(() => {
    getData();
  }, [search, unitType]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    if (e.key === 'Enter') {
      setSearch(e.target.value);
    }
  };

  const getData = async () => {
    const URL = `${api.base}weather?q=${search}&units=metric&appid=${api.key}`;

    await fetch(URL)
      .then(response => response.json())
      .then( data => {
        if(data.cod >= 400) {
          setValues(false)
        }else{         
          setIcon(data.weather[0].main)
          setValues(data)
        }        
      })
      .catch(error => {
        console.log(error)
      })
  }

  
  useEffect(()=>{
    getData()
  },[search]) 

  return (
    <>
      <div>
      <label className="switch">
              <input
                 type="checkbox"
                 checked={darkMode}
                 onChange={toggleDarkMode}
              />
            <span className="slider-round"></span>
            </label>

        <div className="container">
          <div className={`container${darkMode ? "dark-mode" : ""}`}>
     
           

               <h2>React Weather App</h2>

            <div className='row'>
               <input className="text"
              value={searchInput} 
              onKeyDown={handleSearch}
              onChange={handleSearch} 
              type="text"          
                   
               />
               <button  className='touchpad'  onClick={ searchPressed}> <i className='bx bx-search-alt-2'    ></i></button> 

              
            </div>
          </div>

          <div className='card'>
              {(values.name) ? (
              <div className='card-container'>
                <h1 className='city-name'>{values.name}, {values.sys.country}</h1>
                <p className='temp'>{values.main.temp.toFixed(0)}&deg;</p>
                <p className='description'>{values.weather[0].description}</p>
                <img className='icon' src={Icons(icon)} alt="icon-weather" />
                
                <div className='card-footer'>
                  <p className='temp-max-min'>{values.main.temp_min.toFixed(0)}&deg;  |  {values.main.temp_max.toFixed(0)}&deg;</p>
                </div>
              </div>

              
                 ) : (
                     <h1>{"City not found"}</h1>
                 )}         
            </div>
            <button className="unit-button" onClick={toggleUnitType}>
                {unitType === 'metric' ? 'ºC' : 'ºF'}
              </button>
          </div>
      </div>
    </>  
  );
}

export default App