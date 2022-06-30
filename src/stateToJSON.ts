
function makeCordNodes(diagramState:any) {
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

function stateToJSON(state: any) {
  return JSON.stringify({
    common: state.common,
    language: state.language,
    structure: state.structure,
    expressions: state.expressions,
    diagramCordState: makeCordNodes(state.diagramState),
  });
}

export { stateToJSON }