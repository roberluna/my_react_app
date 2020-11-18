import React,{useEffect} from 'react'
import {db} from './firebase.js'

function App() {

  const [todos, setTodos] = React.useState([])

   useEffect(()=>
        listarDatos()
    )
     const listarDatos = async () => {
                const data = await db.collection("todos").get();
                const todos = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setTodos(todos)
     }
    
  return (
    <div className="container">
      <h1>Todos</h1>
      <ul className="list-group">
            {
                todos.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.todo}</span>
                    <button 
                        className="btn btn-danger btn-sm float-right"
                    >
                        Eliminar
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                    >
                        Editar
                    </button>
                </li>
                ))
            }
            </ul>
    </div>
  );
}

export default App;
