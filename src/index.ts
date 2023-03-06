import { engine, executeTask, Material } from '@dcl/sdk/ecs'
import { Color4 } from '@dcl/sdk/math'
import { ButtonIds } from './definitions'

import { createCube } from './factory'
import { bounceScalingSystem, circularSystem, spawnerSystem } from './systems'

import { setupUi } from './ui'

// export all the functions required to make the scene work
export * from '@dcl/sdk'

// Defining behavior. See `src/systems.ts` file.
engine.addSystem(circularSystem)
engine.addSystem(spawnerSystem)
engine.addSystem(bounceScalingSystem)

// Initial function executed when scene is evaluated and after systems are created
executeTask(async function () {
  // Create my main cube and color it.
  const cube = createCube(ButtonIds.SHUFFLE_DATA,8, 1, 8,'Press E to \nShuffle Players')
  const cube2 = createCube(ButtonIds.OPEN_MODAL,10, 1, 8,'Open Modal')
  Material.setPbrMaterial(cube, { albedoColor: Color4.create(1.0, 0.85, 0.42) })
})

setupUi()
