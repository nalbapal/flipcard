import * as React from "react";
import {Link, useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {UserAPIs} from "../../const/APIs";

export default function EditProfile() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [userDetails, setUserDetails] = useState({
        userId: JSON.parse(sessionStorage.getItem("flipcard-login")).userId,
        firstName: JSON.parse(sessionStorage.getItem("flipcard-login")).firstName,
        lastName: JSON.parse(sessionStorage.getItem("flipcard-login")).lastName,
        userName: JSON.parse(sessionStorage.getItem("flipcard-login")).userName,
        email: JSON.parse(sessionStorage.getItem("flipcard-login")).email,
        password: JSON.parse(sessionStorage.getItem("flipcard-login")).password,
        dof: JSON.parse(sessionStorage.getItem("flipcard-login")).dof.substring(0,10)
    });


    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);


    const handleUserDetails = (event) => {
        setErrorMessage('')
        setIsLoading(false)
        let value = event.target.value
        setUserDetails({...userDetails, [event.target.name]: value, });
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.put(UserAPIs.update, userDetails).then(res => {
            setShowToast(true)
            setUserDetails({
                firstName:"",
                lastName:"",
                userName:"",
                email:"",
                password:'',
                dof:'',
            })
            sessionStorage.removeItem("flipcard-login")
            navigate("/")
            window.location.reload()
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err.response.message)
        })


    }
    return (
        <>
            <br/><br/><br/>
            <main className="main-content mt-3">
                <section>
                    <div className="page-header min-vh-25">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12 col-sm-12 col-lg-12">
                                    <div className="card-header">
                                        <span className={"text-bold me-4"}>You may update your Profile info.</span>
                                        <button className="btn btn-dark  btn-rounded-full text-bold"><Link
                                            className={"text-white"} to={"/"}> Cancel</Link></button>
                                        <hr/>

                                    </div>
                                    <div className="card card-body">
                                        <div className="card">
                                            <div className="card-body">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                                            <div className="mb-3">
                                                                <label>Username</label>
                                                                <input onChange={e => handleUserDetails(e)}
                                                                       value={userDetails.userName} name={'userName'}
                                                                       type="text" className="form-control"
                                                                       placeholder="Username"
                                                                       aria-label="Username"
                                                                       aria-describedby="username-addon"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label>Email</label>

                                                                <input onChange={e => handleUserDetails(e)}
                                                                       value={userDetails.email} name={'email'}
                                                                       type="email"
                                                                       className="form-control"
                                                                       placeholder="Email"
                                                                       aria-label="Email"
                                                                       aria-describedby="email-addon"/>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-12 col-lg-12 col-sm-12">
                                                            <div className="mb-3">
                                                                <label>Password</label>

                                                                <input onChange={e => handleUserDetails(e)}
                                                                       value={userDetails.password} name={"password"}
                                                                       type="password" className="form-control"
                                                                       placeholder="Password"
                                                                       aria-label="Password"
                                                                       aria-describedby="password-addon"/>
                                                            </div>
                                                            <div className="mb-3">
                                                                <label>Date of Birth</label>
                                                                <input onChange={e => handleUserDetails(e)}
                                                                       value={userDetails.dof} name={"dof"}
                                                                       type="date" className="form-control"
                                                                       placeholder="Date of birth"
                                                                       aria-label="dateOfBirth"
                                                                       aria-describedby="date-of-birth-addon"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="text-center">
                                                            {errorMessage !== '' &&
                                                                <b style={{color: 'red'}}>{errorMessage}</b>}
                                                        </div>
                                                        <button onClick={handleRegisterSubmit} type="button"
                                                                className="btn bg-gradient-dark w-100 my-4 mb-2">
                                                            {isLoading ? <CircularProgress/> : <b>Update Info</b>}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}