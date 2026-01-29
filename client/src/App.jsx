import React from "react";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import Edit from "./pages/Edit";
import Add from "./pages/Add";
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/edit" element= {<Edit/>}/>
        <Route path="/add" element= {<Add/>}/>
      </Routes>
    </>
  );
};

export default App;
