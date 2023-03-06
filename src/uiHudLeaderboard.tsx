import { Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { UiEntity, Position, UiBackgroundProps } from '@dcl/sdk/react-ecs'
import { getFakeDataSample, randomizeData } from './fakeData'
import { CreateTableHeader, generateRows } from './uiTableComponents'



const MODAL_WIDTH = 320
const MODAL_HEIGHT = 400
const TABLE_HEADER_FONT_SIZE = 14
const TABLE_CELL_FONT_SIZE = 12
const TABLE_ROW_HEIGHT = 30
const TABLE_ROW_MARGIN:Partial<Position> ={ top: '5px', left: '-5px' }
const TABLE_ROW_UI_BG:UiBackgroundProps = { texture: {src: "images/rowimage.png"}, textureMode: 'stretch', color: Color4.fromInts(255,255,255, 180)}
const TABLE_HEADER_UI_BG:UiBackgroundProps|undefined = undefined
const TABLE_FONT_COLOR = Color4.White()
const TABLE_HEADER_FONT_COLOR= Color4.White()
const MODAL_BORDER_THICKNESS = 50
const TABLE_WIDTH = MODAL_WIDTH - (MODAL_BORDER_THICKNESS*2)


const TABLE_RANK_WIDTH = '10%'

const header = new TableRow({
  uiBackground:TABLE_HEADER_UI_BG
});

header.cells.push( new TableCell('text','#',{fontSize:TABLE_HEADER_FONT_SIZE,width:TABLE_RANK_WIDTH,fontColor:TABLE_HEADER_FONT_COLOR}))
header.cells.push( new TableCell('text','Players',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))
header.cells.push( new TableCell('text','Team',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))
header.cells.push( new TableCell('text','Health',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))
header.cells.push( new TableCell('text','Score',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))

const noDataRow = new TableRow({
  height:TABLE_ROW_HEIGHT,
  margin:TABLE_ROW_MARGIN,
  uiBackground:TABLE_ROW_UI_BG, 
  fontColor:Color4.Gray()
});

noDataRow.cells.push( new TableCell('text','No Data To Display',{fontSize:TABLE_HEADER_FONT_SIZE,width:"100%",fontColor:Color4.Gray()}))

adjustNonSetWidthsEvenDist(header.cells)

const leaderboardTable = new Table( 'hud-leaderboard',header )
leaderboardTable.noDataRow = noDataRow

export function generateHudLeaderboardData(){ 
  leaderboardTable.rows = []
  
  
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

    leaderboardTable.rows.push(row)
  }

}

generateHudLeaderboardData()


export function createHudLeaderboardTable(){
  const table = leaderboardTable
  return <UiEntity
      >
    <UiEntity //parent / modal decoration
        uiTransform={{
          width: 275,
          height: MODAL_HEIGHT,
          display: 'flex',
          //position: { top: '400px', left: '20px' } , 
          flexDirection:'column',
          flexWrap:'wrap',
          alignSelf:'flex-end'
        }}
        uiBackground={{ texture: {src: "images/leaderboardbg.png"}, textureMode: 'stretch'}}
    > 

      <UiEntity //start table
          uiTransform={{
            width: TABLE_WIDTH,
            height: '90%',
            display: 'flex',
            position: { top: 35, left: 32.5 } , 
            flexDirection:'column',
            flexWrap:'wrap'
          }}
      > 
        
        <CreateTableHeader data={table.header} rowNum={0}/>

        {generateRows(table)}
      </UiEntity>

    </UiEntity>
    </UiEntity>
}




