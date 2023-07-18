import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useParams } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService'

const AddEmployeeComponent = () => {

    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmailId] = useState('')
    const navigate = useNavigate();
    //it is basically used for navigating to different pages

    // useParams() is a hook provided by the React Router library that allows you to access the parameters from the current route in a React component.
    const {id} = useParams();

    const saveOrUpdateEmployee = (e) => {
    // const saveOrUpdateEmployee = (e) => {
        e.preventDefault();

        //response is the response we get after data is added in database.(like the return type of the method in backend spring boot)
        const employee = {firstname, lastname, email}

        if(id){
                  EmployeeService.updateEmployee(id, employee).then((response) => {
                      navigate('/employees')
                  }).catch(error => {
                      console.log(error)
                  })
    
              }
          else{
            EmployeeService.createEmployee(employee).then((response) =>{
              console.log(response.data)
              navigate('/employees');
              
            }).catch(error => {
              console.log(error)
            })
          }
    }

    //automatically this will run if we make any changes
    //useEffect ensures that only the required component is rendered not every component
    useEffect(() => {
      //getting details and displaying them in the form
        EmployeeService.getEmployeeById(id).then((response) =>{
            setFirstName(response.data.firstname)
            setLastName(response.data.lastname)
            setEmailId(response.data.email)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    //this title is to give title as update or add as per request
    const title = () => {

        if(id){
            return <h2 className = "text-center">Update Employee</h2>
        }else{
            return <h2 className = "text-center">Add Employee</h2>
        }
    }

    return (
        <div>
           <br /><br />
           <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           title()
                       }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group mb-2">
                                    <label className = "form-label"> First Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter first name"
                                        name = "firstname"
                                        className = "form-control"
                                        value = {firstname}
                                        onChange = {(e) => setFirstName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Last Name :</label>
                                    <input
                                        type = "text"
                                        placeholder = "Enter last name"
                                        name = "lastname"
                                        className = "form-control"
                                        value = {lastname}
                                        onChange = {(e) => setLastName(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <div className = "form-group mb-2">
                                    <label className = "form-label"> Email Id :</label>
                                    <input
                                        type = "email"
                                        placeholder = "Enter email Id"
                                        name = "email"
                                        className = "form-control"
                                        value = {email}
                                        onChange = {(e) => setEmailId(e.target.value)}
                                    >
                                    </input>
                                </div>

                                <button className = "btn btn-success" onClick = {(e) => saveOrUpdateEmployee(e)} >Submit </button>
                                <Link to="/employees" className="btn btn-danger"> Cancel </Link>
                            </form>

                        </div>
                    </div>
                </div>

           </div>

        </div>
    )
}

export default AddEmployeeComponent
