import { engine, Schemas } from "@dcl/sdk/ecs";

export enum ButtonIds{
  OPEN_MODAL='open-modal',
  SHUFFLE_DATA='shuffle'
}

export const EntityIdComponent = engine.defineComponent(
  "EntityIdComponent",
  {
    id: Schemas.String
  }
)

