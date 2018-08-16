import { Text } from 'pixi.js'
import Renderer from '../renderer/renderer'
import Game from './game/state'
import Gameover from './gameover/state'
import Welcome from './welcome/state'

const create = (id, { renderer }) => {
  const fps = new Text('0', { fill: 'white', fontFamily: 'Courier New', fontSize: 20 })
  fps.position.y = window.innerHeight - 30
  fps.position.x = window.innerWidth - 50

  return {
    id,
    renderer,
    fps,
    inputs: {},
    lastFPS: [],
    entities: [],
  }
}

const update = (state, delta) => {
  const { id, fps, lastFPS, renderer } = state

  // update fps
  lastFPS.push(1000 / delta)
  if (lastFPS.length > 10) {
    fps.text = Math.trunc(lastFPS.reduce((acc, curr) => acc + curr, 0) / lastFPS.length)
    state.lastFPS = []
  }

  // update scene based on state
  let newState
  if (id === 'game') newState = Game.update(state, delta)
  else if (id === 'gameover') newState = Gameover.update(state, delta)
  else if (id === 'welcome') newState = Welcome.update(state, delta)

  // draw
  Renderer.update(renderer)

  return newState
}

const prepare = (state, previous) => {
  const { id, renderer, fps } = state

  // reset rendrer
  Renderer.reset(renderer)

  // add to stage
  Renderer.addToStage(renderer, { graphics: fps })

  // call other prepare
  if (id === 'game') Game.prepare(state, previous)
  else if (id === 'gameover') Gameover.prepare(state, previous)
  else if (id === 'welcome') Welcome.prepare(state, previous)
}

const clear = (state) => {
  const { id } = state

  if (id === 'game') Game.clear(state)
  else if (id === 'gameover') Gameover.clear(state)
  else if (id === 'welcome') Welcome.clear(state)
}

export default {
  create,
  prepare,
  update,
  clear,
}
