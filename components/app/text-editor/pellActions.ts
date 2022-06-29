import pell from 'pell'

const pellColorPalette = [
  '#000000',
  '#22292F',
  '#3d4852',
  '#b8c2cc',
  '#38c172',
  '#219FFE',
  '#218FFE',
  '#2C7CB0',
  '#2D5366',
  '#FDCC3E',
  '#FB7D02',
  '#e3342f',
  '#F262D3',
  '#F6ABB6',
  '#9574EA',
  '#3D305C',
]

let colors = pellColorPalette.map((color) => {
  return {
    name: 'Cor' + color,
    title: 'Cor' + color,
    icon: `<div style="width: 100%; height: 100%; display: block; background-color:${color};"></div>`,
    result: () => {
      pell.exec('foreColor', color)
    }
  }
})

let actions = [
  {
    name: 'undo',
    title: 'undo',
    icon: '↺',
    result: () => {
      pell.exec('undo')
    }
  },
  {
    name: 'redo',
    title: 'redo',
    icon: '↻',
    result: () => {
      pell.exec('redo')
    }
  },
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'heading1',
  'heading2',
  'quote',
  'olist',
  'ulist',
  'line',
]


colors.map((color) => {
  actions.push(color)
})

export default actions