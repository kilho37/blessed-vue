/* @flow */
export const mustUseProp = () => false

const selectQue = []

const RAW_ATTRIBUTES = new Set([

  // Alignment, Orientation & Presentation
  'align',
  'valign',
  'orientation',
  'shrink',
  'padding',
  'shadow',

  // Font-related
  'font',
  'fontBold',
  'fch',
  'ch',
  'bold',
  'underline',

  // Flags
  'clickable',
  'input',
  'keyable',
  'hidden',
  'visible',
  'scrollable',
  'draggable',
  'interactive',

  // Position
  'left',
  'right',
  'top',
  'bottom',
  'aleft',
  'aright',
  'atop',
  'abottom',

  // Size
  'width',
  'height',

  // Checkbox
  'checked',

  // Misc
  'name'
])

export function setAttribute (node, key: string, value: string) {
  if (key === 'selected' && node.select) {
    selectQue.push({
      node,
      value: (typeof value === 'string' ? +value : value)
    })
  } else if (key === 'label') { // Setting label
    node.setLabel(value)
  } else if (key === 'hoverText' && !value) { // Removing hoverText
    node.removeHover()
  } else if (key === 'hoverText' && value) { // Setting hoverText
    node.setHover(value)
  } else if (key === 'content') { // Setting content
    node.setContent(value)
  } else if (key === 'style') { // Updating style
    node.style = Object.assign({}, node.style, value)
  } else if (key === 'items') { // Updating items
    node.setItems(value)
  } else if (key === 'border') { // Border edge case
    node.border = Object.assign({}, node.border, value)
  } else if (key === 'value' && node.setValue) { // Textarea value
    node.setValue(value)
  } else if (key === 'filled' && node.filled !== value) { // Progress bar
    node.setProgress(value)
  } else if ((key === 'rows' || key === 'data') && node.setData) { // Table / ListTable rows / data
    node.setData(value)
  } else if (key === 'focused' && value && !node[key]) {
    node.focus()
  } else if (RAW_ATTRIBUTES.has(key)) { // Raw attributes
    node[key] = value
  }
}
