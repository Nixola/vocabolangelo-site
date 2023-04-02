import {Link} from "react-router-dom";

export default function Footer() {
  return <footer className="wrapper style1 align-center">
      <div className="inner">
          <ul className="icons">
              <li>
                  <Link to={"https://github.com/Vocabolangelo"} className="icon brands style2 fa-github">
                  <span className="label">GitHub</span>
                  </Link>
              </li>
              <li>
                  <Link to={"mailto:vocabolangelo@gmail.com"} className="icon style2 fa-envelope">
                    <span className="label">Email</span>
                  </Link>
              </li>
          </ul>
          <p>&copy;Vocabolangelo. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
      </div>
  </footer>
}

