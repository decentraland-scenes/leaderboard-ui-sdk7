import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { randomizeData } from './fakeData'
import { createHudLeaderboardTable, generateHudLeaderboardData } from './uiHudLeaderboard'
import { createModalLeaderboardTable, generateModalLeaderboardData } from './uiModalLeaderboard'


//load initial data
randomizeData() //randomize
generateHudLeaderboardData()
generateModalLeaderboardData()
 
const uiComponent = () => (
  <UiEntity
    uiTransform={{ 
      //width: '100%',
      //height: '100%',
      //maxWidth: '100%',
      //maxHeight: '100%'
      //alignItems:'center'
      //justifyContent:'center'
      
    }}
    //uiBackground={{ color: Color4.Gray()}} //so can see parent position for debugging
  >
    <UiEntity>{createHudLeaderboardTable()}</UiEntity>
    <UiEntity>{createModalLeaderboardTable()}</UiEntity>
    
  </UiEntity>
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

