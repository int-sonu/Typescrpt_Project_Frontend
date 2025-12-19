
import './App.css'
import HomePage from './components/Main';
import Layout from './components/Layout';
import Login from './components/LoginPage';
import SignUp from './components/SignupPage';
import {createBrowserRouter, RouterProvider, } from "react-router-dom";
import CreateTodo from './components/todo';
import TodoList from './components/MyTasks';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        path: "/", 
        element: <HomePage /> 
      },
      { 
        path: "login", 
        element: <Login /> 
      },
      { 
        path: "signup", 
        element: <SignUp /> 
      },
     
       { 
        path: "task", 
        element: <CreateTodo /> 
      },
     
      { 
        path: "mytask", 
        element: <TodoList/> 
      },
     
    ],
  },
]);


function App() {

  return (

    <RouterProvider router={router} />

  )
}

export default App
