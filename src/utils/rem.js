// const baseSize = 50

function setRem() {
  let clientWidth = window.innerWidth <= 1280 ? 1280 : window.innerWidth
  let scale = clientWidth / 19.2

  document.documentElement.style.fontSize = scale + 'px'
}

setRem()

window.onresize = function () {
  setRem()
}
