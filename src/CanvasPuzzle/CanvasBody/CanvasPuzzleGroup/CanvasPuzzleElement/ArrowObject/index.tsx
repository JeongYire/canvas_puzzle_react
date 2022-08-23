import { MutableRefObject, RefObject, useEffect, useState } from "react";
import Style from '../../../../CSS/CanvasPuzzle.module.css'
import { MovePositionAPI } from "../../../../types";

const ArrowObject = (props : {e:boolean,w:boolean,s:boolean,n:boolean,MovePosition: MovePositionAPI}) => {

    const [visible,SetVisible] = useState(false);
    return (
        <div className={Style.ArrowObject} onMouseEnter={() => {SetVisible(true)}} onMouseLeave={() => {SetVisible(false)}}>
            {visible && (
                <div className={Style.Arrow}>
                    {props.e && <span className={Style.East} onClick={()=>{props.MovePosition('e')}}>
                        {'▶'}
                    </span>}
                    {props.w && <span className={Style.West} onClick={()=>{props.MovePosition('w')}}>
                        {'◀'}
                    </span>}
                    {props.s && <span className={Style.South} onClick={()=>{props.MovePosition('s')}}>
                        {'▼'}
                    </span>}
                    {props.n && <span className={Style.North} onClick={()=>{props.MovePosition('n')}}>
                        {'▲'}
                    </span>}
                </div>
            )}
        </div>
    )

}

export default ArrowObject;