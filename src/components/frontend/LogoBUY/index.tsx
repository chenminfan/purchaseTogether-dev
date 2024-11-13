import './logoBUY.scss'

type Props = {}

export default function LogoBUY({ }: Props) {
  return (
    <div className="logo-BUY">
      <div className="logo-icon">
        <div className="logo-person">
          <i className="bi bi-person-walking"></i>
          <i className="bi bi-person-walking"></i>
        </div>
        <div className="logo-cart"><i className="bi bi-cart3"></i></div>

      </div>
      <div className="logo-text">做伙Buy</div>
    </div>
  )
}