export default function UpdateBox(setUpdateBox, updateBox, box, editBox) {
    return <div className="col-2 ms-3">
        <div
            className="my-0 d-flex justify-content-between">
            <div className="col-md-4">
                {/*Button trigger modal*/}
                <button onClick={() => setUpdateBox({
                    ...updateBox,
                    boxName: box.boxName,
                    boxDescription: box.boxDescription
                })}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalMessage2"
                        className="btn btn-primary  ">Edit Box</button>
                {/*Modal*/}
                <div className="modal fade"
                     id="exampleModalMessage2"
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
                                    Box Info</h5>
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
                                            className="col-form-label">Box Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={updateBox.boxName}
                                            onChange={event => setUpdateBox({
                                                ...updateBox,
                                                boxName: event.target.value
                                            })}
                                            id="boxName"/>
                                    </div>
                                    <div
                                        className="form-group">
                                        <label
                                            htmlFor="message-text"
                                            className="col-form-label">Box Description</label>
                                        <textarea
                                            className="form-control"
                                            id="message-text"
                                            value={updateBox.boxDescription}
                                            onChange={event => setUpdateBox({
                                                ...updateBox,
                                                boxDescription: event.target.value
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
                                            editBox(e);
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
