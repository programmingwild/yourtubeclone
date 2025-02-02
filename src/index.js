import React from "react";
import ReactDOM from "react-dom/client"; // ✅ Import `createRoot`
import App from "./App";
import { Buffer } from 'buffer'; 
import { SidebarProvider } from "./components/SidebarContext"; // Import Context

global.Buffer = Buffer;   

const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Use `createRoot`
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);
