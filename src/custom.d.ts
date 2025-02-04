declare module 'tic-tac-toe-minimax' {

    type Tplayer = 'X' | 'O'
    type TboardElement = Tplayer | number
    type Tdifficulty = "Easy" | "Normal" | "Hard"
    type Tsymbol = {
        huPlayer: Tplayer,
        aiPlayer: Tplayer
    }
    type Twinner = "huPlayer" | "aiPlayer" | "draw" | null

    export function ComputerMove(board: TboardElement[], symbols: Tsymbol, difficulty: Tdifficulty): number
    export function GameStep(board: TboardElement[], symbols: Tsymbol, difficulty: Tdifficulty): {
        winner: Twinner,
        board: TboardElement[]
    }
}
