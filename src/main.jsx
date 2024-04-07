import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from 'recoil';
import "./index.css";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar"; 
import { Toaster } from 'react-hot-toast';
import Modal from "./components/ui/Modal";
import MyPoliciesModal from "./components/ui/MyPoliciesModal";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
    <div className="relative min-h-screen w-full bg-neutral-900">

        <Navbar /> 
        <RouterProvider router={router} />
        <Toaster/>
        <Modal/>
        <MyPoliciesModal/>

    </div>  
    </RecoilRoot>
  </React.StrictMode>
);






