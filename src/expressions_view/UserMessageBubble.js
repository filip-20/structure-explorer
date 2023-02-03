import React from "react";
import styled from 'styled-components';
import {Button} from "react-bootstrap";
import {BTN_CHANGE} from "../constants/gameMessages";

const UserMessage = styled.div`
  padding: .75rem;
  align-self: flex-end;
  width: max-content;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", Arial, sans-serif;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  right: 0px;
  background: #0066ff;
  color: #fff;
  float: right;
  border-radius: 15px 0 15px 15px;
  margin-right: .25rem;
`;

export class UserMessageBubble extends React.Component {
    constructor(props) {
        super(props);
        this.state = {entered: false};
    }

    renderReturnButton(){
        if(this.state.entered){
            return (
                <Button onClick={() => this.props.onClick()} size={"sm"} className={'text-primary bg-transparent border-0 mb-auto float-right mt-2'}>
                    <strong>{BTN_CHANGE}</strong>
                </Button>
            );
        }
    }

    render(){
        return(
            <div onMouseEnter={() => this.setState({entered: true})} onMouseLeave={() => this.setState({entered: false})}>
                <UserMessage>
                    {this.props.children}
                </UserMessage>
                {this.renderReturnButton()}
            </div>
        );
    }
}