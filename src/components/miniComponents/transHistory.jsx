import React, { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'
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

    return (
        <>  
            <div style={{scrollbarColor: "dodgerblue white"}}> 
                <h3>Trans History</h3>
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