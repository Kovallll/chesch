import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black_king.png'
import whiteLogo from '../../assets/white_king.png'

export class King extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color, cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.KING;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) return false
        if(Math.abs(this.cell.x - target.x) > 1 || Math.abs(this.cell.y - target.y) > 1) return false
        return true;
    }
}