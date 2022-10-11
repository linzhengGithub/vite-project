// import logoViet from '@assets/imgs/logo.png'
import { ReactComponent as ReactLogo } from '@assets/icons/react.svg'
import styles from './index.module.scss'

export function Header() {
  return <div>
    {/* <img src={logoViet} alt="" /> */}
    <ReactLogo />
    <p className={styles.header}>This is Header</p>
  </div>
}
