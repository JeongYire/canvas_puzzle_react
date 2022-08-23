import { createRef, MutableRefObject, useContext, useEffect, useRef } from "react";
import CommonContext from "../../../Context";
import Style from '../../../CSS/CanvasPuzzle.module.css'
import { CommonContextType,CanvasPuzzleType, MovePositionAPI } from "../../../types";
import ArrowObject from "./ArrowObject";
import { animated, useSpring } from 'react-spring';

const CanvasPuzzleElement = (props : {CheckAction : () => void;ChangeAction : (target : CanvasPuzzleType,posX : number,posY : number) => void,object : CanvasPuzzleType,canvasRenderingContextArray : MutableRefObject<MutableRefObject<any>[]>, x : number, y : number}) => {

    const context = useContext<CommonContextType>(CommonContext);
    const width = Math.floor(context.current.containerSize / context.current.puzzleCount);
    const currentPosition = useRef({x : props.x,y : props.y});
    const movePosition = useRef(false);

    const anim = useSpring({ 
        from: { 'left' : (currentPosition.current.x-1) * width, 'top' : (currentPosition.current.y-1) * width}, 
        to: { 'left' : (props.x-1) * width, 'top' : (props.y-1) * width },
        config: {
            duration: movePosition.current ? 125 : 500, // duration for the whole animation form start to end   
        },
        onRest: () => {
            
            if(movePosition.current){
                props.CheckAction();
                movePosition.current = false;
            }
            
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

    const MovePosition : MovePositionAPI = (dir : 'e' | 'w' | 's' | 'n') => {

        movePosition.current = true;

        switch (dir) {
            case 'e':
                props.ChangeAction(props.object,props.object.current_x + 1,props.object.current_y)
                break;
            case 'w':
                props.ChangeAction(props.object,props.object.current_x- 1,props.object.current_y)
                break;
            case 's':
                props.ChangeAction(props.object,props.object.current_x,props.object.current_y + 1)
                break;
            case 'n':
                props.ChangeAction(props.object,props.object.current_x,props.object.current_y - 1)
                break;                
        }
    }

    return (
        <animated.div className={Style.CanvasPuzzle} style={anim}>
            {(!context.current.isAnimation && context.current.isDone) && <ArrowObject MovePosition={MovePosition} e={props.x < 3} w={props.x > 1} s={props.y < 3} n={props.y > 1}/>}
            <canvas className={Style.CanvasElement} ref={canvasRef}/>
        </animated.div>
    )

}

export default CanvasPuzzleElement;