import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { createHudLeaderboardTable } from './uiHudLeaderboard'
import { createModalLeaderboardTable } from './uiModalLeaderboard'


const uiComponent = () => (
  <UiEntity>
    <UiEntity>{createHudLeaderboardTable()}</UiEntity>
    <UiEntity>{createModalLeaderboardTable()}</UiEntity>
    
  </UiEntity>
)

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

