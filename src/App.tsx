import React from 'react';
import {Col, Row} from 'react-bootstrap';
import {Provider} from 'react-redux';
import ExpressionsContainer from './redux/containers/ExpressionsContainer';
import {clearGraphSelection, importAppState} from "./redux/actions";
import {DEFAULT_FILE_NAME} from "./constants";
import DiagramModelContainer from "./redux/containers/DiagramModelContainer";
import MathSystemContainer from './redux/containers/MathSystemContainer';
import ButtonToolbarComponent from "./buttons/ButtonToolbarComponent";
import HelpGraphCollapse from "./buttons/HelpGraphCollapse";
import {DiagramSystem} from "./graph_view/DiagramSystem";

interface AppProps{
  store:any;
  teacherMode:boolean;
  toggleTeacherMode:any;
}

interface AppState {
  modalShow:boolean;
  diagramToggled:boolean;
  exerciseName:string;
  collapseHelpGraphButton:boolean;
}

class App extends React.Component<AppProps,AppState> {
  constructor(props:AppProps) {
    super(props);

    this.state = {
      modalShow: false,
      diagramToggled:false,
      collapseHelpGraphButton:false,
      exerciseName:''
    };

    this.exportState = this.exportState.bind(this);
    this.importState = this.importState.bind(this);
    this.setModelShowState = this.setModelShowState.bind(this);
    this.setDiagramToggledState = this.setDiagramToggledState.bind(this);
    this.setTeacherModeState = this.setTeacherModeState.bind(this);
    this.setExerciseNameState = this.setExerciseNameState.bind(this);
    this.makeCordNodes = this.makeCordNodes.bind(this);
    this.clearGraphSelection = this.clearGraphSelection.bind(this);
    this.setCollapseHelpGraphButton = this.setCollapseHelpGraphButton.bind(this);
  }

  setCollapseHelpGraphButton(bool:boolean){
    this.setState({collapseHelpGraphButton:bool})
  }

  makeCordNodes(diagramState:any){
    let nodeState = new Map([["domainNodes", diagramState.domainNodes],["constantNodes", diagramState.constantNodes],["ternaryNodes", diagramState.ternaryNodes],["quaternaryNodes",diagramState.quaternaryNodes]]);
    let nodesCoords:any = {};

    for(let mapName of nodeState.keys()){
      for(let [nodeName,nodeObject] of nodeState.get(mapName).entries()){
        if(!nodesCoords.hasOwnProperty(mapName)){
          nodesCoords[mapName] = {};
        }
        let nodeNameInObject = (mapName === "domainNodes" || mapName === "constantNodes")?nodeName:nodeObject.getNodeNameCombination();
        if(nodeNameInObject){
          nodesCoords[mapName][nodeNameInObject] = {x:nodeObject.position.x,y:nodeObject.position.y};
        }
      }
    }
    return nodesCoords;
  }

  exportState() {
    let state = this.props.store.getState();
    let diagramCordState = this.makeCordNodes(state.diagramState);

    let json = JSON.stringify({
      common: state.common,
      language: state.language,
      structure: state.structure,
      expressions: state.expressions,
      diagramCordState: diagramCordState
    });

    return {
        mime: 'application/json',
        filename: this.state.exerciseName.length === 0? (DEFAULT_FILE_NAME + '.json'):(this.state.exerciseName+'.json'),
        contents: json
      }
    }

  importState(e:any) {
    let file = e.target.files[0];
    let fr = new FileReader();

    let store = this.props.store;
    fr.onload = function (e) {
      store.dispatch(importAppState(e.target.result,store.getState().diagramState));
    };
    fr.readAsText(file);
  }

  setModelShowState(bool:boolean){
    this.setState({modalShow: bool});
  }

  setDiagramToggledState(bool:boolean){
    this.setState({diagramToggled: bool});
  }

  setExerciseNameState(name:string){
    this.setState({exerciseName:name});
  }

  setTeacherModeState(){
    this.props.toggleTeacherMode();
  }

  clearGraphSelection(){
    this.props.store.dispatch(clearGraphSelection());
  }

  render() {
    return (
        <Provider store={this.props.store}>
          <div className='app'>
            <Row className={'navbar'}>
                  <ButtonToolbarComponent setCollapseHelpGraphButton={this.setCollapseHelpGraphButton} collapseHelpGraphButton={this.state.collapseHelpGraphButton} clearGraphSelection={this.clearGraphSelection} exportState={this.exportState} setExerciseNameState={this.setExerciseNameState} modalShowState={this.state.modalShow} diagramToggledState={this.state.diagramToggled} teacherModeState={this.props.teacherMode} setTeacherModeState={this.setTeacherModeState} setDiagramToggledState={this.setDiagramToggledState} setModelShowState={this.setModelShowState} importState={this.importState}/>
                  <HelpGraphCollapse collapsed={this.state.collapseHelpGraphButton}/>
            </Row>
              {this.state.diagramToggled?
                    <DiagramSystem store={this.props.store} diagramModel={this.props.store.getState().diagramState.diagramModel}/>
                  : <MathSystemContainer diagramModel={this.props.store.getState().diagramState.diagramModel}/>
              }
          </div>
        </Provider>
    );
  }
}

export default App;
