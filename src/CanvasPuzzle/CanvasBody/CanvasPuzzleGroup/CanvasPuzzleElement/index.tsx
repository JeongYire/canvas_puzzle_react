import { createRef, MutableRefObject, useContext, useEffect, useRef } from "react";
import CommonContext from "../../../Context";
import Style from '../../../CSS/CanvasPuzzle.module.css'
import { CommonContextType } from "../../../types";
import ArrowObject from "./ArrowObject";
import { animated, useSpring } from 'react-spring';

const CanvasPuzzleElement = (props : {canvasRenderingContextArray : MutableRefObject<MutableRefObject<any>[]>, x : number, y : number}) => {

    const context = useContext<CommonContextType>(CommonContext);
    const width = Math.floor(context.current.containerSize / context.current.puzzleCount);
    const currentPosition = useRef({x : props.x,y : props.y});
    const anim = useSpring({ 
        from: { 'left' : (currentPosition.current.x-1) * width, 'top' : (currentPosition.current.y-1) * width}, 
        to: { 'left' : (props.x-1) * width, 'top' : (props.y-1) * width },
        config: {
            duration: 500, // duration for the whole animation form start to end   
        },
        onRest: () => {
            console.log("끝");
        }
    });
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef : MutableRefObject<any> = createRef();

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        canvas.width = width;
        canvas.height = width;
        contextRef.current = canvas.getContext('2d');
        props.canvasRenderingContextArray.current.push(contextRef);
    },[]);

    return (
        <animated.div className={Style.CanvasPuzzle} style={anim}>
            {<ArrowObject e={props.x < 3} w={props.x > 1} s={props.y < 3} n={props.y > 1}/>}
            <canvas className={Style.CanvasElement} ref={canvasRef}/>
        </animated.div>
    )

}

export default CanvasPuzzleElement;