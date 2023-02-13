import {
  engine,
  Transform

} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity,TextAlignType,PositionUnit,UiFontType,EntityPropTypes,  UiLabelProps } from '@dcl/sdk/react-ecs'
import { isMenuVisible, toggleMenuVisibility } from './systems'
import { getFakeDataSample } from './fakeData'
import { createHudLeaderboardTable } from './uiHudLeaderboard'



export function createRowCellImage(props: { row:TableRow,cell: TableCell,colNum:number}) {
  return <UiEntity //cell wrapper
    uiTransform={{
      width: `${(1/props.row.cells.length)*100}%`,
      height: '100%',
      display: 'flex',
      //alignItems:'center',
      justifyContent:'center'
      //margin: { top: '200px', left: '200px' }
    }}
    
    //uiBackground={{ texture: {src: "images/scene-thumbnail.png"}, textureMode: 'stretch'}}
  >
    <UiEntity 
      uiTransform={{
        width: `10px`,
        height: '10px',
        display: 'flex',
        alignSelf:'center'
        //alignSelf:'center'
        //margin: { top: '50%' }
      }}
      uiBackground={{ texture: {src: props.cell.value}, textureMode: 'stretch'}}
    ></UiEntity>
    
  </UiEntity>
}
export function createRowCellText(props: { row:TableRow,cell: TableCell,colNum:number}) {
  const rowColor = props.colNum %2== 0 ? Color4.Gray(): Color4.Red() 
  return <UiEntity //cell wrapper
    uiTransform={{
      width: props.cell.stylesheet?.width ? props.cell.stylesheet?.width : `${(1/props.row.cells.length)*100}%` ,
      height: '100%',
      display: 'flex',
      //alignItems:'center'
      //margin: { top: '200px', left: '200px' }
    }}
    //uiBackground={{ color: rowColor }}
    
  >
    <Label
      value= {props.cell.value}
      fontSize={props.cell.stylesheet?.fontSize ? props.cell.stylesheet?.fontSize : 12}
      font= {props.cell.stylesheet?.font ? props.cell.stylesheet?.font : 'monospace'}
      color = {props.cell.stylesheet?.fontColor ? props.cell.stylesheet?.fontColor : undefined}
      textAlign= {props.cell.stylesheet?.textAlign ? props.cell.stylesheet?.textAlign : 'middle-center'}
      uiTransform={{
        width: `100%`,
        height: '100%',
        //padding: { top: '20px',left: '0px' }
      }}
    />
  </UiEntity>
}


export function generateRows(table:Table){ 
  const arr = []
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i]
    
    adjustNonSetWidthsEvenDist(row.cells)

    arr.push(<CreateTableRow data={row} rowNum={i} /> ) 
  }

  return arr
}


//BLA metti immagini o altro che sia nella riga qua, ogni cosa e una cella 
export function CreateTableRow(props:{data: TableRow, rowNum:number}) {
  //console.log("AAA.TextComponent", props)
  const rowColor = props.rowNum %2== 0 ? Color4.Gray(): Color4.Red() 

   const arr = []
  for (let i = 0; i < props.data.cells.length; i++) {
    const itm = props.data.cells[i]
    switch(itm.type){
      case 'image':
        arr.push(createRowCellImage( {row:props.data,cell:itm,colNum:i} )) 
        break;

      default:
        arr.push(createRowCellText( {row:props.data,cell:itm,colNum:i} )) 
    }
    
  }

  return  <UiEntity
        uiTransform={{
          width: '100%',
          height: props.data.stylesheet?.height ? props.data.stylesheet?.height : 20,//pick some reasonable height as default
          display: 'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          margin: props.data.stylesheet?.margin ? props.data.stylesheet?.margin : { top: '0px', left: '0px' },
          //padding: { top: '5px', left: '5px', bottom: '5px' , right: '5px' }
        }}
        uiBackground= { props.data.stylesheet?.uiBackground ? props.data.stylesheet?.uiBackground : undefined } 
      >          
        
        {arr}
        
      </UiEntity>

}

//place holder should header need more stuff
export function CreateTableHeader(props:{data: TableRow, rowNum:number}) {
  return CreateTableRow(props)
} 


