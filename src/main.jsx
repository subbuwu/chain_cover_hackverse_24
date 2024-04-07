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
import { useState } from "react";
import { AdminContext } from "./mycontext.js";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);

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

  return (
    <React.StrictMode>
      <RecoilRoot>
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
          <div className="relative min-h-screen w-full bg-neutral-900">
            <Navbar /> 
            <RouterProvider router={router} />
            <Toaster/>
            <Modal/>
            <MyPoliciesModal/>
          </div>  
        </AdminContext.Provider>
      </RecoilRoot>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
