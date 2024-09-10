import {Todo } from './App'
import React from 'react'
import TodoItem from './TodoItem';


interface TodoListProps {
    todos: Todo [];
    deleteTodo: (id:number) => void;
    updateTodo:(id:number,text:string) => void;
    toggleTodo:(id:number) => void;
}

const TodoList:React.FC<TodoListProps> = ({todos,deleteTodo,updateTodo,toggleTodo}) => {
  return (
    <div className='p-4 m-4'>
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo.id} 
                todo={todo} 
                deleteTodo={deleteTodo} 
                updateTodo={updateTodo}
                toggleTodo={toggleTodo}  />
            ))}
        </ul>
    </div>
  )
}

export default TodoList