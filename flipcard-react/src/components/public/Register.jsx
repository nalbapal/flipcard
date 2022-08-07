import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import backgroundImage from '../../assets/img/curved-images/curved14.jpg'
import * as React from 'react';
import {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import axios from "axios";
import {UserAPIs} from "../../const/APIs";

export const Register = () => {
    const [userDetails, setUserDetails] = useState({
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        password:'',
        dof:'',
    });
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowToast(false);
    };

    const handleUserDetails = (event) => {
        let value = event.target.value
        setUserDetails({...userDetails, [event.target.name]: value});
    }
    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await axios.post(UserAPIs.register, userDetails).then(res => {
            setShowToast(true)
            setUserDetails({
                firstName:"",
                lastName:"",
                userName:"",
                email:"",
                password:'',
                dof:'',
            })
            setIsLoading(false)
            navigate("/")
        }).catch(err => {
            console.log(err.response.message)
        })
    }


    return (
        <>
            <div className="ms-4 mt-7">
                <div className="container ms-20">
                    <div>
                        <section className="min-vh-100 mb-8">
                            <div className="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
                                 style={{backgroundImage: `url(${backgroundImage})`}}>
                                <span className="mask bg-gradient-dark opacity-6"/>
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-5 text-center mx-auto">
                                            <h1 className="text-white mb-2 mt-5">Welcome!</h1>
                                            <p className="text-lead text-white">Please Enter your details to signup for
                                                Flash Card App.</p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <form>
                                                <div className="row">
                                                    <div className="col-md-12 col-lg-6 col-sm-12">
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.firstName} name={'firstName'}
                                                                   type="text" className="form-control"
                                                                   placeholder="First Name"
                                                                   aria-label="First name"
                                                                   aria-describedby="first-name-addon"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.lastName} name={'lastName'}
                                                                   type="text" className="form-control"
                                                                   placeholder="Last Name"
                                                                   aria-label="Last name"
                                                                   aria-describedby="last-name-addon"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-lg-6 col-sm-12">
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.email} name={'email'} type="email"
                                                                   className="form-control"
                                                                   placeholder="Email"
                                                                   aria-label="email" aria-describedby="email-addon"/>
                                                        </div>
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.userName} name={'userName'}
                                                                   type="text" className="form-control"
                                                                   placeholder="Username"
                                                                   aria-label="Username"
                                                                   aria-describedby="username-addon"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-lg-6 col-sm-12">
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.password} name={"password"}
                                                                   type="password" className="form-control"
                                                                   placeholder="Password"
                                                                   aria-label="Password"
                                                                   aria-describedby="password-addon"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 col-lg-6 col-sm-12">
                                                        <div className="mb-3">
                                                            <input onChange={e => handleUserDetails(e)}
                                                                   value={userDetails.dof} name={"dof"}
                                                                   type="date" className="form-control"
                                                                   placeholder="Date of Birth"
                                                                   aria-label="Date of Birth"
                                                                   aria-describedby="date-of-birth-addon"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-center">
                                                    <button onClick={(e)=> handleRegisterSubmit(e)} type="button"
                                                            className="btn bg-gradient-dark w-100 my-4 mb-2">
                                                        {isLoading ? <CircularProgress/> : <b>Sign Up</b>}
                                                    </button>

                                                </div>
                                                <p className="text-sm mt-3 mb-0">Already have an account? <Link
                                                    to={"/login"} className="text-dark font-weight-bolder">Sign
                                                    in</Link>
                                                </p>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                showToast &&
                                <Snackbar
                                    open={showToast}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    message="Request to Admin for Approval"
                                />
                            }
                        </section>
                    </div>
                </div>
            </div>
        </>
    )
}
