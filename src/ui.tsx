import {
  engine,
  Transform

} from '@dcl/sdk/ecs'
import { Color3, Color4 } from '@dcl/sdk/math'
import { Table,TableCell, TableRow } from './tableTypes'
import ReactEcs, { Button, Label, ReactEcsRenderer, UiEntity,TextAlignType,PositionUnit,UiFontType,EntityPropTypes,  UiLabelProps } from '@dcl/sdk/react-ecs'
import { isMenuVisible, toggleMenuVisibility } from './systems'
import { getFakeDataSample } from './fakeData'
import { createHudLeaderboardTable } from './uiHudLeaderboard'
import { createModalLeaderboardTable } from './uiModalLeaderboard'



const uiComponent3 = () => (
  <UiEntity>
    <UiEntity>{createHudLeaderboardTable()}</UiEntity>
    <UiEntity>{createModalLeaderboardTable()}</UiEntity>
    
  </UiEntity>
)


export function setupUi() {
  ReactEcsRenderer.setUiRenderer(uiComponent3)
}

