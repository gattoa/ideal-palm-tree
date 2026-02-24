/**
 * Phosphor Icons helper.
 * Import SVGs as raw strings and expose for inline use (inherit currentColor).
 * Add more icons from @phosphor-icons/core/assets/{regular,fill,light}/<name>.svg
 */
import plusSvg from '@phosphor-icons/core/assets/regular/plus.svg?raw'
import trashSvg from '@phosphor-icons/core/assets/regular/trash.svg?raw'
import checkSvg from '@phosphor-icons/core/assets/regular/check.svg?raw'

const icons = {
  plus: plusSvg,
  trash: trashSvg,
  check: checkSvg,
}

/**
 * Return the SVG markup for an icon. Use inside a container with CSS color set.
 * @param {keyof icons} name - Icon name (plus, trash, check)
 * @param {string} [className] - Optional class for the wrapper
 * @param {number} [size=24] - Width/height in pixels
 */
export function getIcon(name, className = '', size = 24) {
  const svg = icons[name]
  if (!svg) return ''
  const wrap = document.createElement('span')
  wrap.className = `icon icon--${name} ${className}`.trim()
  wrap.setAttribute('aria-hidden', 'true')
  wrap.style.width = `${size}px`
  wrap.style.height = `${size}px`
  wrap.style.display = 'inline-flex'
  wrap.style.alignItems = 'center'
  wrap.style.justifyContent = 'center'
  wrap.style.flexShrink = '0'
  const svgWithSize = svg.replace('<svg ', `<svg width="${size}" height="${size}" `)
  wrap.innerHTML = svgWithSize
  return wrap
}

export { plusSvg, trashSvg, checkSvg }
