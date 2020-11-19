import React,{useEffect} from 'react'
import {db} from './firebase.js'

function App() {

  const [todos, setTodos] = React.useState([])
  const [todo, setTodo] = React.useState('')
  const [modoEdicion, setModoEdicion] = React.useState(false)
  const [id, setId] = React.useState('')

   useEffect(()=>
        listarDatos()
    )
     const listarDatos = async () => {
                const data = await db.collection("todos").get();
                const todos = data.docs.map(doc => ({id: doc.id, ...doc.data()}))
                setTodos(todos)
     }

      const agregarTodo = async (e) => {
         e.preventDefault()
          if(!todo.trim()){
              console.log('sin texto')
              return
          }

        try {
          const firebaseTodo = await db.collection('todos').add({
                todo: todo,
            })

            const nuevoTodoObject = {
                name: todo,
                //otro_campo: estatus,
            }

            setTodos([...todos, {id: firebaseTodo.id, ...nuevoTodoObject }])
            setTodo('')

        } catch(error){
          console.log(error)
        }

     }

     const activarEdicion = (item) => {
          setModoEdicion(true)
          setTodo(item.todo)
          setId(item.id)
      }


      const editarTodo = async (e) => {
          e.preventDefault()
          if(!todo.trim()){
              console.log('sin texto')
              return
          }
          try {
            await db.collection('todos').doc(id).update({
              todo: todo
            })
            const arregloEditado = todos.map(item => (
              item.id === id ? {id: item.id, name: todo} : item
            ))
            setTodos(arregloEditado)
            setModoEdicion(false)
            setId('')
            setTodo('')
          } catch (error) {
            console.log(error)
          }
      }


      const eliminarTodo = async (id) => {
          try {
            await db.collection('todos').doc(id).delete()
            const filtro = todos.filter(item => item.id !== id)
            setTodos(filtro)
          } catch (error) {
            console.log(error)
          }
      }
    
  return (
    <div className="container">
      <h1>Todos</h1>
      
        <h2>
          {
            modoEdicion ? 'Editar todo' : 'Agregar todo'
          }
        </h2>
          

      {todo}
      {/* <form onSubmit={agregarTodo}> */}
      <form onSubmit={ modoEdicion ? editarTodo : agregarTodo }>
          <div className="form-group">
            <label>Todo</label>
            <input type="text" className="form-control" value={todo} onChange={e => setTodo(e.target.value)} placeholder="Ej. Hacer tarea" />
          </div>
          {/* <button type="submit" className="btn btn-primary">Agregar</button> */}
          <button type="submit" className="btn btn-primary">{ modoEdicion ? 'Editar' : 'Agregar' }</button>
          
      </form>  
                
      <ul className="list-group">
            {
                todos.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span>{item.todo}</span>
                    <button 
                        className="btn btn-danger btn-sm float-right"
                        onClick={() => eliminarTodo(item.id)}
                    >
                        Eliminar
                    </button>
                    <button 
                        className="btn btn-warning btn-sm float-right mr-2"
                        onClick={() => activarEdicion(item)}
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
