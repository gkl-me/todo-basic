import React, {useEffect, useRef, useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import TodoList from "./TodoList";
import { ThemeProvider } from "@/components/theme-provider"



export interface Todo {
  id:number,
  text:string,
  isCompleted:boolean
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [newTodo,setNewTodo] = useState("");

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])

  const enterRef= useRef<HTMLButtonElement>(null)

  const handleKey = (event:React.KeyboardEvent) => {
    if(event.key == 'Enter'){
      enterRef.current?.click();
    }
  }

  const addTodo = () => {
    if(newTodo.trim() != ""){
      const newItem:Todo = {id:Date.now(),text:newTodo,isCompleted:false}
      setTodos(t => [...t,newItem]);
      setNewTodo("");
    }
  }

  const deleteTodo = (id:number) => {
    setTodos(t => t.filter((todo)=> todo.id!=id))
  }

  const toggleTodo = (id:number) => {
    setTodos(t => t.map((todo) => (todo.id==id ? {...todo,isCompleted:!todo.isCompleted }: todo)))
  }

  const updateTodo = (id:number,text:string) => {
    setTodos(t => t.map(todo => (todo.id === id ? { ...todo, text } : todo)));
  }

  let message;
  if (todos.every(todo => todo.isCompleted)) {
    message = <p className="font-bold text-green-500 flex place-content-center">All Tasks Completed</p>;
  }
  if(todos.length==0){
    message = <p className="font-bold text-red-500 flex place-content-center">No 
    Task found</p>;
  }


  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="  rounded shadow-lg shadow-gray-700  border  my-14 mx-auto min-h-10 p-4 justify-between  max-w-md">
    <div className="">
      <h1 className="text-center text-2xl font-bold">Todo App</h1>
      <div className="flex justify-between gap-4 p-2 m-4">
        <Input
          type="text"
          className="bg-slate-800"
          placeholder="Enter Todo"
          value={newTodo}
          onChange = {(e) => setNewTodo(e.target.value)}
          onKeyDown={handleKey}
        ></Input>
        <Button
          onClick={addTodo}
          ref={enterRef}
        >Add</Button>
      </div>
      
    </div>
    <div>
      {
        message? message : ""
      }
        <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
      </div>
    </div>
    </ThemeProvider>
    </>
  )
}



export default App