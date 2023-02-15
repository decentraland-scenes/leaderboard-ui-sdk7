import { Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, {Label, UiEntity } from '@dcl/sdk/react-ecs'



export function createRowCellImage(props: { row:TableRow,cell: TableCell,colNum:number}) {
  return <UiEntity //cell wrapper
    uiTransform={{
      width: props.cell.stylesheet?.width ? props.cell.stylesheet?.width : `${(1/props.row.cells.length)*100}%` ,
      height: '100%',
      display: 'flex',
      justifyContent:'center'
    }}
  >
    <UiEntity 
      uiTransform={{
        width: props.cell.stylesheet?.innerWidth ? props.cell.stylesheet?.innerWidth : '20px' ,
        height: props.cell.stylesheet?.innerHeight ? props.cell.stylesheet?.innerHeight : '20px' ,
        display: 'flex',
        alignSelf:'center',
      }}
      uiBackground={props.cell.type == "avatar"? { avatarTexture: {userId: props.cell.value}, textureMode: 'stretch'}:{ texture: {src: props.cell.value}, textureMode: 'stretch'}}
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
    }}
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


export function CreateTableRow(props:{data: TableRow, rowNum:number}) {

  const rowColor = props.rowNum %2== 0 ? Color4.Gray(): Color4.Red() 

   const arr = []
  for (let i = 0; i < props.data.cells.length; i++) {
    const itm = props.data.cells[i]
    switch(itm.type){
      case 'image': 
      case 'avatar':  
        arr.push(createRowCellImage( {row:props.data,cell:itm,colNum:i} )) 
        break;

      default:
        arr.push(createRowCellText( {row:props.data,cell:itm,colNum:i} )) 
    }
  }

  return  <UiEntity
        uiTransform={{
          width: '100%',
          height: props.data.stylesheet?.height ? props.data.stylesheet?.height : 20,
          display: 'flex',
          flexDirection:'row',
          flexWrap:'nowrap',
          margin: props.data.stylesheet?.margin ? props.data.stylesheet?.margin : { top: '0px', left: '0px' },
        }}
        uiBackground= { props.data.stylesheet?.uiBackground ? props.data.stylesheet?.uiBackground : undefined } 
      >          
        
        {arr}
        
      </UiEntity>

}

export function CreateTableHeader(props:{data: TableRow, rowNum:number}) {
  return CreateTableRow(props)
} 


