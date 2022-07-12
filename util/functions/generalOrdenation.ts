import Api from '@/util/Api'
import emitter from '@/util/emitter'


export default (entity) => {

  if(!entity) {
    throw new Error(`The entity variable should be passed as parameter for generalOrdenation module execution`)
  }

  let dragAndDropDraggingIndex = -1

  const onDragStart = (which) => {
    dragAndDropDraggingIndex = which
  }

  const onDragEnd = () => {
    dragAndDropDraggingIndex = -1
  }

  const onDragFinish = (index, items, offset = 0) => {
    moveItem(dragAndDropDraggingIndex, index, items, offset)
  }

  const moveItem = (from, to, items, offset) => {
    items.splice(to, 0, items.splice(from, 1)[0])
    remapItems(items, offset)
  }

  const remapItems = (items, offset) => {
    
    const orderedItems = items.map( (item, index) => {
      const order = offset > 0 ? (offset + index) : index
      return {
        id: item.id,
        order: order
      }
    })

    Api.post(`/admin/general/ordenation`, { entity, items: orderedItems })
      .then(() => {
        emitter.emit('dragAndDropOrdenationUpdated')
      })
  }

  return {
    onDragStart,
    onDragEnd,
    onDragFinish
  }

}