import { useContext } from "react";
import { animated, useSpring } from "react-spring";
import CommonContext from "../../../Context";
import Style from '../../../CSS/CanvasPuzzle.module.css'
import { CommonContextType } from "../../../types";

const LineElement = (props : {mode : 'Horizontal' | 'Vertical',position : number}) => {

    const context = useContext<CommonContextType>(CommonContext);
    const anim = useSpring(props.mode === 'Horizontal' ? 
    { to: { 'width' : context.current.containerSize }, from: { 'width' : 0 } } : 
    { to: { 'height' : context.current.containerSize }, from: { 'height' : 0 } }
    );

    return (
        <div 
        className={`${Style.Line} ${Style[props.mode]}`} 
        style={props.mode === 'Horizontal' ? {top : props.position} : {left : props.position}}
        >
            <animated.div style={anim}>

            </animated.div>
        </div>
    )
}

export default LineElement;