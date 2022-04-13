import React from "react";
import GameMessageBubble from "./GameMessageBubble";
import Container from "./Container";
import MessageAreaContainer from "./MessageAreaContainer";
import {Form, Button, DropdownButton, ButtonGroup, Dropdown} from "react-bootstrap";
import {
    ATOM,
    GAME_OPERATOR,
    GAME_QUANTIFIER,
    PLAYER_OPERATOR,
    PLAYER_QUANTIFIER
} from "../constants/gameConstants";
import {
    COULD_NOT_WON,
    COULD_WON,
    ENTRY_SENTENCE,
    EVALUATED_EQUALITY,
    EVALUATED_INEQUALITY,
    EVALUATED_PREDICATE_IN,
    EVALUATED_PREDICATE_NOT_IN,
    FIRST_FORMULA_OPTION,
    FIRST_QUESTION, LOSS,
    OPERATOR_ANSWER, OPERATOR_QUESTION,
    QUANTIFIER_ANSWER_1,
    QUANTIFIER_ANSWER_2,
    QUANTIFIER_QUESTION,
    SECOND_FORMULA_OPTION, WIN_1, WIN_2
} from "../constants/gameMessages";
import {UserMessageBubble} from "./UserMessageBubble";
import PredicateAtom from "../model/formula/Formula.PredicateAtom";
import Implication from "../model/formula/Formula.Implication";

