import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { createHudLeaderboardTable } from './uiHudLeaderboard'
import { createModalLeaderboardTable } from './uiModalLeaderboard'


const uiComponent = () => (
  <UiEntity
    uiTransform={{ 
      width: '100%',
      height: '100%',
      maxWidth: '100%',
      maxHeight: '100%'
    }}
  >
    <UiEntity>{createHudLeaderboardTable()}</UiEntity>
    <UiEntity>{createModalLeaderboardTable()}</UiEntity>
    
  </UiEntity>
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

