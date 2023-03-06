import {
  Entity,
  engine,
  Transform,
  MeshRenderer,
  MeshCollider,
  PointerEvents,
  PointerEventType,
  InputAction
} from '@dcl/sdk/ecs'
import { EntityIdComponent } from './definitions'

// Cube factory
export function createCube(id:string,x: number, y: number, z: number, hoverText:string): Entity {
  const meshEntity = engine.addEntity()
  EntityIdComponent.create(meshEntity,{id:id})

  Transform.create(meshEntity, { position: { x, y, z } })

  // set how the cube looks and collides
  MeshRenderer.setBox(meshEntity)
  MeshCollider.setBox(meshEntity)

  // if it is a spawner, then we set the pointer hover feedback
  //if (spawner) {
    PointerEvents.create(meshEntity, {
      pointerEvents: [
        {
          eventType: PointerEventType.PET_DOWN,
          eventInfo: {
            button: InputAction.IA_PRIMARY,
            hoverText: hoverText,
            maxDistance: 100,
            showFeedback: true
          }
        }
      ]
    })
  //}

  return meshEntity
}
