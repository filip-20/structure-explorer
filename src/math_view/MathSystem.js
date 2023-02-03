import {Col, Row} from "react-bootstrap";
import React, {useState} from "react";
import LanguageContainer from "../redux/containers/LanguageContainer";
import VariablesValueContainer from "../redux/containers/VariablesValueContainer";
import StructureContainer from "../redux/containers/StructureContainer";
import ExpressionsContainer from "../redux/containers/ExpressionsContainer";
import SplitPane from 'react-split-pane';

const Pane = ({minSize, ...props}) =>
    <div {...props}/>;

export class MathSystem extends React.Component {

    state = { width: window.innerWidth };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.syncMathState();
        window.addEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.setState({ width: window.innerWidth});
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    isSplitVertically() {
        return this.state.width > 991.9;
    }

    paneMinSize() {
        return this.isSplitVertically() ? '240px' : '80px';
    }

    render(){
        return(
            <SplitPane
                split={this.isSplitVertically() ? 'vertical' : 'horizontal'}
                allowResize={true}
                className="split-pane"
                resizerStyle={{background: 'white'}}
                paneStyle={{background: 'white'}}>
                <Pane minSize={this.paneMinSize()}
                    className="overflow-auto vh-pane-left">
                    <LanguageContainer/>
                    <StructureContainer/>
                    <VariablesValueContainer/>
                </Pane>
                <Pane minSize={this.paneMinSize()}
                    className="overflow-auto vh-pane-right">
                    <ExpressionsContainer diagramModel={this.props.diagramModel}/>
                </Pane>
            </SplitPane>
        )
    }
}
