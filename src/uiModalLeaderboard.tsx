import { Color4 } from '@dcl/sdk/math'
import { adjustNonSetWidthsEvenDist, Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { UiEntity, Position, UiBackgroundProps, Button } from '@dcl/sdk/react-ecs'
import { getFakeDataSample, randomizeData } from './fakeData'
import { CreateTableHeader, generateRows } from './uiTableComponents'
import { UiBackground } from '@dcl/sdk/ecs'
import { generateHudLeaderboardData } from './uiHudLeaderboard'



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

const noDataRow = new TableRow({
  height:TABLE_ROW_HEIGHT,
  margin:TABLE_ROW_MARGIN,
  uiBackground:TABLE_ROW_UI_BG,
  fontColor:Color4.Gray()
});

noDataRow.cells.push( new TableCell('text','No Data To Display',{fontSize:TABLE_HEADER_FONT_SIZE,width:"100%",fontColor:Color4.Gray()}))


const leaderboardTable = new Table( 'modal-leaderboard',header )
leaderboardTable.noDataRow = noDataRow

export function generateModalLeaderboardData(){
  leaderboardTable.rows = []

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
    row.cells.push( new TableCell('text',itm.name + (itm.connStatus === 'connected' ? '' : '(*)'),{textAlign:'middle-left',fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))
    row.cells.push( new TableCell('text',itm.score.toString(),{fontSize:TABLE_CELL_FONT_SIZE,fontColor:fontColor}))


    adjustNonSetWidthsEvenDist(row.cells)

    leaderboardTable.rows.push(row)
  }

}

generateModalLeaderboardData()

export function toggleModalLeaderboard(val?:boolean):void{
  console.log("clicked toggleModal",val,leaderboardTable.visible)
  if(val !== undefined){
    leaderboardTable.visible = val
  }else{
    leaderboardTable.visible = !leaderboardTable.visible
  }
}

export function createModalLeaderboardTable(){
  const table = leaderboardTable
  return <UiEntity
    uiTransform={{
      display:table.visible ? 'flex':'none',
        positionType: 'absolute'  ,
        width: MODAL_WIDTH,
        height: MODAL_HEIGHT,
        position: { left: '40%' } ,
        flexDirection:'row',
        flexWrap:'wrap',
        alignSelf:'center'
    }}
      >
    <UiEntity //parent / modal decoration
        uiTransform={{
          width: MODAL_WIDTH,
          height: MODAL_HEIGHT,
          display: 'flex',
          //position: { left: '50%' } ,
          flexDirection:'column',
          //flexWrap:'wrap',
          //alignSelf:'center'
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

      <UiEntity //start table
        uiTransform={{
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection:'row',
          flexWrap:'wrap',
          alignSelf:'center',
          justifyContent:'center',
          padding: { bottom:'30px' },
        }}
      >
        <Button variant='secondary' value='Shuffle' onMouseDown={()=>{ randomizeData(); generateModalLeaderboardData(); generateHudLeaderboardData() }}
            uiTransform={{
              width: '100px',
              height: '40px',
              display: 'flex',
              alignSelf:'center',
              margin: { right:'20px' },
            }}
            font='sans-serif'
            fontSize={20}
            ></Button>
        <Button variant='primary' value='Close' onMouseDown={()=>{toggleModalLeaderboard()}}
          uiTransform={{
            width: '100px',
            height: '40px',
            display: 'flex',
            alignSelf:'center'
          }}
          font='sans-serif'
          fontSize={20}
          ></Button>
      </UiEntity>

    </UiEntity>
    </UiEntity>
}




