export const stripScripts = (s) => {
  let div = typeof document !== `undefined` ? document.createElement('div') : null
  if(!div)
    return
  div.innerHTML = s
  let scripts = div.getElementsByTagName('script')
  let noscripts = div.getElementsByTagName('noscript')
  let scriptsHTML = []
  scriptsHTML = prepareHTML(scripts, scriptsHTML)
  scriptsHTML = prepareHTML(noscripts, scriptsHTML)
  return scriptsHTML
}

const prepareHTML = (scripts, scriptsHTML) => {
  let i = scripts.length
  while (i--) {
    scriptsHTML.push({
      innerHTML: `${scripts[i].innerHTML}`,
    })
  }
  return scriptsHTML
}
