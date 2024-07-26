import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

const Logout = () => {
    const history = useHistory();

    const handleLogout = () => {
        localStorage.clear();
        history.push('/login');
    };

    return (<a className="dropdown-item" onClick={handleLogout}>Đăng xuất</a>);
}

export default Logout;