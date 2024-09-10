import './Login.css'

function Login() {
    return (
        <div className="body">
            <div className="form-container">
                <form>
                    <h1>Login</h1>

                    <div className="input-control">
                        <input type="email" placehold=" " name="" id="" />
                        <label for="">Email</label>
                    </div>
                    <div className="input-control">
                        <input type="password" placehold=" " name="" id="" />
                        <label for="">Password</label>
                    </div>
                    <div className="input-control">
                        <input type="submit" value="Login" id="" />
                    </div>
                    <div className="input-control">
                        <input type="reset" id="" />
                    </div>
                    <div className="">
                        <p>Forgot Password</p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login