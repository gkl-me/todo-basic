import {Todo} from './App'
import { Checkbox } from './components/ui/checkbox';
import { Button } from './components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './components/ui/dialog'
import { Input } from './components/ui/input';

import React,{ useRef, useState } from 'react';

interface TodoItemProps {
    todo: Todo;
    deleteTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
    updateTodo: (id: number, text: string) => void;
  }


const TodoItem:React.FC<TodoItemProps> = ({deleteTodo,updateTodo,todo,toggleTodo}) =>{

    const enterRef = useRef<HTMLButtonElement>(null)

    const handleKey = (event:React.KeyboardEvent) =>{
       if(event.key=='Enter'){
            enterRef.current?.click();   
       } 
    }

    const [dialogOpen,setDialogOpen] = useState(false)
    const [edit,setEdit] = useState(todo.text)

    const openDialog = () => {
        if(!todo.isCompleted){
            setEdit(todo.text)
            setDialogOpen(true)
        }
        
    }

    const saveTodo = () => {
        if(edit){
            updateTodo(todo.id,edit)
            setDialogOpen(false)
        }
    }

    return(
        <>
        <div className={`flex justify-between m-2 p-4 border rounded ${!todo.isCompleted ? 'bg-black' : 'bg-gray-500'}`}>
        <div className={`flex gap-2 items-center`}>
            <Checkbox 
                checked={todo.isCompleted} 
                onCheckedChange={() => toggleTodo(todo.id)}/>
            <span className={todo.isCompleted?'line-through':''}>{todo.text}</span>
            </div>
            <div>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen} >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Todo</DialogTitle>
                        </DialogHeader>
                        <Input
                            value={edit}
                            onKeyDown={handleKey}
                            onChange={(e) => setEdit(e.target.value)}
                        />
                        <DialogFooter>
                            <Button ref={enterRef} onClick={saveTodo}>Save</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
                <div className='flex gap-2'>
                    <Button size='sm' onClick={() => openDialog()}>Edit</Button>
                    <Button size='sm' onClick={() => deleteTodo(todo.id)}>Delete</Button>
                </div>
        </div>
        </>
    )
}

export default TodoItem