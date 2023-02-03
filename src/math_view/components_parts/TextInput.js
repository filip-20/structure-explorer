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
         {toggleTable ? (
             (arity === 0 || arity > 2 || domain.size === 0) ? null : (
                     <TableButton onClick={() => toggleTable()} enabled={tableEnabled}/>
             )
         ):null}

         {toggleDatabase?(
             (arity < 1 || domain.size === 0)? null :(
                     <DatabaseButton onClick={() => toggleDatabase()} enabled={databaseEnabled}/>
             )
         ) : null}

         {teacherMode ? (
         <LockButton lockFn={() => onLock()} locked={textData.locked}/>
         ) : null}
     </InputGroup.Append>
        <Form.Control.Feedback type={"invalid"}>{errorProperty}</Form.Control.Feedback>
   </InputGroup>

);

export default TextInput;