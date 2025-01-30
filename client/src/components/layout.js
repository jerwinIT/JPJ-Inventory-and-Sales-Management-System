import Navbar from "./navbar";

//if we render the Layout component
const Layout = ({ children }) => {
    return (
        <div>
            {/* Navbar will render */}
            <Navbar />
            <div className="container">{children}</div>

        </div>


    )
}

export default Layout