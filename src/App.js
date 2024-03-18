import { useEffect, useState } from "react";
import "./App.css";
import bg1 from "./assets/bg-desktop-dark.jpg";
import { IoIosSunny } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { IoMoon } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

function App() {

  //============State variables============
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState();
  const [incompleteCount, setIncompleteCount] = useState([]);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('dark');

  //============Adding todos==============
  const handleTodo = (e) => {
    if(e.target.value !== ""){
      if(e.key === 'Enter'){
        setTodos((prevTodos) => [...prevTodos, {text: e.target.value, status: 'incomplete', id: Date.now()}])
        setTodoText('');
      }
    }
  }

  //==========Filtering inComplete todos==========
  useEffect(() => {
    const inComplete = todos.filter((item) => item.status == "incomplete");
    setIncompleteCount(inComplete);
    console.log(todos);
  }, [todos])


  //=============Marking as complete / incomplete==========
  const changeStatus = (item, index) => {
    setTodos(prevTodos => prevTodos.map(todo => (todo == item ? {...todo, status: todo.status === "completed" ? "incomplete" : "completed"} : todo)));
  }


  //==============Filtering todos based on status===========
  const filteredTodos = todos.filter((item) => {
    if(filter == 'active') return item.status === 'incomplete';
    if(filter == 'completed') return item.status === 'completed';
    else return true;
  })


  //===========Clearing completed todos=========
  const clearCompleted = () => {
    const filtered = todos.filter((item) => item.status !== "completed");
    setTodos(filtered);
  }


  //==============Changing theme to "Dark" and "Light" mode=======
  const changeTheme = () => {
    setTheme(prevTheme => prevTheme == 'light' ? 'dark' : 'light');
  }


  //===============Deleting a todo==================
  const deleteTodo = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  }


  //================================JSX Starts====================================
  return (
    <div className={`w-full h-screen ${theme == "dark" ? "bg-[#171822]" : "bg-[#e4e4e4]"} `}>
      <div className="bg-coloured relative">
        <img src={bg1} alt="" className="w-full h-44" />
      </div>
      <div className="main w-full flex items-center flex-col justify-center absolute top-9">
        <div className="header w-full max-w-xl flex items-center justify-between px-7 sm:px-2">
          <h1 className="text-[22px] text-slate-100 font-bold tracking-[7px]">
            TODO
          </h1>
          {theme === 'dark' ? (
            <IoIosSunny onClick={changeTheme} className="w-5 h-5 text-slate-100 cursor-pointer" />
          ) : (
            <IoMoon onClick={changeTheme} className="w-5 h-5 text-slate-100 cursor-pointer" />
          )}
        </div>
        <div className="todo-container w-full max-w-xl px-7 sm:px-2">
          <div className="input relative">
            <input type="text" value={todoText} onChange={(e) => setTodoText(e.target.value)} onKeyDown={(e) => handleTodo(e)} placeholder="Create a new todo..." className={`w-full mt-6 mb-2 py-3 px-5 pl-10 text-sm ${theme == "dark" ? "bg-[#212230] text-slate-200" : "bg-[#eeeeee] text-gray-700"} shadow-[0_20px_30px_-14px_rgba(0,0,0,0.8)] outline-none rounded-[4px] placeholder-[#7a7e8d]`}/>
            <div className="w-4 h-4 border-[1px] border-gray-700 rounded-full absolute top-[38px] left-3 cursor-pointer"></div>
          </div>
          <div className={`todos mt-3 ${theme == "dark" ? "bg-[#212230]" : "bg-[#eeeeee]"} rounded-sm shadow-[0_35px_60px_-15px_rgba(0,0,0,0.5)] overflow-y-auto max-h-[25.4rem]`}>
           {filteredTodos.length > 0 && filteredTodos.map((item, index) => (
             <div key={index} className="todo relative cursor-pointer group" onClick={()=> changeStatus(item, index)}>
             <p className={`w-full overflow-ellipsis overflow-hidden ${theme == "dark" ? "text-slate-300" : "Text-slate-800"} py-3 px-5 pl-10 text-sm  outline-none border-b-[1px] leading-5 border-gray-700 ${item.status == "completed" ? "line-through text-[#596177]" : ''} `}>
               {item.text}
             </p>
             <div className={`w-4 h-4 border-[1px] border-gray-700 group-hover:border-gray-400 rounded-full absolute top-[14px] left-3 ${item.status === "completed" ? "bg-gradient-to-b from-blue-500 to-[#ab60f2]" : ""}`}>
             {item.status === "completed" && (
              <FaCheck className="text-white pb-1 pt-[3px] pr-[1px] font-bold" />
             )}
             </div>
             <div className="delete-todo absolute top-[13px] right-4">
              <RxCross2 onClick={()=> deleteTodo(item.id)} className="text-xl text-gray-500 hover:text-red-400" />
             </div>
           </div>
           ))}
          </div>
          {filteredTodos.length > 0 ? (
            <>
            <div className={`footer ${theme == "dark" ? "bg-[#212230]" : "bg-[#eeeeee]"} py-4 sm:py-3 px-3 flex items-center justify-between whitespace-nowrap`}>
            <p className="text-xs text-gray-500">{incompleteCount.length} items left</p>
            <div className="filters hidden sm:flex items-center justify-center gap-[10px]">
              <button className={`${filter === "all" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('all')}>All</button>
              <button className={`${filter === "active" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('active')}>Active</button>
              <button className={`${filter === "completed" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('completed')}>Completed</button>
            </div>
            <button className="text-xs text-gray-500 hover:text-red-500" onClick={clearCompleted}>Clear Completed</button>
          </div>
          <div className={`footer-mobile flex sm:hidden w-full items-center justify-center gap-7 mt-3 py-3 rounded-[4px] ${theme == "dark" ? "bg-[#212230]" : "bg-[#eeeeee]"}`}>
            <button className={`${filter === "all" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('all')}>All</button>
              <button className={`${filter === "active" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('active')}>Active</button>
              <button className={`${filter === "completed" ? 'text-blue-500' : 'text-gray-500'} text-xs hover:text-gray-300`} onClick={()=> setFilter('completed')}>Completed</button>
          </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <p className="mt-10 font-bold text-center bg-gradient-to-r from-blue-500 to-[#ab60f2] inline-block text-transparent bg-clip-text">Create tasks...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
