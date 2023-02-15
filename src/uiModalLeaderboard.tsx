import { Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { UiEntity, Position, UiBackgroundProps } from '@dcl/sdk/react-ecs'
import { getFakeDataSample, randomizeData } from './fakeData'
import { CreateTableHeader, generateRows } from './uiTableComponents'



const MODAL_WIDTH = 480 
const MODAL_HEIGHT = 376 
const TABLE_HEADER_FONT_SIZE = 27 
const TABLE_CELL_FONT_SIZE = 23
const TABLE_ROW_HEIGHT = 40   
const TABLE_ROW_MARGIN:Partial<Position> ={ top: '5px', left: '0px' } 
const TABLE_HEADER_MARGIN:Partial<Position> ={ top: '-50px', left: '0px', bottom: '10px' }  
const TABLE_ROW_UI_BG:UiBackgroundProps = { texture: {src: "images/rowLineImage.png"}, textureMode: 'stretch'}
const TABLE_HEADER_UI_BG:UiBackgroundProps|undefined = undefined
const TABLE_FONT_COLOR = Color4.White()
const TABLE_HEADER_FONT_COLOR= Color4.White()
const TABLE_WIDTH = 400
const TABLE_RANK_WIDTH = '20%'
const TABLE_ICON_WIDTH = '25px'



const header = new TableRow({
  uiBackground:TABLE_HEADER_UI_BG,
  margin: TABLE_HEADER_MARGIN
});

header.cells.push( new TableCell('text','Snowball Battle',{fontSize:TABLE_HEADER_FONT_SIZE,fontColor:TABLE_HEADER_FONT_COLOR}))


adjustNonSetWidthsEvenDist(header.cells)

const leaderboardTable = new Table( header )


export function generateData(){ 
  leaderboardTable.rows = []
  randomizeData()
  
  const randomizeFakeLeadboardData = getFakeDataSample()

  console.log("generateSampleData", randomizeFakeLeadboardData)

  for (let i = 0; i < randomizeFakeLeadboardData.length; i++) {
    const itm = randomizeFakeLeadboardData[i]

    const fontColor = itm.connStatus === 'connected' ? TABLE_FONT_COLOR : Color4.White()
  
    const row = new TableRow({
      height:TABLE_ROW_HEIGHT,
      margin:TABLE_ROW_MARGIN,
      uiBackground:TABLE_ROW_UI_BG,
      fontColor:fontColor
    })


    row.cells.push( new TableCell('text',itm.rank.toFixed(0),{fontSize:TABLE_CELL_FONT_SIZE,width:TABLE_RANK_WIDTH,fontColor:fontColor}))  
    row.cells.push( new TableCell('image',itm.teamId === "blue" ? "images/krampus.png" : "images/santa.png", {innerWidth:TABLE_ICON_WIDTH, innerHeight:TABLE_ICON_WIDTH, width:TABLE_RANK_WIDTH} )) 
    if(itm.userId != null && itm.userId != undefined && itm.userId != ""){
      row.cells.push( new TableCell('avatar',itm.userId,{innerWidth:TABLE_ICON_WIDTH, innerHeight:TABLE_ICON_WIDTH, width:TABLE_RANK_WIDTH} ))
    } else {
      row.cells.push( new TableCell('image',"images/anonymous-player.png",{innerWidth:TABLE_ICON_WIDTH, innerHeight:TABLE_ICON_WIDTH, width:TABLE_RANK_WIDTH} ))
    }
    row.cells.push( new TableCell('text',itm.name,{textAlign:'middle-left',fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
    row.cells.push( new TableCell('text',itm.score.toString(),{fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
   
    
    adjustNonSetWidthsEvenDist(row.cells)

    leaderboardTable.rows.push(row)
  }

}

generateData()


export function createModalLeaderboardTable(){
  const table = leaderboardTable
  return <UiEntity
    
      >
    <UiEntity //parent / modal decoration
        uiTransform={{
          width: MODAL_WIDTH,
          height: MODAL_HEIGHT,
          display: 'flex',
          position: { top: '200px', left: '900px' } , 
          flexDirection:'column',
          flexWrap:'wrap',
        }}
        uiBackground={{texture: {src: "images/leadboard.png"}, textureMode: 'stretch' }}
    >  
 
      <UiEntity //start table
          uiTransform={{    
            width: TABLE_WIDTH,
            height: '90%',
            display: 'flex',
            position: { top: 75, left: 45 } , 
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




