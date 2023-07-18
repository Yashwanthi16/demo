import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import React from 'react';

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent/>
        <div className= "container">
          <Routes>
            <Route exact path ="/" element = {<ListEmployeeComponent/>}></Route>
            <Route path ="/employees" element = {<ListEmployeeComponent/>}></Route>
            <Route path = "/add-employee" element = {<AddEmployeeComponent/>}></Route>
            <Route path = "/edit-employee/:id" element = {<AddEmployeeComponent/>}></Route> 
            
            {/* :id is used to dynamically get id value */}
            {/* export as switch error can be rectified using upgraded version of react router dom and then*/}
          </Routes>
        </div>
        <FooterComponent/>
      </Router>
    </div>
    
  );
}

export default App;
