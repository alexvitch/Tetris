export default class Game {
    score = 0;
    lines = 0;
    level = 0;
    playfield = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    activePiece = {
        x: 0,
        y: 0,
        blocks: [
            [0,1,0],
            [1,1,1],
            [0,0,0]
        ],
        
    };

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) { //hasCollision method usage returning block on previous position on playfield's bounds
            this.activePiece.x += 1;  
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;  
        }
    }

    movePieceDown() {
        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;  
            this.pieceLocking();
        }
    }

    rotatePiece() {
        const blocks = this.activePiece.blocks;
        const length = blocks.length;
        const temp = [];

        for (let i = 0; i < length; i++) {
            temp[i] = new Array(length).fill(0);  //creating new temporary array filling with 0
        }

        for (let y = 0; y < length; y++) {              
            for (let x = 0; x < length; x++) {          // calculating new piece position  
                temp[x][y] = blocks[length - 1 - y][x];  
            }            
        }

        this.activePiece.blocks = temp;               // assigning temporary array to block's array

        if(this.hasCollision()) {
            this.activePiece.blocks = blocks;        //rotating piece in backwards
        }
    }

    hasCollision() {
        const { y: pieceY, x: pieceX, blocks} = this.activePiece;   //transfering blocks properties to the playfield
        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (
                    blocks[y][x] !== 0 && 
                    ((this.playfield[pieceY + y] === undefined || this.playfield[pieceY + y][pieceX + x] === undefined) || //whether is on border: at first y-line, then y-line + x-line
                    this.playfield[pieceY + y][pieceX + x])
                    ) { 
                    return true;
                }                
            }                        
        }
        
        return false; 
    }

    pieceLocking() {
        const { y: pieceY, x: pieceX, blocks} = this.activePiece; //destructing assignment

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                if (blocks[y][x]) {
                    this.playfield[pieceY + y][pieceX + x] = blocks[y][x];  //transfering blocks properties to the playfield 
                }             
            }                        
        }
    }
}