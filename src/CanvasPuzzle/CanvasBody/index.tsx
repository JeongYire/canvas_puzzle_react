import Style from '../CSS/CanvasPuzzle.module.css'
import CanvasPuzzleGroup from './CanvasPuzzleGroup';


const CanvasBody = () => {
    return (
        <div id={Style.CanvasBody}>
            <CanvasPuzzleGroup />
        </div>
    )
}

export default CanvasBody;