import "./NavBar.css"

const NavBar = () => {
    return(
        <div className="nav">
            <h3 className="header">Chats</h3>

            <div className="nav-list">
                <h5 className="nav-header">Channels</h5>
            </div>

            <div className="nav-list">
                <h5 className="nav-header">Direct Messages</h5>
            </div>
        </div>
    )
}

export default NavBar;
