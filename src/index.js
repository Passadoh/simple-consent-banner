import { render } from 'preact';
import { html } from 'htm/preact';
import defaultConfig from "./defaultConfig"
import Notice from "./components/notice"
import Settings from "./components/settings"
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

  const cookieParams = {
    expires: 0,
    domain: 'localhost',
    path: '/',
    secure: true,
    httpOnly: false,
    maxAge: 15552000,
    sameSite: 'none',
    ...config.settings
  }

  return showBannerCookie ?
    html`
      <${Notice} 
        content=${config.content[locale] || config.content[configLocales[0]]} 
        cookieParams=${cookieParams}
        setShowBanner=${setShowBannerCookie}
      />
  ` : html `
      <${Settings}
        cookieParams=${cookieParams}
        setShowBanner=${setShowBannerCookie}               
      />`

}

window._biscuit = (config) => render(html`<${App} config=${config}/>`, document.getElementById("consent")),
window.dispatchEvent(event);
