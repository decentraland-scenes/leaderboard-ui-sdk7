import {
  engine,
  Transform

} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity,TextAlignType,PositionUnit,UiFontType,EntityPropTypes,  UiLabelProps, Position, UiBackgroundProps } from '@dcl/sdk/react-ecs'
import { isMenuVisible, toggleMenuVisibility } from './systems'
import { getFakeDataSample, randomizeData } from './fakeData'
import { createRowCellImage, createRowCellText, CreateTableHeader, generateRows } from './uiTableComponents'



const MODAL_WIDTH = 520
const MODAL_HEIGHT = 600
const TABLE_HEADER_FONT_SIZE = 25 
const TABLE_CELL_FONT_SIZE = 16
const TABLE_ROW_HEIGHT = 30
const TABLE_ROW_MARGIN:Partial<Position> ={ top: '5px', left: '0px' }
const TABLE_HEADER_MARGIN:Partial<Position> ={ top: '-55px', left: '0px', bottom: '10px' }  
const TABLE_ROW_UI_BG:UiBackgroundProps = { texture: {src: "images/rowLineImage.png"}, textureMode: 'stretch'}
const TABLE_HEADER_UI_BG:UiBackgroundProps|undefined = undefined
const TABLE_FONT_COLOR = Color4.White()
const TABLE_HEADER_FONT_COLOR= Color4.White()
const TABLE_HEADER_ROW_HEIGHT = 30
const MODAL_BORDER_THICKNESS = 100
const TABLE_WIDTH = MODAL_WIDTH - (MODAL_BORDER_THICKNESS*2)
const TABLE_POSITION_TOP = 0

const TABLE_RANK_WIDTH = '5%'

const header = new TableRow({
  uiBackground:TABLE_HEADER_UI_BG,
  margin: TABLE_HEADER_MARGIN
});

header.cells.push( new TableCell('text','Snowball Battle',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))


adjustNonSetWidthsEvenDist(header.cells)
//header.cells.push( new TableCell('text','Team'))

const leaderboardTable = new Table( header )


export function generateSampleData(){ 
  leaderboardTable.rows = []
  randomizeData()
  
  const randomizeFakeLeadboardData = getFakeDataSample()

  console.log("generateSampleData", randomizeFakeLeadboardData)

  for (let i = 0; i < randomizeFakeLeadboardData.length; i++) {
    const itm = randomizeFakeLeadboardData[i]

    const fontColor = itm.connStatus === 'connected' ? TABLE_FONT_COLOR : Color4.Red()

    const row = new TableRow({
      height:TABLE_ROW_HEIGHT,
      margin:TABLE_ROW_MARGIN,
      uiBackground:TABLE_ROW_UI_BG,
      fontColor:fontColor
    })

    

    row.cells.push( new TableCell('text',itm.rank.toFixed(0),{fontSize:TABLE_CELL_FONT_SIZE,width:TABLE_RANK_WIDTH,fontColor:fontColor}))
    row.cells.push( new TableCell('text',itm.name,{textAlign:'middle-left',fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
    row.cells.push( new TableCell('image',itm.teamId === "blue" ? "images/teamBlueDot.png" : "images/teamRedDot.png",{fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
    row.cells.push( new TableCell('text',itm.health.toFixed(1) + "/" + itm.healthMax,{fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
    row.cells.push( new TableCell('text',itm.score.toFixed(0),{fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
   
    
    adjustNonSetWidthsEvenDist(row.cells)

    //arr.push(<CreateTableRow data={row} rowNum={i} /> ) 
    leaderboardTable.rows.push(row)
  }

}

generateSampleData()


export function createModalLeaderboardTable(){
  const table = leaderboardTable
  return <UiEntity
    
      >
    <UiEntity //parent / modal decoration
        uiTransform={{
          width: MODAL_WIDTH,
          height: MODAL_HEIGHT,
          display: 'flex',
          position: { top: '200px', left: '300px' } , 
          //alignSelf: 'center',
          flexDirection:'column',
          flexWrap:'wrap',
          //alignContent:'center'
          
        }}
        //uiBackground={{ color: Color4.Black() }}
        uiBackground={{ texture: {src: "images/leadboard.png"}, textureMode: 'stretch'}}
    > 

      <UiEntity //start table
          uiTransform={{
            width: TABLE_WIDTH,
            height: '90%',
            display: 'flex',
            position: { top: MODAL_BORDER_THICKNESS, left: MODAL_BORDER_THICKNESS } , 
            //alignSelf: 'center',
            flexDirection:'column',
            flexWrap:'wrap'
          }}
          //uiBackground={{ color: Color4.White() }}
          //uiBackground={{ texture: {src: "images/leaderboardbg.png"}, textureMode: 'stretch'}}
      > 
        
        <CreateTableHeader data={table.header} rowNum={0}/>

        {generateRows(table)}
      </UiEntity>

    </UiEntity>
    </UiEntity>
}




