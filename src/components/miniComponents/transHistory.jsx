import React, { useState, useEffect } from 'react'
import styles from '../dashboard.module.css'
import Calendar from 'react-calendar'
import moment from 'moment'
import { Scrollbars } from 'react-custom-scrollbars-2'

const TransHistory = () => {
    const [ transHistory, setTransHistory ] = useState([])
    const [ currentDate, setCurrentDate ] = useState(new Date())
    useEffect(() => {
        // fetch("http://127.0.0.1:3000/transactions")
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data.transactions)
        //     setTransHistory(data.transactions)
        // })
        console.log(moment(new Date()).dayOfYear())
        // https://record-keeper-api.onrender.com/transactions/get-day
        // https://127.0.0.1/transactions/get-day
        fetch("https://record-keeper-api.onrender.com/transactions/get-day", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({date: currentDate})
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data.message)
            console.log(data.transactions)
            setTransHistory(data.transactions)
        })
    }, [currentDate])

    // const handleDateClicked = async (date) => {
    //     fetch("http://127.0.0.1:3000/transactions/get-day", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({date: date})
    //     })
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log(data.message)
    //         console.log(data.transactions)
    //     })
    //     .catch(error => console.log(error))
    // }

    return (
        <>  
            <div style={{scrollbarColor: "dodgerblue white"}}> 
                <h3 style={{textAlign: "center"}}>Transaction History</h3>
                <Calendar 
                    onClickDay={(date) => setCurrentDate(date)} 
                    onChange={setCurrentDate} 
                    value={currentDate}
                    tileClassName={({date, view}) => {
                        if (moment(date).dayOfYear().toString() === moment(currentDate).dayOfYear().toString()){
                            return 'highlight'
                        }
                    }}
                />
                {transHistory.length === 0 ? (
                    <p style={{textAlign: "center"}}>There are not transaction for this date</p>
                ) : (
                    <div>
                        {/* <div className={styles.scrollStyle}> */}
                        {/* <Scrollbars 
                            style={{width: 500, height: 140}}
                            renderTrackVertical={props => <div {...props} className='verticalTrack' />}
                            renderThumbVertical={props => <div {...props} className='verticalThumb' />}
                        > */}
                            {transHistory && transHistory.sort((a, b) => new Date(b.date) - new Date(a.date)).map(indHist => (
                                <div style={{border: "3px solid teal", borderRadius: "4px", padding: "6px", margin: "10px 0"}} key={indHist._id}>
                                    <p style={{ color: "black", margin: "0"}}>{indHist.name} - {moment(indHist.date).calendar()} ({moment(indHist.date).fromNow()})</p>
                                    {indHist.prods && indHist.prods.map(trans => (
                                        <p key={trans._id} style={{ color: "black", margin: "0"}}>{trans.name} {trans.quantity}</p>
                                    ))}
                                </div>
                            ))}
                        {/* </Scrollbars> */}
                        {/* </div> */}
                    </div>
                )}
            </div>
        </>
    )
}

export default TransHistory