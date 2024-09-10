import './Sign_Up.css'
function Sign_Up() {
    return (

        <div className="body">
            <div className="form-container">
                <form>
                    <h1>Sign Up</h1>
                    <div className="input-control">
                        <select name="role" id="role">
                            <option value="">Doctor</option>
                            <option value="">Patient</option>
                        </select>
                    </div>
                    <div className="input-control">
                        <input type="text" placehold=" " name="" id="" />
                        <label for="">Name</label>
                    </div>
                    <div className="input-control">
                        <input type="tel" max={10} maxLength={10} placehold=" " name="" id="" />
                        <label for="">Phone Number</label>
                    </div>
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
                        <input type="reset" name="" id="" />
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Sign_Up