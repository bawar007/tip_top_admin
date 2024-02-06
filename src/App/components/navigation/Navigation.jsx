import { Link } from "react-router-dom";
import { deletePassCookie } from "../../Pages/Login/helpers/SetCookie";
import { useEffect, useState } from "react";

const Navigation = () => {
  const [toggleMenu, setMenu] = useState(false);

  useEffect(() => {
    const adminContent = document.querySelector(".AdminPanelContent--setings");
    if (toggleMenu) {
      adminContent.style.zIndex = "-1";
    } else {
      adminContent.style.zIndex = "0";
    }
  }, [toggleMenu]);

  return (
    <div className="NavigationAdminPanel">
      <input
        type="checkbox"
        id="menu-toggleAdmin"
        checked={toggleMenu}
        readOnly
      />
      <label
        htmlFor="menu-toggleAdmin"
        className="menuToggleAdmin"
        onClick={() => setMenu((prev) => !prev)}
      >
        <span className="navicon"></span>
      </label>
      <ul className="navigation-menu">
        <span></span>
        <li className="menu-item">
          <Link
            to="gallerysettings"
            className="item-link"
            onClick={() => setMenu(false)}
          >
            <img
              src="/icons/projects.svg"
              alt="projects"
              width={40}
              height={40}
            />
            <p>Projekty</p>
          </Link>
        </li>
        <span></span>
        <li className="menu-item">
          <Link
            to="opinionssettings"
            className="item-link"
            onClick={() => setMenu(false)}
          >
            <img src="/icons/whyus.svg" alt="whyus" width={40} height={40} />
            <p>Opinie</p>
          </Link>
        </li>
        <span></span>
        <li className="menu-item">
          <Link
            to="/login"
            onClick={() => {
              setMenu(false);
              deletePassCookie();
              sessionStorage.clear();
            }}
            className="item-link"
          >
            <img src="/icons/logout.svg" alt="logout" width={40} height={40} />
          </Link>
        </li>
        <span></span>
      </ul>
    </div>
  );
};

export default Navigation;
