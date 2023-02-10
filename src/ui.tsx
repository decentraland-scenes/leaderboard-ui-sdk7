import {
  engine,
  Transform

} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { isMenuVisible, toggleMenuVisibility } from './systems'



const uiComponent = () => (
  <UiEntity
    uiTransform={{
      width: 300,
      margin: { top: '90px', left: '300px' },
      padding: { top: 10, bottom: 10, left: 10, right: 10 },
      display: isMenuVisible()? 'flex': 'none'
    }}
    uiBackground={{ color: Color4.create(0.5, 0.8, 0.1, 0.6) }}
  >
    <UiEntity
      uiTransform={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <Label
        value='SDK 7'
        fontSize={32}
        uiTransform={{height: 40}}
        uiBackground={{ color: Color4.fromHexString('#fbf0f0') }}
      />
    </UiEntity>
    <UiEntity
      uiTransform={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
      }}
    >
      <Label
        value={`Player: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{height: 40}}
        uiBackground={{ color: Color4.fromHexString('#fbf0f0') }}
      />
    </UiEntity>
    <Button
     uiTransform={{
       width: 100,
       height: 30,
       margin: { top: '35px', left: '500px' }
     }}
     value="Toggle Menu"
     uiBackground={{ color: Color4.Red() }}
     onMouseDown={toggleMenuVisibility} 
   />

    //copied from sdk docs
    <UiEntity>
      // Menu
      <UiEntity
        uiTransform={{
          width: '80%',
          height: '100px',
          alignContent: 'center',
          justifyContent: 'center',
          display: isMenuVisible()? 'flex': 'none'
        }}
        uiBackground={{ color: Color4.Green() }}
      />  
      <Label
        value={`xxx: ${getPlayerPosition()}`}
        fontSize={18}
        uiTransform={{height: 40}}
        uiBackground={{ color: Color4.fromHexString('#fbf0f0') }}
      />
      // button
      <Button
        uiTransform={{
          width: 100,
          height: 30,
          margin: { top: '35px', left: '500px' }
        }}
        value="Toggle Menu"
        uiBackground={{ color: Color4.Red() }}
        onMouseDown={toggleMenuVisibility} 
      />
    </UiEntity>

  </UiEntity>
  
  
)


const uiComponent2 = () => (
    <UiEntity>
    <UiEntity
      uiTransform={{
          width: 400,
          height: 200,
          //flexDirection:'row',
          //justifyContent: 'flex-start',
          //alignItems: 'flex-start',
          display: 'flex',
          margin: { top: '200px', left: '200px' }
        }}
        uiBackground={{ color: Color4.Blue() }}
    > //table
      <UiEntity>//start row
        <UiEntity
            uiTransform={{
              width: 200,
              height: 40,

              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Red() }}
          >
            <Label
              value='Player!'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              uiBackground={{ color: Color4.Red() }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 200,
              height: 40,
              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Purple() }}
          >
            <Label
              value='Score'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              //color: Color4.Black() 
              //uiBackground={{ color: Color4.Black() }}
            />
          
        </UiEntity>
      </UiEntity>//end label row

      //START NEXT ROW
      //START NEXT ROW //START NEXT ROW //START NEXT ROW
      //START NEXT ROW

      

      //START NEXT ROW
      //START NEXT ROW //START NEXT ROW //START NEXT ROW
      //START NEXT ROW

      <UiEntity>//start  row2
        <UiEntity
            uiTransform={{
              width: 200,
              height: 40,

              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Teal() }}
          >
            <Label
              value='SDK'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              uiBackground={{ color: Color4.Red() }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 200,
              height: 40,
              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{avatarTexture: {userId: ""}}}
          >
            <Label
              value='0'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              //color: Color4.Black() 
              //uiBackground={{ color: Color4.Black() }}
            />
          
          
        </UiEntity>
      </UiEntity>//end   row2
      
      <UiEntity>//start  row1
        <UiEntity
            uiTransform={{
              width: 200,
              height: 40,

              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Teal() }}
          >
            <Label
              value='Will'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              uiBackground={{ color: Color4.Red() }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 200,
              height: 40,
              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Gray() }}
          >
            <Label
              value='2'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              //color: Color4.Black() 
              //uiBackground={{ color: Color4.Black() }}
            />
          
        </UiEntity>
      </UiEntity>//end   row1
      
      <UiEntity>
      {generateText()}
    </UiEntity>

    </UiEntity>//end table
  </UiEntity>//whole canvas
)

const uiComponent3 = () => (
  
    
  <UiEntity>

    <UiEntity
        uiTransform={{
          width: 400,
          height: 200,
          //flexDirection:'row',
          //justifyContent: 'flex-start',
          //alignItems: 'flex-start',
          display: 'flex',
          margin: { top: '200px', left: '200px' }
        }}
        uiBackground={{ color: Color4.Blue() }}
      > //table
      
      //#region First bar with names of each column
      <UiEntity
            uiTransform={{
              width: 200,
              height: 40,
              display: 'flex',

            }}
          >
            <Label
              value='Player'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
            />
          </UiEntity>
          <UiEntity
            uiTransform={{
              width: 200,
              height: 40,
              display: 'flex',
              //margin: { top: '200px', left: '200px' }
            }}
            uiBackground={{ color: Color4.Purple() }}
          >
            <Label
              value='Score'
              fontSize={24}
              uiTransform={{
                margin: { top: '10px',left: '50%' }
              }}
              //color: Color4.Black() 
              //uiBackground={{ color: Color4.Black() }}
            />
          
      </UiEntity>
      //#endRegion
    
      {generateText()}
    </UiEntity>
  </UiEntity>
)



function getPlayerPosition() {
  const playerPosition = Transform.getOrNull(engine.PlayerEntity)
  if (!playerPosition) return ' no data yet'
  const { x, y, z } = playerPosition.position
  return `{X: ${x.toFixed(2)}, Y: ${y.toFixed(2)}, z: ${z.toFixed(2)} }`
}


 
export function setupUi() {
 //ReactEcsRenderer.setUiRenderer(uiComponent)
 ReactEcsRenderer.setUiRenderer(uiComponent3)
 //ReactEcsRenderer.setUiRenderer(uiComp2)
}







type MyFakeData = {name:string,score:number}

export let fakeLeaderboardData: MyFakeData[] = [
  {name: "Francesco",  score:100},
  {name: "Will", score:200},
  {name: "Anis", score:400},
  {name: "Bence", score:300},
  {name: "Michal", score:600}
] 



let randomizeFakeLeadboardData: MyFakeData[] = []

export function randomizeData(){
  randomizeFakeLeadboardData = fakeLeaderboardData.slice(0, Math.floor(Math.random()*fakeLeaderboardData.length) )
  if(Math.random() > .5){
      randomizeFakeLeadboardData.reverse()
  }
}



 

function generateText(){ 
  const arr = []
  for (let i = 0; i < randomizeFakeLeadboardData.length; i++) {
    const itm = randomizeFakeLeadboardData[i]
    arr.push(<TextComponent name={itm.name} score={itm.score} rowNum={i}/> ) 

    /*<TextComponent value={entity.toString()} key={entity} /> )  */
  }

  return arr
}
   
//BLA metti immagini o altro che sia nella riga qua, ogni cosa e una cella 
function TextComponent(props: { name: string; score: string | number; rowNum: number }) {
  console.log("AAA.TextComponent", props)
  const rowColor = props.rowNum %2== 0 ? Color4.Gray(): Color4.Red() 
  return      <UiEntity>     
      <UiEntity
        uiTransform={{
          width: 200,
          height: 40,
          display: 'flex',
          //margin: { top: '200px', left: '200px' }
        }}
        uiBackground={{ color: rowColor }}
      >
        <Label
          value= {props.name}
          fontSize={24}
          uiTransform={{
            margin: { top: '10px',left: '50%' }
          }}
        />
      </UiEntity>
      <UiEntity
        uiTransform={{
          width: 200,
          height: 40,
          display: 'flex',
          //margin: { top: '200px', left: '200px' }
        }}
        uiBackground={{ color: rowColor }}
      >
        <Label
          value= {props.score.toString()}
          fontSize={24}
          uiTransform={{
            margin: { top: '10px',left: '50%' }
          }}

        />
      </UiEntity>
  </UiEntity>
}
