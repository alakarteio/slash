import { Graphics } from 'pixi.js'
import { Bodies } from 'matter-js'
import Entity from './entity'

const create = (x, y, width, height) => {
  const body = Bodies.rectangle(x + width / 2, y + height / 2, width, height, { isStatic: true })
  const graphics = new Graphics()

  return Object.assign(
    Entity.create('wall', { graphics, body }),
    {
      x,
      y,
      width,
      height,
      drew: false,
    },
  )
}

const draw = (wall) => {
  const { x, y, width, height, graphics, drew } = wall

  // already drew once ? Then this is enough since wall are statics
  if (drew) return
  wall.drew = true

  graphics.clear()
  graphics.lineStyle(0, 0xff00ff)
  graphics.beginFill(0x00ffff)
  graphics.drawRect(x, y, width, height)
  graphics.endFill()
}

export default {
  create,
  draw,
}
