import React from 'react';
import {InputGroup, Form} from 'react-bootstrap';
import LockButton from "../../buttons/LockButton";
import TableButton from "../../buttons/TableButton";
import DatabaseButton from "../../buttons/DatabaseButton";

const TextInput = ({onChange, onLock, textData, label, teacherMode, id, toggleTable, toggleDatabase, arity, domain,databaseEnabled,tableEnabled,errorProperty}) => (
    <InputGroup size='sm' className='has-validation'>
        <InputGroup.Prepend>
            <InputGroup.Text>{label}</InputGroup.Text>
        </InputGroup.Prepend>

            <Form.Control
                isInvalid={(errorProperty && errorProperty.length > 0)}
                id={id}
                type='text'
                onChange={(e) => onChange(e)}
                value={textData.value}
                disabled={textData.locked}
            />
        <InputGroup.Append>
            <InputGroup.Text>&#125;</InputGroup.Text>
        </InputGroup.Append>
         {toggleTable ? (
             (arity === 0 || arity > 2 || domain.size === 0) ? null : (
                <InputGroup.Append>
                     <TableButton onClick={() => toggleTable()} enabled={tableEnabled}/>
                </InputGroup.Append>
             )
         ):null}

         {toggleDatabase?(
             (arity < 1 || domain.size === 0)? null :(
                <InputGroup.Append>
                     <DatabaseButton onClick={() => toggleDatabase()} enabled={databaseEnabled}/>
                </InputGroup.Append>
             )
         ) : null}

         {teacherMode ? (
         <LockButton lockFn={() => onLock()} locked={textData.locked}/>
         ) : null}
        <Form.Control.Feedback type={"invalid"}>{errorProperty}</Form.Control.Feedback>
   </InputGroup>

);

export default TextInput;