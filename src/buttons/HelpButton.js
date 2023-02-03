import React from 'react';
import {Button} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const HelpButton = ({onClick, active = false, subject}) => (
    <Button onClick={onClick} style={{padding:"0.2rem 0.4rem"}}
        variant={'outline-info'} size={"sm"}
        title={`Help${ subject ? ` on ${subject}` : ''}`}
        active={active}
        data-toggle='collapse'>
        <FontAwesome name='fas fa-question'/>
    </Button>
);

export default HelpButton;
