import { render } from 'preact';
import { html } from 'htm/preact';
import defaultConfig from "./defaultConfig"
import Notice from "./components/notice.js"
import useCookie from "./hooks/useCookie";
import "./styles/main.scss"


const event = document.createEvent('Event');

if (document.createEvent) event.initEvent('biscuit-init', true, true);

const App = (props) => {
  const config = {
    ...defaultConfig,
    ...props.config
  };
  const configLocales = Object.keys(config.content)
  const locale = document.querySelector("html").getAttribute("lang")
  const [showBannerCookie, setShowBannerCookie] = useCookie("showBanner", true)

  return showBannerCookie ?
    html`
      <${Notice} 
              content=${config.content[locale] || config.content[configLocales[0]]} 
              cookieParams="${config.settings}" 
              setShowBanner=${setShowBannerCookie}
      />
  ` : ""

}

window._biscuit = (config) => render(html`<${App} config=${config}/>`, document.getElementById("consent"))
window.dispatchEvent(event);
