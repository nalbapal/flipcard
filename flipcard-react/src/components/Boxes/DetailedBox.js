import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import '../../assets/scss/intro.scss'
import {useEffect, useRef, useState} from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {BoxAPIs, CardAPIs} from "../../const/APIs";
import Flippy, {BackSide, FrontSide} from "react-flippy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import updateCardComponent from "./UpdateCard";
import UpdateBox from "./UpdateBox";


export default function DetailedBox() {
    const ref = useRef();
    let params = useParams();
    const [box, setBox] = useState({});
    const [newCard, setNewCard] = useState({
        title: "",
        description: "",
        boxId: params.id
    })
    const [updateCard, setUpdateCard] = useState({
        cardId: null,
        title: "",
        description: "",
    })
    const [updateBox, setUpdateBox] = useState({
        boxId: params.id,
        boxName: "",
        boxDescription: "",
    })

    const addNewCard = async (e) => {
        e.preventDefault()
        await axios.post(CardAPIs.create, newCard).then(res => {
            setNewCard({
                title: "",
                description: "",
                boxId: params.id
            })
            findBoxById()
        }).catch(err => {
            console.log(err)
        })
    }
    const findBoxById = async () => {
        await axios.get(BoxAPIs.findById + `${params.id}`).then(res => {
            console.log(res.data)
            setBox(res.data)
        }).catch(err => {
            console.log(err.response.message)
        })
    }

    const deleteCard = async (cardId) => {
        await axios.delete(CardAPIs.deleteById + `/${cardId}`).then(res => {
            findBoxById()
        }).catch(err => {
            console.log(err.response.message)
        })
    }

    const editCard = async (e) => {
        e.preventDefault()
        await axios.put(CardAPIs.update, updateCard).then(res => {
            setUpdateCard({
                cardId: null,
                title: "",
                description: "",
            })
            findBoxById()
        }).catch(err => {
            console.log(err.response.message)
        })
    }
    const editBox = async (e) => {
        e.preventDefault()
        await axios.put(BoxAPIs.update, updateBox).then(res => {
            setUpdateBox({
                boxId: params.id,
                boxName: "",
                boxDescription: "",
            })
            findBoxById()
        }).catch(err => {
            console.log(err.response.message)
        })
    }
    useEffect(() => {
        findBoxById()
    }, [])
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
                                        <div className={"d-flex"}>
                                            <button className="btn btn-outline-info text-dark disabled">{box.boxStatus}</button>
                                            {UpdateBox(setUpdateBox, updateBox, box, editBox)}
                                        </div>

                                    </header>
                                    <p className="card-description">
                                        {box.boxDescription}
                                    </p>
                                    <hr className="horizontal dark my-2"/>
                                    <main className="cards">
                                        <div className="row">
                                            {
                                                box.cards && box.cards.map(curItem => {
                                                    return (
                                                        <>
                                                            <div key={curItem.cardId} className="col-4 my-2">
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
                                                                    <br/>
                                                                    <div className="row">
                                                                        <div className="col-2 ms-3">
                                                                            <DeleteIcon
                                                                                onClick={(e) => deleteCard(curItem.cardId)}
                                                                                style={{cursor: 'pointer'}}/>
                                                                        </div>
                                                                        {updateCardComponent(setUpdateCard, updateCard, curItem, editCard)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    );
                                                })
                                            }
                                        </div>
                                    </main>
                                    <div className="my-3 d-flex justify-content-between">
                                        <div className="col-md-4">
                                            {/*Button trigger modal*/}
                                            <button type="button" className="btn bg-gradient-primary btn-block mb-3"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModalMessage1">
                                                Add Card
                                            </button>
                                            {/*Modal*/}
                                            <div className="modal fade" id="exampleModalMessage1" tabIndex="-1"
                                                 role="dialog"
                                                 aria-labelledby="exampleModalMessageTitle" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Adding a
                                                                New Card in Box</h5>
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
                                                                    <input type="text" className="form-control"
                                                                           value={newCard.title}
                                                                           onChange={event => setNewCard({
                                                                               ...newCard,
                                                                               title: event.target.value
                                                                           })}
                                                                           id="boxName"/>
                                                                </div>
                                                                <div className="form-group">
                                                                    <label htmlFor="message-text"
                                                                           className="col-form-label">Description</label>
                                                                    <textarea className="form-control" id="message-text"
                                                                              value={newCard.description}
                                                                              onChange={event => setNewCard({
                                                                                  ...newCard,
                                                                                  description: event.target.value
                                                                              })}></textarea>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn bg-gradient-secondary"
                                                                    data-bs-dismiss="modal">Close
                                                            </button>
                                                            <button type="button" className="btn bg-gradient-primary"
                                                                    onClick={(e) => {
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
                        </>}
                    </div>
                </div>
            </main>

        </>
    )
}