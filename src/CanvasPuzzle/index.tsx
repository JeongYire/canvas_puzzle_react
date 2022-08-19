import { useRef } from "react";
import Style from './CSS/CanvasPuzzle.module.css'
import CanvasHeader from "./CanvasHeader";
import CanvasBody from "./CanvasBody";
import CanvasFooter from "./CanvasFooter";
import CommonContext from "./Context";
import { CommonContextRef } from "./types";



const CanvasPuzzle = () => {

    const value  = useRef<CommonContextRef>({SetImage : undefined,SetMessage : undefined,lineCount : 2,containerSize : 480,puzzleCount : 3});

    return (
        <div id={Style.CanvasArea}>
            <CommonContext.Provider value={value}>
                <CanvasHeader/>
                <CanvasBody/>
                <CanvasFooter />
            </CommonContext.Provider>
        </div>
    )
}

export default CanvasPuzzle;