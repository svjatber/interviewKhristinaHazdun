import fireB from "../../file";
import React, {useEffect, useMemo, useState} from 'react'
import '../../App.css'

// при спрацюванні таймер mobile  створюється в database інший обект який буде змінювати лише при активності таймер desktop
const TimerMobile = ({user}) =>{
    const [timerMobile, setTimerMobile] = useState('')


    const setTime =  () =>{
        setTimeout(  ()=>{
            setTimerMobile(timerMobile + 1);
        },1000)
    }

    const CountFromDatabase =  () =>{ // перевірка на наяявність значення в таймері mobile
        let starCountRef = fireB.database().ref(`mobile/${user.uid}`);
        starCountRef.on('value',  function  (count){
            let data =  count.val();
            if(!data){
                setTimerMobile(0)
            }else{
                setTimerMobile(data.count);
            }

        });
    }

    const CountToDatabase = () =>{
        fireB.database().ref(`mobile/${user.uid}`).set({count: timerMobile, mobile: 'have'}) // змінна значення таймера
    }


    useEffect(()=>{
        CountFromDatabase()
    }, []);


    useEffect(()=>{ // починається робота таймера
        if(typeof timerMobile === 'number') {
            setTime()
            CountToDatabase()
        }
    }, [timerMobile]);


    return(
        <div className='timer'>
            <h2>Mobile {timerMobile}</h2>
            <svg width="185" height="217" viewBox="0 0 185 217" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M163.223 66.7016L171.731 58.1936C175.037 54.8874 175.037 49.5266 171.731 46.2221C168.425 42.9159 163.066 42.9159 159.76 46.2221L151.252 54.7301C136.977 42.8364 119.632 35.6512 101.129 33.9692V16.9316H109.312C113.988 16.9316 117.777 13.1403 117.777 8.46497C117.777 3.78962 113.988 0 109.312 0H76.0137C71.3384 0 67.5488 3.78962 67.5488 8.46497C67.5488 13.1403 71.3384 16.9316 76.0137 16.9316H84.1973V33.9692C37.8808 38.181 0.953125 77.0904 0.953125 125.289C0.953125 175.976 41.9701 217 92.6639 217C143.349 217 184.373 175.983 184.373 125.289C184.373 103.638 176.916 83.1332 163.223 66.7016ZM92.6622 200.068C51.4301 200.068 17.8831 166.523 17.8831 125.289C17.8831 84.057 51.4301 50.5117 92.6622 50.5117C133.896 50.5117 167.441 84.057 167.441 125.289C167.441 166.523 133.896 200.068 92.6622 200.068ZM131.894 86.0586C135.201 89.3648 135.201 94.7256 131.894 98.0301L98.6488 131.276C95.3426 134.582 89.9819 134.582 86.6773 131.276C83.3711 127.97 83.3711 122.609 86.6773 119.304L119.921 86.0586C123.228 82.7524 128.588 82.7524 131.894 86.0586Z" fill="black"/>
            </svg>
        </div>
    );
}
export default TimerMobile
