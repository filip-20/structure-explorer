import React from 'react';
import {Button, Modal} from "react-bootstrap";
import DownloadButton from "../../buttons/DownloadButton";
import {DEFAULT_FILE_NAME} from "../../constants";
import FontAwesome from "react-fontawesome";

const ModalComponent = ({modalShowState,setModalShowState,setExerciseNameState,exportState}) => (
    <Modal dialogClassName={"no-border-radius"} show={modalShowState} onHide={() => setModalShowState(false)}>
        <Modal.Header>
            <Modal.Title>Export exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='form-inline'>
                <div className='form-group'>
                    <label htmlFor="exercise-name">Exercise name: </label>
                    <input type="text" className="form-control" id="exercise-name"
                           placeholder={DEFAULT_FILE_NAME}
                           onChange={(e) => setExerciseNameState(e.target.value)}/>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <DownloadButton genFile={exportState} title={"Save"}
                            className='btn btn-success'>
            </DownloadButton>

            <Button variant={"secondary"} title='Cancel' onClick={() => setModalShowState(false)}>
                <FontAwesome name='fas fa-window-close'/>
                &nbsp;Cancel
            </Button>

        </Modal.Footer>
    </Modal>
);

export default ModalComponent;