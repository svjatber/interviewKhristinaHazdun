import React, {useEffect, useState} from 'react'
import TimerDesktop from "./timers/TimerDesktop";
import fireB from "../file";
import '../App.css'
import TimerMobile from "./timers/TimerMobile";

const User = ({handleLogout, user}) =>{

    const [timerDesktop, setTimerDesktop] = useState('')
    const [timerMobile, setTimerMobile] = useState('')


    const CountFromDatabase =  () =>{ // звернення на перевірку наявності десктопного таймера
        let starCountRef = fireB.database().ref(`count/${user.uid}`);
        starCountRef.once('value',  function  (count){
            let data =  count.val();
            if(!data){
                setTimerDesktop(0) // таймера десктопу нема
            }else{
                setTimerDesktop(data.count) // таймер декстоп є
                if(data.changeMobile === true){ // таймер десктоп активний тобто в інший вкладці тоді запускається таймер мобільний
                     setTimerMobile('openMobile')
                 }
            }
        });
    }


    useEffect( ()=> {
        CountFromDatabase()
        return function () { // відписка від таймер десктопу
            let starCountRef = fireB.database().ref(`count/${user.uid}`);
            starCountRef.once('value', function (count) {
                let data = count.val();
                fireB.database().ref(`count/${user.uid}`).set({...data, changeMobile: false}) // changeMobile стає false при відписці тоді таймер mobile не запускається
            })
        }
    },[])


    return(
        <div className='user'>
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            { typeof timerDesktop === 'number' && <TimerDesktop timerDesktop={timerDesktop} user={user} />}
            { timerMobile === 'openMobile' && <TimerMobile user={user} /> }
        </div>
    )
}
export default User

