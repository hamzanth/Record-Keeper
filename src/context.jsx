import { useState, createContext } from 'react'

const CustomerContext = createContext("")

const CustomerProvider = ({ children }) => {

const initialCustomers = [
  {
    name: "Jibreel",
    department: "Civil Engineering",
    amountOwing: 0,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Habib",
    department: "Taxation",
    amountOwing: 40,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Abdul Razaq",
    department: "Mechanical Engineering",
    amountOwing: 150,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "AJ",
    department: "HSE",
    amountOwing: 0,
    amountOwed: 500,
    timeline: [],
    transactions: []
  },
  {
    name: "Yusuf",
    department: "Electrical Engineering",
    amountOwing: 300,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Abdul Kareem",
    department: "Petroleum Engineering",
    amountOwing: 200,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Musa",
    department: "Pyscho Therapy",
    amountOwing: 0,
    amountOwed: 350,
    timeline: [],
    transactions: []
  },
  {
    name: "Umar",
    department: "Uknown",
    amountOwing: 180,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Sanni",
    department: "Medicine",
    amountOwing: 0,
    amountOwed: 50,
    timeline: [],
    transactions: []
  },
  {
    name: "Abdul Hamid (Dockay)",
    department: "Medicine",
    amountOwing: 0,
    amountOwed: 0,
    timeline: [],
    transactions: [
      {
        date: new Date(),
        cleared: false,
        prods: {
            "Pale G": {
              quantity: 2,
              price: 60
            },
            "Choco Rings": {
              quantity: 2,
              price: 70
            },
            "Spaghetti": {
              quantity: 2,
              price: 600
            }
        }
      }
    ]
  },
  {
    name: "Saheed",
    department: "Maritime Engineering",
    amountOwing: 0,
    amountOwed: 400,
    timeline: [],
    transactions: []
  },
  {
    name: "Olamide",
    department: "Unknown",
    amountOwing: 600,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Mubarak",
    department: "Mathematics",
    amountOwing: 300,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Abdullai",
    department: "Mathematics",
    amountOwing: 40,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Idris",
    department: "Mechatronics",
    amountOwing: 0,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
  {
    name: "Idris",
    department: "Mathematics Education",
    amountOwing: 450,
    amountOwed: 0,
    timeline: [],
    transactions: []
  },
]
  const [customers, setCustomers] = useState(initialCustomers)
  // const saveTransaction = (customer, transaction, newOwed) => {
  //    const allCustomers = [...customers]
  //    const customerIndex = allCustomers.indexOf(customer)
  //    const partCustomer = allCustomers[customerIndex]
  //    const transList = [...partCustomer.transactions]
  //    // console.log(transList)
  //    const newTransaction = {
  //      prods: transaction,
  //      date: new Date(),
  //      cleared: false
  //    }
  //    const newTransList = [...transList, newTransaction]
  //    partCustomer.transactions = newTransList
  //    partCustomer.amountOwed = newOwed
  //    console.log("the part detail is now")
  //    console.log(partCustomer)
  //    allCustomers[customerIndex] = partCustomer
  //    setCustomers(allCustomers)
  // }

  const saveTransaction = (customer, transaction, amtOwing, amtOwed) => {
     const allCustomers = [...customers]
     const customerIndex = allCustomers.indexOf(customer)
     const partCustomer = allCustomers[customerIndex]
     const timeLineList = [...partCustomer.timeline]
     // console.log(transList)
     const newTimeLineList = [...timeLineList, transaction]
     partCustomer.amountOwing = amtOwing
     partCustomer.amountOwed = amtOwed
     partCustomer.timeline = newTimeLineList
     console.log(partCustomer)
     allCustomers[customerIndex] = partCustomer
     // console.log(allCustomers)
     setCustomers(allCustomers)
  }

  return (
    <CustomerContext.Provider value={{customers, setCustomers, saveTransaction}}>
      {children}
    </CustomerContext.Provider>
  )
}

export { CustomerProvider, CustomerContext }
