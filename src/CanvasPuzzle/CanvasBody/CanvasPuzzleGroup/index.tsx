import React, { MutableRefObject, useContext, useEffect, useRef, useState } from 'react';
import CommonContext from '../../Context';
import Style from '../../CSS/CanvasPuzzle.module.css'
import { CommonContextType, CanvasPuzzleType, LineType } from '../../types';
import CanvasPuzzleElement from './CanvasPuzzleElement';
import LineElement from './LineElement';

const CanvasPuzzleGroup = () => {

    const [render,SetRender] = useState(false);
    const context = useContext<CommonContextType>(CommonContext);

    const width = Math.floor(context.current.containerSize / context.current.puzzleCount);

    const canvasRenderingContextArray : MutableRefObject<MutableRefObject<any>[]> = useRef([]);
    const [lineObjects,SetLineObjects] = useState<LineType[]>([]);

  
    const AnimationAction = (CallBack : () => void) => {

        let limit = context.current.lineCount * 2;
        let count = 0;

        const Action = () => {
            
            setTimeout(() => {
                SetLineObjects((prev) => {
                    let lineObject : LineType;
                    if(count < context.current.lineCount){
                        lineObject = {mode : 'Vertical',index : count}; 
                    }else{
                        lineObject = {mode : 'Horizontal',index : (count-2)};
                    }
                    count += 1;
                    if(count < limit){    
                        Action();
                    }else{
                        setTimeout(() => {
                            CallBack();
                        },1000);
                    }
                    return [...prev,lineObject]
                })

            }, 200);
        }

        Action();

    }

    const MakingPuzzleAction = () : CanvasPuzzleType[] => {

    
        const defaultValue : CanvasPuzzleType[] = [];

        for(let i = 0; i < 8; i++){

            const origin_x = i % 3;
            const origin_y = parseInt(`${(i) / 3}`);

            defaultValue[i] = {id: i ,origin_x : origin_x, origin_y : origin_y,current_x : origin_x, current_y : origin_y};
        }
        
        return defaultValue;
    }

    const canvasPuzzleArray = useRef<CanvasPuzzleType[]>(MakingPuzzleAction())

    const SetImageAction = (image : HTMLCanvasElement) => {
        
        let count = 0;

        const Check = () => {
            return count < (context.current.puzzleCount * context.current.puzzleCount) - 1;
        }

        while(Check()){

            const puzzle = canvasPuzzleArray.current[count];
            const context = canvasRenderingContextArray.current[count].current;

            // 우선 퍼즐조각부터 렌더링합니다
            context.drawImage(image,puzzle.origin_x*width,puzzle.origin_y*width,width,width,0,0,width,width);

            count++;

        }

        AnimationAction(() => {

            count = 0;
            const ids : number[] = [];

            while (Check()){

                const puzzle = canvasPuzzleArray.current[count];
    
                // ids 안에 존재하지 않으면서도, puzzle의 id와 다른 객체배열을 반환합니다 
                const anotherGroup = canvasPuzzleArray.current.filter( obj => obj.id !== puzzle.id && !(ids.includes(obj.id)) && !(ids.includes(puzzle.id)) );
                const anotherGroupLength = anotherGroup.length;
    
                if(anotherGroupLength > 0){
    
                    // 길이가 1일경우 랜덤이 무의미하기 때문에 제일 첫번째 인자를 반환합니다, 그게 아닐경우 무작위로 인자를 하나 가져옵니다
                    const another = anotherGroupLength === 1 ? anotherGroup[0] : anotherGroup[Math.floor(Math.random() * anotherGroupLength)];
                
                    // 가져온 인자와 현재 객체의 position 값을 바꿉니다.
                    puzzle.current_x = another.origin_x;
                    puzzle.current_y = another.origin_y;
                    another.current_x = puzzle.origin_x;
                    another.current_y = puzzle.origin_y;
    
                    // 한번에 두 객체의 위치를 바꿧기때문에 이 두객체의 id값을 넣습니다...
                    ids.push(puzzle.id,another.id);
                }

                count++;
    
            }

            context.current.isDone = true;
            SetRender(!render);
           
        });
    }

    useEffect(() => {
        context.current.SetImage = SetImageAction;
    },[])
    

    return (
        <div id={Style.CanvasPuzzleGroup}>
            <React.Fragment>
                {
                    lineObjects.map((value) => {

                        return <LineElement key={`animated_${value.mode}_${value.index}`}  mode={value.mode} position={(value.index+1) * width}/>
                    })
                }
                {                
                    canvasPuzzleArray.current.map((value,index) => {
                        return (
                            <CanvasPuzzleElement 
                                ChangeAction={(target : CanvasPuzzleType, posX : number, posY : number) => {
                                    const another = canvasPuzzleArray.current.find( obj => obj.current_x == posX && obj.current_y == posY);

                                    if(!another){
                                        target.current_x = posX;
                                        target.current_y = posY;

                                        SetRender(!render);
                                    }

                                    
                                }}
                                CheckAction={()=>{
                                    
                                    const totalPuzzle = context.current.puzzleCount * context.current.puzzleCount;
                                    const check = canvasPuzzleArray.current.filter( obj => obj.current_x == obj.origin_x && obj.current_y == obj.origin_y );
                                    console.log(check.length);
                                    if(check.length == (totalPuzzle-1)){
                                        context.current.SetMessage?.('축하합니다! 전부 완성하셨네요!');
                                    }

                                }}
                                object={value}
                                key={'canvas_div_' + index} 
                                canvasRenderingContextArray={canvasRenderingContextArray} 
                                x={(value.current_x+1)} 
                                y={(value.current_y+1)} 
                            />
                        )
                    })
                }
            </React.Fragment>
        </div>
    )

}

export default CanvasPuzzleGroup;