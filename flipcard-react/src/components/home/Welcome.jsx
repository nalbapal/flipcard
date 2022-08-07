import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import '../../assets/scss/intro.scss'
import React, {useEffect, useRef, useState} from "react";
import image from '../../assets/img/curved-images/curved8.jpg'
import axios from "axios";
import {BoxAPIs} from "../../const/APIs";
import {Link} from "react-router-dom";
import {Carousel} from "react-responsive-carousel";
import Flippy, {BackSide, FrontSide} from "react-flippy";

export const Welcome = () => {
    const ref = useRef();
    const [allBoxes, setAllBoxes] = useState([]);
    const getAllBoxes = async () => {
        await axios.get(BoxAPIs.getAll).then(res => {
            console.log(res.data)
            setAllBoxes(res.data)
        }).catch(err => {
            alert(err.response.message)
            console.log(err)
        })
    }
    useEffect(() => {
        getAllBoxes()
    }, [])
    return (
        <>
            <br/><br/><br/>
            <div className="row ">
                <img style={{height: '600px', borderRadius: '0 0 360px 360px'}} src={image} alt=""/>
            </div>
            {/*    Public boxes */}


            <div className="kanban-container ms-5">
                <h1>All Public Boxes are given below</h1>
                <div className="row">
                    {
                        allBoxes.map(curBox => {
                            return (
                                <>
                                    {
                                        (curBox.boxStatus == 'PUBLIC' || curBox.userId == JSON.parse(sessionStorage.getItem("flipcard-login")).userId) &&
                                        <div className="col-sm-12 col-lg-3 col-md-4  mx-4 p-3 my-2 rounded-3"
                                             style={{backgroundColor: 'rgb(233, 236, 239)'}}>
                                            <header className="header d-flex justify-content-between ">

                                                <h4 className="kanban-title-board">
                                                    <Link to={`/detailed-box-public/${curBox.boxId}`}>
                                                        {curBox.boxName}
                                                    </Link>
                                                </h4>
                                                ({curBox.boxStatus})
                                                <span>
                                                    {curBox.userId == JSON.parse(sessionStorage.getItem("flipcard-login")).userId &&
                                                        <Link to={`/detailed-box/${curBox.boxId}`}>Edit </Link>
                                                    }
                                        </span>
                                            </header>
                                            <p className="card-description">
                                                {curBox.boxDescription}
                                            </p>
                                            <hr className="horizontal dark my-2"/>
                                            <hr className={"horizontal dark my-2"}/>

                                            <main className="cards">
                                                <div className="row">
                                                    <Carousel showArrows={true}>
                                                        {
                                                            curBox.cards.map(curItem => {
                                                                return (
                                                                    <>
                                                                        <div className="col-12">
                                                                            <div className="card">
                                                                                <Flippy
                                                                                    flipOnClick={true} // default false
                                                                                    flipDirection="horizontal" // horizontal or vertical
                                                                                    ref={ref}
                                                                                >
                                                                                    <FrontSide

                                                                                    >
                                                                                        <div
                                                                                            className="card-header text-center pt-4 pb-3">
                                                                                            <h6 className=" mt-2">
                                                                                                {curItem.title}
                                                                                            </h6>
                                                                                        </div>
                                                                                    </FrontSide>
                                                                                    <BackSide>

                                                                                        <div
                                                                                            className="card-header text-center pt-4 pb-3">
                                                                                            <h6 className=" mt-2">
                                                                                                {curItem.description}
                                                                                            </h6>
                                                                                        </div>
                                                                                    </BackSide>

                                                                                </Flippy>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                );
                                                            })
                                                        }
                                                    </Carousel>
                                                </div>
                                            </main>
                                            <div className="footer">Published By: {curBox.username}</div>
                                        </div>
                                    }
                                </>
                            );
                        })
                    }
                </div>
            </div>


        </>
    )
}
