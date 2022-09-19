import pell from 'pell'

const pellColorPalette = [
  '#000000',
  '#18181b',
  '#3d4852',
  '#94a3b8',
  '#15803d',
  '#0284c7',
  '#164e63',
  '#0c4a6e',
  '#eab308',
  '#d97706',
  '#b91c1c',
  '#be185d',
  '#fb7185',
  '#7e22ce'
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

const fontSizes = [2,3,4,5,6, 7].map((size) => {
  return {
    name: `Tamanho fonte ${size}`,
    title: `Tamanho fonte ${size}`,
    icon: size,
    result: () => {
      pell.exec('fontSize', size)
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
  
  ...fontSizes,

  {
    name: 'image',
    result: () => {
      const url = window.prompt('Enter the image URL')
      if (url) pell.exec('insertImage', url)
    }
  },
  {
    name: 'link',
    result: () => {
      const text = window.getSelection().toString()
      const url = window.prompt('Enter the link URL')
      if (url) {
        const val = `<a href="${ url }" target="_blank">${ text }</a>`
        pell.exec('insertHTML', val)
      }
    }
  },
  'underline',
  'strikethrough',
  'paragraph',
  'heading1',
  'heading2',
  'olist',
  'ulist',
  'line',
]


colors.map((color) => {
  actions.push(color)
})

export default actions