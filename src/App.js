import React, { Suspense, useState } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";



const App = () => {



  return (
   
      <BrowserRouter>
        <React.Suspense fallback={null}>
          <Switch>


            <Route exact path="/" component={Home} />
           
          </Switch>
        </React.Suspense>
      </BrowserRouter>
  


  );
}

export default App;
