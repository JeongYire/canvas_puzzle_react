import { useContext } from 'react';
import CommonContext from '../Context';
import Style from '../CSS/CanvasPuzzle.module.css'
import { CommonContextType } from '../types';


const CanvasFooter = (prop : {}) => {
    console.log("Footer 렌더링");

    const context = useContext<CommonContextType>(CommonContext);

    const ResizeImage = (img : HTMLImageElement) => {
        const oc = document.createElement('canvas');
        const octx = oc.getContext('2d');

        oc.width = img.width;
        oc.height = img.height;

        octx?.drawImage(img, 0, 0, oc.width, oc.height);

        context.current.SetImage?.(oc);
        //ctx.drawImage(oc, 0, 0, oc.width, oc.height, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
 
    const OnChangeEvent = (inputEvent : any) => {
        const image : HTMLImageElement = new Image(480,480);
        image.onload = () => {
            //context.current.SetImage?.(image);
            ResizeImage(image)
        };

        if(inputEvent.target.files && inputEvent.target.files[0]) image.src = URL.createObjectURL(inputEvent.target.files[0]);
    }

    return (
        <div id={Style.CanvasFooter}>
            <input type={'file'} accept={"image/*"} onChange={OnChangeEvent}/>
        </div>
    )
}

export default CanvasFooter;