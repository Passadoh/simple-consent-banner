import {html} from 'htm/preact';
import { useEffect, useState } from 'preact/hooks'
import useCookie from "../hooks/useCookie"
import CookieIcon from "./icons/cookie"
import Content from "./content"

const Notice = ({ content : { main }, cookieParams, setShowBanner}) => {
  const [_, setPreferences ] = useCookie("pref",
    "marketing=0"
  )

  const [active, setActive] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true)
    }, 1000)
    return () => clearTimeout(timer)
  })

  const accept = () => {
    setPreferences("marketing=1", cookieParams)
    setShowBanner(0, cookieParams)
    history.go(0)
  }

  const refuse = () => {
    setPreferences("marketing=0", cookieParams)
    setShowBanner(0, cookieParams)
    history.go(0)
  }

  return html`
     <div class="cookie-notice${active ? ' active' : ''}">
         <div class="cookie-notice__icon">
             <${CookieIcon} />
         </div>
         <p class="cookie-notice__paragraph">
            <${Content}>${main.contentParagraph}</${Content}>
         </p>
         <div class="cookie-notice__actions">
            <button class="btn btn--secondary" onClick=${refuse}>${main.btnOoptions}</button>
            <button class="btn btn--primary" onClick=${accept}>${main.btnAgree}</button>
         </div>
     </div>
  `;
}

export default Notice