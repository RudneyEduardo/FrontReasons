import React, { useEffect, useState } from 'react';
import './App.css';


function App() {
  const [ reasonsArr, setReasonsArr ] = useState<Array<Reason>>([])
  const removeViewedReason = () => {
    fetch('https://reasonssite.herokuapp.com/' + reasonsArr[0].Id,
                {
                  method: "PUT",
                  body: JSON.stringify({visited: 'true'}),
                  headers: {"Content-type": "application/json; charset=UTF-8"}
                })
  }

  const getNewReason = () => {
      removeViewedReason()
      getReason()
  }

  const getReason = () => {
    fetch('https://reasonssite.herokuapp.com/all')
      .then(res =>
        res.json()
          .then(data => {
            let randomNumber:number =  Math.floor(Math.random() * data.length);
            console.log(data)
            for(let i = 0; i < data.length; i++){
              if(randomNumber === i){
                setReasonsArr([
                  { 
                    Id: data[i]["_id"], 
                    Reason: data[i].reason,
                    Visited: data[i].visited
                  }
                ])
                
              }
            }
          }))   
  }

  useEffect(() => {
    console.table(reasonsArr)
  },[reasonsArr])
  return (
    <div className="App">
      <header className="App-header">
        { reasonsArr.length === 0 ? <h2>Aperte Para Procurar Motivo</h2> : reasonsArr.map( (reason) => <p>{ reason.Reason }</p>) } 
        <div>
        {reasonsArr.length > 0 ? <button onClick={getNewReason}>Novo Motivo</button> : <button onClick={getReason}>Obter um Motivo</button>}
        </div>
      </header>
    </div>
  );
}

export default App;
