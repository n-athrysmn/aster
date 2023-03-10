import React from "react"
import '../Styles/header.css'


function Header() {

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    return (
        <div>
            <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-100">
                </ul>
                <div className="col-md-3 text-end">
                    <button onClick={logout} type="button" className="btn btn-primary">Logout</button>
                </div>
            </header>
        </div>
    )

}

export default Header