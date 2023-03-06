import { Color4 } from '@dcl/sdk/math'
import ReactEcs, { ReactEcsRenderer, UiEntity } from '@dcl/sdk/react-ecs'
import { randomizeData } from './fakeData'
import { createHudLeaderboardTable, generateHudLeaderboardData } from './uiHudLeaderboard'
import { createModalLeaderboardTable, generateModalLeaderboardData } from './uiModalLeaderboard'


//load initial data
randomizeData() //randomize
generateHudLeaderboardData()
generateModalLeaderboardData()

const uiComponent = () => [
  createHudLeaderboardTable(),
  createModalLeaderboardTable()
]

export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent)
}

