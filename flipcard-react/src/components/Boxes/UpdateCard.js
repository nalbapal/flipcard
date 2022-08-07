import EditIcon from "@mui/icons-material/Edit";

export default function updateCardComponent(setUpdateCard, updateCard, curItem, editCard) {
    return <div className="col-2 ms-3">
        <div
            className="my-0 d-flex justify-content-between">
            <div className="col-md-4">
                {/*Button trigger modal*/}
                <EditIcon onClick={() => setUpdateCard({
                    ...updateCard,
                    title: curItem.title,
                    cardId: curItem.cardId,
                    description: curItem.description
                })} data-bs-toggle="modal"
                          data-bs-target="#exampleModalMessage"
                          style={{cursor: 'pointer'}}/>
                {/*Modal*/}
                <div className="modal fade"
                     id="exampleModalMessage"
                     tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalMessageTitle"
                     aria-hidden="true">
                    <div
                        className="modal-dialog modal-dialog-centered"
                        role="document">
                        <div className="modal-content">
                            <div
                                className="modal-header">
                                <h5 className="modal-title"
                                    id="exampleModalLabel">Update
                                    Card Info</h5>
                                <button type="button"
                                        className="btn-close text-dark"
                                        data-bs-dismiss="modal"
                                        aria-label="Close">
                                                                                                        <span
                                                                                                            aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div
                                        className="form-group">
                                        <label
                                            htmlFor="recipient-name"
                                            className="col-form-label">Title</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updateCard.title}
                                            onChange={event => setUpdateCard({
                                                ...updateCard,
                                                title: event.target.value
                                            })}
                                            id="boxName"/>
                                    </div>
                                    <div
                                        className="form-group">
                                        <label
                                            htmlFor="message-text"
                                            className="col-form-label">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="message-text"
                                            value={updateCard.description}
                                            onChange={event => setUpdateCard({
                                                ...updateCard,
                                                description: event.target.value
                                            })}>

                                                                                                            </textarea>
                                    </div>
                                </form>
                            </div>
                            <div
                                className="modal-footer">
                                <button type="button"
                                        className="btn bg-gradient-secondary"
                                        data-bs-dismiss="modal">Close
                                </button>
                                <button type="button"
                                        className="btn bg-gradient-primary"
                                        onClick={(e) => {
                                            editCard(e);
                                        }}>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}
