import {html} from 'htm/preact';
import CookieIcon from "./icons/cookie"

const Settings = ({cookieParams, setShowBanner}) => {

  return html`
    <div class="cookie-settings">
        <button onClick=${() => setShowBanner(1, cookieParams)} class="cookie-settings__btn"><${CookieIcon} size="sm"/></button>
    </div>
  `
}

export default Settings