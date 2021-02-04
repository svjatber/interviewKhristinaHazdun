import React from 'react'
import '../App.css'

const Login = (props) =>{

    const {email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        handleSignUp,
        hasAccount,
        setHasAccount,
        emailError,
        passError,
        name,
        surname,
        setName,
        setSurname
    } = props


    return (
        <div className='login'>
            <div className='logContainer'>
                {
                    !hasAccount && // для реєстрації
                        <>
                        <label>Name</label>
                    <input type="text" required autoFocus value={name} onChange={(e)=> setName(e.target.value)  }/>
                    <label>Surname</label>
                    <input type="text" required autoFocus value={surname} onChange={(e)=>setSurname(e.target.value) }/>
                        </>
                }
                <label>Username</label>
                <input type="text" required autoFocus value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <p className='errorMessage'>{emailError}</p>
                <label>Password</label>
                <input type="password" required autoFocus value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <p className='errorMessage'>{passError}</p>
                <div>
                    {
                        hasAccount ? ( // реєстрація або логінізація
                            <>
                                <button onClick={handleLogin} className='buttonContainer'>Sign in</button>
                                <p>Don`t have an account ? <span onClick={()=>setHasAccount(!hasAccount)}> Sign up</span></p>
                            </>
                        ) : (
                            <>
                                <button onClick={handleSignUp} className='buttonContainer'>Sign up</button>
                                <p>Have an account ? <span onClick={()=>setHasAccount(!hasAccount)}>Sign in</span></p>
                            </>
                        )
                    }

                </div>
            </div>
        </div>
    )
}
export default Login
