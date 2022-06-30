import React from 'react';
import {Button} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const HelpButton = ({onClick}) => (
    <Button onClick={onClick} style={{padding:"0.2rem 0.4rem"}} variant={'secondary'} size={"sm"} title='Pomoc' data-toggle='collapse'>
        <FontAwesome name='fas fa-question'/>
    </Button>
);

export default HelpButton;
