import { Dispatch } from "react"

export type CommonContextType = React.MutableRefObject<CommonContextRef>;

export type CommonContextRef = {
    SetImage : ((image : HTMLCanvasElement) => void) | undefined,
    SetMessage : Dispatch<React.SetStateAction<string>> | undefined,  
    lineCount : number,
    containerSize : number,
    puzzleCount : number,
}

export type CanvasPuzzleType = {
    id : number,
    current_x : number,
    current_y : number,
    origin_x : number,
    origin_y : number,
}

export type LineType = {
    mode : 'Vertical' | 'Horizontal',
    index : number,
}