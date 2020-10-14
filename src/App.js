import React from 'react';
import _ from 'lodash'
import set from 'lodash/fp/set'
import './App.css';

function App() {
  const [state, setState] = React.useState(_.range(30).reduce((acc, index) => {
    _.set(acc, `${index}.label`, index)
    return acc
  }, {}))
  return (
    <div className="app">
      {_.range(30).map((index) => {
        return (
          <div>
            <input 
              value={_.get(state,`${index}.label`, '')}
              onChange={(event) => {
                const value = event.target.value
                setState(set(`${index}.label`, value))
              }}
            />
            <input 
               value={_.get(state,`${index}.value`, '')}
               onChange={(event) => {
                 const value = event.target.value
                 setState(set(`${index}.value`, value))
               }}
            />
            <button onClick={() => setState(set(`${index}.value`, ''))}>x</button>
          </div>
        )
      })}
      <button 
        onClick={() => {
          fetch(`http://localhost:300`, {
            method: 'POST',
            body: JSON.stringify(state)
          })
            .then((res) => {
              if (!res.ok) {
                alert(res.status)
              } else {
                alert ('All good!')
              }

            })
            .catch((error) => alert(error.message))
        }}
      >
        submit
      </button>
      <button
        onClick={() => setState(_.range(30).reduce((acc, index) => {
          const label = _.get(state, `${index}.label`)
          _.set(acc, `${index}.label`, label)
          return acc
        }, {}))}
      >
        clear
      </button>
    </div>
  );
}

export default App;
