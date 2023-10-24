import React, { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'
import Calendar from 'react-calendar'
import moment from 'moment'

const TransHistory = () => {
    const [ transHistory, setTransHistory ] = useState([])
    useEffect(() => {
        fetch("http://127.0.0.1:3000/transactions")
        .then(resp => resp.json())
        .then(data => {
            console.log(data.transactions)
            setTransHistory(data.transactions)
        })
    }, [])

    const handleDateClicked = async (date) => {
        fetch("http://127.0.0.1:3000/transactions/get-day", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date: date})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            console.log(data.transactions)
        })
        .catch(error => console.log(error))
    }

    return (
        <>  
            <div style={{scrollbarColor: "dodgerblue white"}}> 
                <h3>Trans History</h3>
                <Calendar onClickDay={handleDateClicked}/>
                <div className={styles.scrollStyle}>
                    {transHistory && transHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).map(indHist => (
                        <div style={{border: "1px solid black"}} key={indHist._id}>
                            <p style={{ color: "black", margin: "0"}}>{indHist.name}({moment(indHist.date).fromNow()})</p>
                            {indHist.prods && indHist.prods.map(trans => (
                                <p key={trans._id} style={{ color: "black", margin: "0"}}>{trans.name} {trans.quantity}</p>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TransHistory