import { useState } from "react";
import Popup from "./Popup";
import Logo from "../Authentication/Login/Logo";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Logout from "../Authentication/Logout";

const Header = ({avatar}) => {

    const [popupType, setPopupType] = useState(null);

    function TogglePopup(type) {
        setPopupType(type === popupType ? null : type);
    }; 

  return (
    <header>
      <nav
        id="myNavbar"
        className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow"
      >
        <div className="container-fluid">
          <Logo></Logo>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target=".navbar-collapse"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
            <div className="col"></div>
            <div className="col-auto px-2">
              <div className="dropdown">
                <button
                  className="dropdown-btn"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title="Tạo hoặc tham gia lớp học"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                {popupType && (<Popup onClose={() => setPopupType(null)} type={popupType} />)}
                <ul className="dropdown-menu shadow">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => TogglePopup('join')}>
                      Tham gia 
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => TogglePopup('create')}>
                      Tạo lớp học
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-auto">
              <i className="fa-solid fa-table-cells"></i>
            </div>

            <div className="col-auto px-2">
              <div className="dropdown">
                <button
                  className="dropdown-btn custom"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  title="Quản lý tài khoản"
                >
                    <img className="avt" src={avatar}></img>
                </button>
                <ul className="dropdown-menu shadow">
                  <li>
                    <a className="dropdown-item" href="#" onClick={() => TogglePopup('profile')}>
                      Hồ sơ
                    </a>
                  </li>
                  <li>
                    <Logout></Logout>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-auto"></div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
