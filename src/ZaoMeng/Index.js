import Main from './Main.js'

const index = new Main()
const mode = 'DEV'
window.onload = () => {
  document.querySelector('.startBtn').addEventListener('click', () => {
    index.startGame.apply(index)
    document.querySelector('.startBtn').style.display = 'none'
  })
}

if (mode === 'DEV') {
  index.startGame()
  document.querySelector('.startBtn').style.display = 'none'
}

export default index
