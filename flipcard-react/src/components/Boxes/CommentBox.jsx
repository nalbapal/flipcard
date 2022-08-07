import '../../assets/css/nucleo-icons.css'
import '../../assets/css/nucleo-svg.css'
import '../../assets/css/soft-ui-dashboard.css?v=1.0.3'
import '../../assets/scss/intro.scss'
import {useEffect, useState} from "react";
import axios from "axios";
import {CommentAPIs} from "../../const/APIs";

export default function CommentBox(params) {
    const [comment, setComment] = useState({
        boxId: params.boxId,
        comment: "",
        userId: JSON.parse(sessionStorage.getItem("flipcard-login")).userId
    })
    const [comments, setAllComments] = useState([])

    const fetchComments = async () => {
        await axios.get(CommentAPIs.findByBoxId + `/${params.boxId}`).then(res => {
            setAllComments(res.data)
        }).catch(err => {
            console.log(err.response.message)
        })
    }

    useEffect(() => {
        fetchComments()
    }, [])

    const addComment = async (e) => {
        e.preventDefault()
        axios.post(CommentAPIs.create, comment).then(res => {
            console.log("Commented")
            setComment({
                boxId: params.boxId,
                comment: "",
                userId: JSON.parse(sessionStorage.getItem("flipcard-login")).userId
            })
            fetchComments()
        }).catch(err => {
            console.log(err.response.message)
        })
    }


    return (<>
        <h3>Comments:</h3>
        <form>
            <div className="form-group">
                <label htmlFor="message-text2" className="col-form-label">Comment Here Now</label>
                <textarea rows={5} className="form-control" id="message-text2" value={comment.comment}
                          onChange={event => setComment({
                              ...comment, comment: event.target.value
                          })}></textarea>
                <br/>
                <button type="button" className="btn bg-gradient-primary" onClick={(e) => {
                    addComment(e);
                }}>
                    Comment
                </button>
            </div>
        </form>

        {
            comments && comments.map(com => {
                return <div key={com.comId}>
                    <span style={{fontSize: 20, fontWeight: 'bold'}}>Username : {com.username}  </span>
                    <br/><span className={"ms-7"}>{com.comment}</span>
                    <hr/>
                </div>
            })
        }
    </>)
}