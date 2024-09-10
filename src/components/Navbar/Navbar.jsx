import '/Navbar.css'
function Navbar() {
    return (
        <div className="header-container">
            <header>
                <div className="logo">
                    <h1>SEAMedical</h1>
                </div>
                <nav>
                    <ul>
                        <li>Home</li>
                        <li>Appointment</li>
                        <li>Sign Up</li>
                        <li>Login</li>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Navbar