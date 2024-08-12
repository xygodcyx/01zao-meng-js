import Vector2 from '../src/ZaoMeng/Vector/Vector2.js'
import data from './data.js'
import dom from './dom.js'
/* 
in use Main.js
 */
export const createCanvasAndCtx = (selector = '#game') => {
  /**
   * canvas
   * @type {HTMLCanvasElement} canvas - canvas
   */
  const canvas = dom.getDom(selector)
  canvas.width = data.width
  canvas.height = data.height
  /**
   * ctx
   * @type {CanvasRenderingContext2D} ctx - ctx
   */
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  window.addEventListener('resize', () => {
    canvas.width = data.width
  })
  return {
    canvas,
    ctx,
  }
}
const idMap = new Map()
export const logOnce = ({ id, count = 1 }, ...msg) => {
  if (!idMap.has(id)) {
    idMap.set(id, 1)
    console.trace(id, ...msg)
  } else {
    if (idMap.get(id) >= count) {
      return
    }
    console.trace(id, ...msg)
    idMap.set(id, idMap.get(id) + 1)
  }
}

let allTime = 0
let count = 0
let init = true
const dataMap = new Map()
const hasRender = new Set()
export const imageDataHRevert = (ctx, position, showSize, { frame, row, src }) => {
  return new Promise((resolve) => {
    position = new Vector2(+position.x.toFixed(0), +position.y.toFixed(0))
    const { x, y } = position
    const { x: width, y: height } = showSize
    if (init) {
      const interval = 1000
      setInterval(() => {
        console.log(
          `翻转算法${interval / 1000}秒内运行${count}次的平均速度: ${(count === 0
            ? 0
            : allTime / count
          ).toFixed(4)}ms`
        )
        allTime = 0
        count = 0
      }, interval)
      init = false
    }

    const timeStart = performance.now()
    // 获取图像数据
    let imageData = null
    const setKey = `${frame},${row},${src.split('/').pop()}`
    const key = `${x},${y},${setKey}}`
    if (dataMap.has(key)) {
      imageData = dataMap.get(key)
      // imageData = ctx.getImageData(x, y, width, height)
    } else {
      // 没有缓存,需要获取
      imageData = ctx.getImageData(x, y, width, height)
      dataMap.set(key, imageData)
      if (dataMap.size > 10000) {
        dataMap.clear()
      }
    }
    const data = new Uint8ClampedArray(imageData.data)
    // 进行水平翻转
    for (let i = 0; i < height; i++) {
      const rowStart = i * width * 4
      const rowEnd = rowStart + width * 4

      for (let j = 0; j < width / 2; j++) {
        const leftIndex = rowStart + j * 4
        const rightIndex = rowEnd - (j + 1) * 4

        // 交换左右像素点的RGBA值
        for (let k = 0; k < 4; k++) {
          const temp = data[leftIndex + k]
          data[leftIndex + k] = data[rightIndex + k]
          data[rightIndex + k] = temp
        }
      }
    }

    ctx.putImageData(new ImageData(data, width, height), x, y)

    const timeEnd = performance.now()
    allTime += timeEnd - timeStart
    count++
    resolve(true)
  })
}
