import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import '../../assets/scss/intro.scss'
import {useEffect, useRef, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonPinIcon from "@mui/icons-material/PersonPin";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {BoxAPIs} from "../../const/APIs";
import Flippy, {BackSide, FrontSide} from "react-flippy";

export default function Boxes() {
    const ref = useRef();
    const [flip, setFlip] = useState(false);
    const navigate = useNavigate();
    const [allBoxes, setAllBoxes] = useState([]);
    const [newBox, setNewBox] = useState({
        boxName: "",
        boxDescription: "",
        boxStatus: "PRIVATE",
        userId: JSON.parse(sessionStorage.getItem("flipcard-login")).userId
    })
    const [newCard, setNewCard] = useState({
        word: '',
        explain: ''
    })
    const [targetBox, setTargetBox] = useState(null);

    const getAllBoxes = async () => {
        await axios.get(BoxAPIs.findByUserId+`/${JSON.parse(sessionStorage.getItem("flipcard-login")).userId}`).then(res=> {
            console.log(res.data)
            setAllBoxes(res.data)
        }).catch(err=> {
            alert(err.response.message)
            console.log(err)
        })
    }
    useEffect(() => {
        getAllBoxes()
    }, [])
    const handleDelete = async (boxId) => {
        await axios.delete(BoxAPIs.deleteById+`/${boxId}`).then(res=> {
            getAllBoxes()
        }).catch(err=> {
            alert(err.response.message)
            console.log(err)
        })

    }
    const addNewBox = async (e) => {
        e.preventDefault();
        console.log(newBox)
        await axios.post(BoxAPIs.create, newBox).then(res=> {
            console.log(res.data)
            navigate("/my-boxes")
            setNewBox({
                boxName: "",
                boxDescription: "",
                boxStatus: "PRIVATE",
                userId: JSON.parse(sessionStorage.getItem("flipcard-login")).userId
            })
            getAllBoxes()
        }).catch(err=> {
            console.log(err)
        })
    }

    const addNewCard = (e) => {
        e.preventDefault();
        const updatedItemsList = allBoxes.filter((curElm) => {
            return (curElm.title == targetBox);
        });
        console.log(updatedItemsList)
    }
    0
    return (<>
    <main>
        <div className=" mt-7">
            <div className="container background font">
                <h1 className={"text-center"}>My Boxes</h1>
                <div className="col-md-4">
                    {/*Button trigger modal*/}
                    <button type="button" className="btn bg-gradient-dark btn-block mb-3"
                            data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                        Add New Box
                    </button>
                    {/*Modal*/}
                    <div className="modal fade" id="exampleModalMessage" tabIndex="-1" role="dialog"
                         aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Adding a New Box</h5>
                                    <button type="button" className="btn-close text-dark"
                                            data-bs-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label htmlFor="recipient-name"
                                                   className="col-form-label">Title</label>
                                            <input type="text" className="form-control" value={newBox.boxName}
                                                   onChange={event => setNewBox({
                                                       ...newBox,
                                                       boxName: event.target.value
                                                   })}
                                                   id="boxName"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="message-text"
                                                   className="col-form-label">Description</label>
                                            <textarea className="form-control" id="message-text"
                                                      value={newBox.boxDescription} onChange={event => setNewBox({
                                                ...newBox,
                                                boxDescription: event.target.value
                                            })}></textarea>
                                        </div>
                                        <div className="form-group" onClick={() => {setNewBox({...newBox, boxStatus: "PRIVATE"});}}>
                                            <input type="radio" value={newBox.boxStatus} name="boxStatus" checked={newBox.boxStatus == "PRIVATE"}/> Private
                                        </div>
                                        <div className="radio-btn" onClick={() => {setNewBox({...newBox, boxStatus: "PUBLIC"});}}>
                                            <input type="radio" value={newBox.boxStatus} name="boxStatus" checked={newBox.boxStatus == "PUBLIC"}/> Public
                                        </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-gradient-secondary"
                                    data-bs-dismiss="modal">Close
                            </button>
                            <button type="button" className="btn bg-gradient-primary" onClick={(e) => {
                                addNewBox(e);
                            }}>Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="kanban-container">
            <div className="row">
                {
                    allBoxes.map(curBox => {
                        return (
                            <>
                                <div className="col-sm-12 col-lg-3 col-md-4  mx-4 p-3 my-2 rounded-3"
                                     style={{backgroundColor: 'rgb(233, 236, 239)'}}>
                                    <header className="header d-flex justify-content-between ">
                                        <Link to={"/detailed-box/"+curBox.boxId}><h3
                                            className="kanban-title-board">{curBox.boxName}
                                        </h3> ({curBox.boxStatus})</Link>
                                        <span>
                                            <button className="kanban-title-button btn btn-sm btn-white" onClick={() => {handleDelete(curBox.boxId);}}>x</button>
                                        </span>
                                    </header>
                                    <p className="card-description">
                                        {curBox.boxDescription}
                                    </p>
                                    <hr className="horizontal dark my-2"/>
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
                                                                        <br/>
                                                                        <div className="row">
                                                                            <div className="col-2 ms-3">
                                                                                <DeleteIcon style={{cursor: 'pointer'}} />
                                                                            </div>
                                                                            <div className="col-2 ms-3">
                                                                                <EditIcon style={{cursor: 'pointer'}} />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        );
                                                    })
                                                }
                                            </Carousel>
                                        </div>
                                    </main>
                                </div>
                            </>
                        );
                    })
                }
                <div className="modal fade" id="exampleModalMessage1" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalMessage1Title" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Adding a New Card
                                    on {targetBox} </h5>
                                <button type="button" className="btn-close text-dark"
                                        data-bs-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true"> X </span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name2"
                                               className="col-form-label">Word</label>
                                        <input type="text" className="form-control"
                                               id="recipient-name2" value={newCard.word}
                                               onChange={event => setNewCard({...newCard, word: event.target.value})}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text2"
                                               className="col-form-label">Definition</label>
                                        <textarea className="form-control" id="message-text2" value={newCard.newCard}
                                                  onChange={event => setNewCard({
                                                      ...newCard,
                                                      newCard: event.target.value
                                                  })}></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn bg-gradient-secondary"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button" className="btn bg-gradient-primary" onClick={(e) => {
                                    addNewCard(e);
                                }}>Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</main>
</>
)
}