import { useContext, useEffect, useState } from 'react';
import CanvasContext from '../Context';
import Style from '../CSS/CanvasPuzzle.module.css'


const CanvasHeader = () => {
    console.log("Header 렌더링");
    const [message,SetMessage] = useState<string>("이미지 파일을 등록해주세요.");
    const context = useContext(CanvasContext);
    useEffect(() => {
        console.log("CanvasHeader SetUp");
        context.current.SetMessage = SetMessage;
    },[context])
    
    return (
        <div id={Style.CanvasHeader}>
            <span id={Style.CanvasHeaderMessage} >{message}</span>
        </div>
    )
}

export default CanvasHeader;