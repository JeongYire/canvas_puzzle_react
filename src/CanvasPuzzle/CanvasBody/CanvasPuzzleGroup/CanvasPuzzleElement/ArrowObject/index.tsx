import { MutableRefObject, RefObject, useEffect, useState } from "react";
import Style from '../../../../CSS/CanvasPuzzle.module.css'

const ArrowObject = (props : {e:boolean,w:boolean,s:boolean,n:boolean}) => {

    const [visible,SetVisible] = useState(false);
    return (
        <div className={Style.ArrowObject} onMouseEnter={() => {SetVisible(true)}} onMouseLeave={() => {SetVisible(false)}}>
            {visible && (
                <div className={Style.Arrow}>
                    {props.e && <span className={Style.East}>
                        {'▶'}
                    </span>}
                    {props.w && <span className={Style.West}>
                        {'◀'}
                    </span>}
                    {props.s && <span className={Style.South}>
                        {'▼'}
                    </span>}
                    {props.n && <span className={Style.North}>
                        {'▲'}
                    </span>}
                </div>
            )}
        </div>
    )

}

export default ArrowObject;