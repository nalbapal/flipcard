import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import '../../assets/scss/intro.scss'
import {useEffect, useRef, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link, useParams} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import {BoxAPIs, CardAPIs} from "../../const/APIs";
import CommentBox from "./CommentBox";
import Flippy, {BackSide, FrontSide} from "react-flippy";

export default function DetailedBoxPublic() {
    const ref = useRef();
    const [flip, setFlip] = useState(false);
    let params = useParams();
    const [box, setBox] = useState({});
    const [newCard, setNewCard] = useState({
        title:"",
        description:"",
        boxId:params.id
    })

    const addNewCard = async (e) => {
        e.preventDefault()
        await axios.post(CardAPIs.create, newCard).then(res=> {
            setNewCard({
                title:"",
                description:"",
                boxId:params.id
            })
            findBoxById()
        }).catch(err=> {
            console.log(err)
        })
    }
    const findBoxById = async () => {
        await axios.get(BoxAPIs.findById+`${params.id}`).then(res=> {
            console.log(res.data)
            setBox(res.data)
        }).catch(err=> {
            console.log(err.response.message)
        })
    }
    useEffect(()=>{
        findBoxById()
    },[])
    return (
        <>
            <main>
                <div className=" mt-7">
                    <div className="container background font">
                        <div className="col-md-4">
                           <Link to={"/"}>
                            <button type="button" className="btn bg-gradient-dark btn-block mb-3">
                                Back to All Boxes
                            </button>
                           </Link>
                        </div>

                        {box && <>
                            <div className="row">
                                <div className="col-12  mx-4 p-3 my-2 rounded-3"
                                     style={{backgroundColor: 'rgb(233, 236, 239)'}}>
                                    <header className="header d-flex justify-content-between ">
                                        <h3 className="kanban-title-board">{box.boxName}</h3>
                                        <button className="btn btn-outline-info text-dark disabled">{box.boxStatus}</button>
                                    </header>
                                    <p className="card-description">
                                        {box.boxDescription}
                                    </p>
                                    <hr className="horizontal dark my-2"/>
                                    <main className="cards">
                                        <div className="row">
                                            {
                                                box.cards && box.cards.map(curItem =>{
                                                    return (
                                                        <>
                                                            <div key={curItem.cardId} className="col-4 my-2">
                                                                <div className="card">
                                                                    <Flippy
                                                                        flipOnClick={true} // default false
                                                                        flipDirection="horizontal" // horizontal or vertical
                                                                        ref={ref}>
                                                                        <FrontSide>
                                                                            <div className="card-header text-center pt-4 pb-3">
                                                                                <h6 className=" mt-2">
                                                                                    {curItem.title}
                                                                                </h6>
                                                                            </div>
                                                                        </FrontSide>
                                                                        <BackSide >

                                                                            <div className="card-header text-center pt-4 pb-3">
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
                                        </div>
                                    </main>
                                </div>
                            </div>
                        </>}

                        <CommentBox boxId={params.id} />

                    </div>
                </div>
            </main>

        </>
    )
}