import {html} from 'htm/preact';
import { useState, useMemo } from 'preact/hooks'

const Popover = (props) => {
  const [isOpen, setOpen] = useState(false)
  const toggleOpen = () => setOpen(prevOpenState => !prevOpenState)

  return html`
      <div class="popover${isOpen ? ' popover--open' : ' popover--closed'}">
          <a class="popover__summary link" onclick=${toggleOpen}>${props.text}</a>
          <div class="popover__inner">
            <div class="popover__content">
                <div class="popover__close-btn"><button onClick=${toggleOpen}>X</button></div>
                <div class="popover__filler"></div>
                <div class="popover__content-container">${props.children}</div>
                <div class="popover__filler"></div>
            </div>
          </div>
      </div>
  `
}

const PurposeList = (props) => {
  const memo = useMemo(
    () =>
      html `
        <h4>${props.title}</h4>
        ${props.list.map(child =>{
        if (child.type === 'third-party')
          return html`
            <h5>${child.purpose}</h5>
            <ul class="popover__list">
              ${child.list.map(c => {
              return html `<li><a class="link" href=${c.privacyNotice} rel="nofollow noreferrer" target="_blank">${c.name}</a></li>`
            })}
            </ul>`
        else if (child.type === 'first-party')
          return html `
            <h5>${child.purpose}</h5>
            <ul class="popover__list">
              ${child.list.map(c => {
                return html `<li>${c}</li>`
            })}
            </ul>
          `
        })}`, [false]
  );

  return memo
}

const DataList = (props) => {
  const memo = useMemo(
    () =>
      html `
        <h4>${props.title}</h4>
        ${props.list.map(child => {
          return html `
            <h5>${child.name}</h5>
            ${child.contentParagraphs.map(paragraph => {
              if (typeof paragraph === 'string') return html `<p>${paragraph}</p>`
              else if (typeof paragraph === 'object' && paragraph.type === 'list') return html `
                  <ul class="popover__list">
                      ${paragraph.list.map(c => {
                          return html`<li>${c}</li>`
                      })}
                  </ul>
              `
            })}
            `
        })}
      `, [false]
  )

  return html `<div>${memo}</div>`
}


const Content = (props) => {
  return props.children.map(child => {
    if (typeof child === 'string') return child
    else if (typeof child === 'object' && child.type === 'inline-url') return html`
        <a target="_blank" href=${child.url} class="link">
            ${child.text}
        </a>`
    else if (typeof child === 'object' && child.type === 'consent-popover') return html `
        <${Popover} text=${child.text}>
            <${PurposeList} list=${child.purposeLists} title=${child.title} />
        </Popover>
    `
    else if (typeof child === 'object' && child.type === 'personal-data-popover') return html`
        <${Popover} text=${child.text}>
            <${DataList} list=${child.list} title=${child.title} />
        </Popover>
    `
  })
}

export default Content