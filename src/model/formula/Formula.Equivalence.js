import Formula from "./Formula";
import {
    GAME_OPERATOR,
    PLAYER_OPERATOR
} from "../../constants/gameConstants";
import Implication from "./Formula.Implication";

/**
 * Represent equality symbol
 * @author Richard Toth
 * @class
 * @extends Formula
 */
class Equivalence extends Formula {

    /**
     *
     * @param {Formula} subLeft
     * @param {Formula} subRight
     */
    constructor(subLeft, subRight) {
        super();
        this.subLeft = subLeft;
        this.subRight = subRight;
    }

    /**
     *
     * @param {Structure} structure
     * @param {Map} e
     * @return {boolean}
     */
    eval(structure, e) {
        const left = this.subLeft.eval(structure, e);
        const right = this.subRight.eval(structure, e);
        return left == right;
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return `(${this.subLeft.toString()} ↔ ${this.subRight.toString()})`;
    }

    createCopy(){
        return new Equivalence(this.subLeft.createCopy(), this.subRight.createCopy());
    }

    getType(commitment){
        return commitment ? GAME_OPERATOR : PLAYER_OPERATOR;
    }

    getSubFormulas(){
        const toRightImpl = new Implication(this.subLeft, this.subRight);
        const toLeftImpl = new Implication(this.subRight, this.subLeft);
        return [toRightImpl, toLeftImpl];
    }

    substitute(from, to, bound){
        return new Equivalence(this.subLeft.substitute(from, to, bound), this.subRight.substitute(from, to, bound));
    }

    getSubFormulasCommitment(commitment){
        return [commitment, commitment];
    }

    getVariables(){
        return this.subLeft.getVariables().concat(this.subRight.getVariables());
    }
}

export default Equivalence;