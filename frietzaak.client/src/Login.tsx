function Login({ backToMain, handleLogin }) {
    

    return (
        <>
            <div className="border border-2 border-white rounded rounded-xl p-10 ">
            <form onSubmit={handleLogin}>
                <label className="text-black font-bold" htmlFor="email">Email address:</label><br />
                <input className="my-2 bg-slate-300 text-black" type="text" id="email" name="email" /><br />                
                <label className="text-black font-bold" htmlFor="password">Password:</label><br />
                <input className="my-2 bg-slate-300 text-black" type="password" id="password" name="password" /><br />
                <button className="border rounded-full w-full my-3 px-3 py-1 bg-slate-600" type="submit">Login</button>
                <div className="my-3 border border-slate-700"></div>
                <button type="button" className="border w-full my-3 px-3 py-1 bg-slate-700" onClick={backToMain} >Return</button>
                </form>
            </div>
        </>
    );
}

export default Login;