export default class me {
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
        ]
    };

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.isOutOfBorder()) {
            this.activePiece.x += 1;  //isOutOfBorder method usage
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.isOutOfBorder()) {
            this.activePiece.x -= 1;  //isOutOfBorder method usage
        }
    }

    movePieceDown() {
        this.activePiece.y += 1;

        if (this.isOutOfBorder()) {
            this.activePiece.y -= 1;  //isOutOfBorder method usage
        }
    }

    isOutOfBorder() {
        const playfield = this.playfield;       //destructing assignment
        const { y, x } = this.activePiece;
        
        return playfield[y] === undefined || playfield[y][x] === undefined; //whether is on border
    }

    pieceLocking() {
        const { y: pieceY, x: pieceX, blocks} = this.activePiece; //destructing assignment

        for (let y = 0; y < blocks.length; y++) {
            for (let x = 0; x < blocks[y].length; x++) {
                this.playfield[pieceY + y][pieceX + x] = blocks[y][x];    //transfering blocks properties to the playfield            
            }                        
        }
    }
}