import React from 'react';
import {Button} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { addTypeDescription } from "../constants/messages"

const AddButton = ({onClickAddFunction,addType}) => (
    <Button variant={"success"}
        title={`Add a new ${addTypeDescription(addType)}`}
        onClick={() => onClickAddFunction(addType)}><FontAwesome
        name='plus'/>
        &nbsp;Add
    </Button>
);

export default AddButton;