export class HenkinHintikkaGame extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        const { gameHistory, variableIndex } = this.props.formula;
        const lastHistoryItem = gameHistory[gameHistory.length - 1];
        return(
            <Container>
                <MessageAreaContainer>
                    {gameHistory.map((history, index) =>
                        history.gameMessages.map(message =>
                            <GameMessageBubble>
                                {message}
                            </GameMessageBubble>).concat(
                        history.userMessages.map(message => <UserMessageBubble onClick={() => this.props.goBack(this.props.index, index)}>{message}</UserMessageBubble>))
                    )}
                    {this.generateMessage(lastHistoryItem, variableIndex)
                                        .map(message => <GameMessageBubble>{message}</GameMessageBubble>)}
                </MessageAreaContainer>
                <Form.Group>
                    {this.getChoice(lastHistoryItem, variableIndex)}
                </Form.Group>
                {this.toggleVariables(lastHistoryItem)}
            </Container>
        );
    }

    toggleVariables(entry){
        if(this.props.formula.showVariables) {
            if(entry.gameVariables.size == 0){
                return (
                    <p><var>e</var> = &#123;&#160;&#125;</p>
                );
            } else {
                return (
                    <p><var>e</var> = &#123; {Array.from(entry.gameVariables).map(([key, value]) => key + ' ↦ ' + value).join(', ')} &#125;</p>
                );
            }
        } else {
            return null;
        }
    }

    writeVariables(){
        let writeOrHide = 'Zobraziť'
        if(this.props.formula.showVariables){
            writeOrHide = 'Skryť';
        }
        return(
            <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.getVariables(this.props.index)}>{writeOrHide} ohodnotenie premenných</Button>
        );
    }

    chooseCommitment(messages) {
        return (
            <div className={"d-flex justify-content-center"}>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameCommitment(this.props.index, true, messages, ['Pravdivá'])}>Pravdivá</Button>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameCommitment(this.props.index,false, messages, ['Nepravdivá'])}>Nepravdivá</Button>
            </div>
        );
    }

    chooseFormula(entry, leftCommitment, rightCommitment, messages) {
        let leftStringCommitment = this.getCommitmentText(leftCommitment);
        let rightStringCommitment = this.getCommitmentText(rightCommitment);
        let leftUserMessage = [entry.currentFormula.subLeft.toString() + ' je ' + leftStringCommitment];
        let rightUserMessage = [entry.currentFormula.subRight.toString() + ' je ' + rightStringCommitment];
        return (
            <div className={"d-flex justify-content-center"}>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameNextFormula(this.props.index, entry.currentFormula.subLeft, leftCommitment, messages, leftUserMessage)}>
                    {leftUserMessage}
                </Button>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameNextFormula(this.props.index, entry.currentFormula.subRight, rightCommitment, messages, rightUserMessage)}>
                    {rightUserMessage}
                </Button>
                {this.writeVariables()}
            </div>
        );
    }

    chooseDomainValue(entry, messages, variableIndex){
        let varName = 'n' + variableIndex;
        return (
            <div className={"d-flex justify-content-center"}>
                <DropdownButton size='sm' variant="outline-primary" className={"rounded mr-3"} alignRight as={ButtonGroup} title="Vyber prvok z domény">
                    {this.props.domain.map((value, index) =>
                        <Dropdown.Item size='sm' eventKey={index} onClick={() => this.props.setGameDomainChoice(this.props.index, value, messages, [`Premenná ${varName} označuje prvok ${value}`])}>{value}</Dropdown.Item>
                    )}
                </DropdownButton>
                {this.writeVariables()}
            </div>
        );
    }

    chooseImplication(messages, currentFormula, commitment){
        let leftImplication = new Implication(currentFormula.subLeft, currentFormula.subRight);
        let rightImplication = new Implication(currentFormula.subRight, currentFormula.subLeft);
        let leftUserMessage = [leftImplication.toString() + ' je ' + this.getCommitmentText(commitment)];
        let rightUserMessage = [rightImplication.toString() + ' je ' + this.getCommitmentText(commitment)];
        return (
            <div className={"d-flex justify-content-center"}>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameNextFormula(this.props.index, leftImplication, commitment, messages, leftUserMessage)}>
                    {leftUserMessage}
                </Button>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.setGameNextFormula(this.props.index, rightImplication, commitment, messages, rightUserMessage)}>
                    {rightUserMessage}
                </Button>
                {this.writeVariables()}
            </div>
        );
    }

    chooseOk(messages){
        return (
            <div className={"d-flex justify-content-center"}>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.continueGame(this.props.index, messages, ['Pokračuj'])}>Pokračuj</Button>
                {this.writeVariables()}
            </div>
        );
    }

    chooseEndGame(){
        return (
            <div className={"d-flex justify-content-center"}>
                <Button size='sm' variant="outline-primary" className={"rounded mr-3"} onClick={() => this.props.endGame(this.props.index)}>Ukončiť hru</Button>
                {this.writeVariables()}
            </div>
        );
    }

    getChoice(entry, variableIndex){
        const messages = this.generateMessage(entry, variableIndex);
        if(entry.gameCommitment === null){
            return this.chooseCommitment(messages);
        } else {
            switch(entry.currentFormula.getType(entry.gameCommitment)){
                case ATOM:
                    return this.chooseEndGame();
                case PLAYER_OPERATOR:
                    const subFormulasCommitment = entry.currentFormula.getSubFormulasCommitment(entry.gameCommitment);
                    return this.chooseFormula(entry, subFormulasCommitment[0], subFormulasCommitment[1], messages);
                case PLAYER_QUANTIFIER:
                    return this.chooseDomainValue(entry, messages, variableIndex);
                case GAME_OPERATOR:
                case GAME_QUANTIFIER:
                    return this.chooseOk(messages);
            }
        }
    }

    generateMessage(entry, variableIndex){
        let varName = 'n' + variableIndex;
        let messages = [];
        if(entry.gameCommitment === null){
            messages.push(FIRST_QUESTION(entry.currentFormula))
            return messages;
        } else {
            const structure = this.props.structureObject;
            const subFormulas = entry.currentFormula.getSubFormulas();
            const subFormulasCommitment = entry.currentFormula.getSubFormulasCommitment(entry.gameCommitment);
            messages.push(ENTRY_SENTENCE(entry.currentFormula.toString(), this.getCommitmentText(entry.gameCommitment)));
            switch(entry.currentFormula.getType(entry.gameCommitment)){
                case ATOM:
                    const initial = this.props.formula.gameHistory[1];
                    if(entry.gameCommitment === entry.currentFormula.eval(structure, entry.gameVariables)){
                        messages.push(WIN_1(entry.currentFormula, this.getCommitmentText(entry.gameCommitment),
                            this.getWinningEvaluatedFormula(entry.currentFormula, structure, entry.gameVariables, entry.gameCommitment)));
                        messages.push(WIN_2(initial.currentFormula,this.getCommitmentText(initial.gameCommitment)));
                    } else {
                        messages.push(LOSS(entry.currentFormula,this.getCommitmentText(!entry.gameCommitment),
                            this.getLoosingEvaluatedFormula(entry.currentFormula, structure, entry.gameVariables, entry.gameCommitment)));
                        if(initial.currentFormula.eval(structure, initial.gameVariables) === initial.gameCommitment){
                            messages.push(COULD_WON(initial.currentFormula, this.getCommitmentText(initial.gameCommitment)));
                        } else {
                            messages.push(COULD_NOT_WON(initial.currentFormula, this.getCommitmentText(initial.gameCommitment)));
                        }
                    }
                    return messages;

                case PLAYER_OPERATOR:
                    messages.push(OPERATOR_QUESTION());
                    messages.push(FIRST_FORMULA_OPTION(subFormulas[0], this.getCommitmentText(subFormulasCommitment[0])));
                    messages.push(SECOND_FORMULA_OPTION(subFormulas[1], this.getCommitmentText(subFormulasCommitment[1])));
                    return messages;

                case GAME_OPERATOR:
                    messages.push(OPERATOR_ANSWER(entry.nextMove.formula, this.getCommitmentText(entry.nextMove.commitment)));
                    return messages;

                case PLAYER_QUANTIFIER:
                    const form = entry.currentFormula.subFormula.substitute(entry.currentFormula.variableName, varName);
                    messages.push(QUANTIFIER_QUESTION(varName, form, this.getCommitmentText(entry.gameCommitment)));
                    return messages;

                case GAME_QUANTIFIER:
                    messages.push(QUANTIFIER_ANSWER_1(this.getCommitmentText(entry.nextMove.commitment), entry.nextMove.formula));
                    messages.push(QUANTIFIER_ANSWER_2(entry.nextMove.variables[0], entry.nextMove.variables[1]));
                    return messages;
            }
        }
    }

    getWinningEvaluatedFormula(currentFormula, structure, variables, gameCommitment){
        if(currentFormula instanceof PredicateAtom){
            if(gameCommitment) {
                return EVALUATED_PREDICATE_IN(this.getEvaluatedPredicateFormula(currentFormula, structure, variables), currentFormula.name);
            } else {
                return EVALUATED_PREDICATE_NOT_IN(this.getEvaluatedPredicateFormula(currentFormula, structure, variables), currentFormula.name);
            }
        } else {
            if(gameCommitment) {
                return EVALUATED_EQUALITY(currentFormula.subLeft.eval(structure, variables), currentFormula.subRight.eval(structure, variables));
            } else {
                return EVALUATED_INEQUALITY(currentFormula.subLeft.eval(structure, variables), currentFormula.subRight.eval(structure, variables));
            }
        }
    }

    getLoosingEvaluatedFormula(currentFormula, structure, variables, gameCommitment){
        if(currentFormula instanceof PredicateAtom){
            if(gameCommitment) {
                return EVALUATED_PREDICATE_NOT_IN(this.getEvaluatedPredicateFormula(currentFormula, structure, variables), currentFormula.name);
            } else {
                return EVALUATED_PREDICATE_IN(this.getEvaluatedPredicateFormula(currentFormula, structure, variables), currentFormula.name);
            }
        } else {
            if(gameCommitment) {
                return EVALUATED_INEQUALITY(currentFormula.subLeft.eval(structure, variables), currentFormula.subRight.eval(structure, variables));
            } else {
                return EVALUATED_EQUALITY(currentFormula.subLeft.eval(structure, variables), currentFormula.subRight.eval(structure, variables));
            }
        }
    }

    getEvaluatedPredicateFormula(currentFormula, structure, variables){
        const res = currentFormula.terms
            .map(term => term.eval(structure, variables))
            .join(', ');
        if (currentFormula.terms.length > 1) {
            return `(${res})`;
        }
        return res;
    }

    getCommitmentText(commitment){
        return commitment ? 'pravdivá' : 'nepravdivá';
    }

    getRandom(size){
        return Math.floor(Math.random() * size);
    }
}