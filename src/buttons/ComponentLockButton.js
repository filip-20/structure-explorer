import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const ComponentLockButton = ({lockFn, locked, subject = ''}) => (
    <Button style={{}}
        variant='secondary' size={"sm"}
        title={(locked ? 'Edit ' : 'Finish editing ') + subject}
        className='py-0 mr-2'
        onClick={lockFn}>
        <FontAwesome name={locked ? 'fas fa-edit' : 'far fa-check'}/>
        <span>&nbsp;{locked ? 'Edit' : 'Done'}</span>
    </Button>
);

export default ComponentLockButton;