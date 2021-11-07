import React from "react";
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addCustomerAction, removeCustomerAction} from "./store/customersReducer";
import {fetchCustomers} from "./thunk/customers";


function App() {
    const dispatch = useDispatch()
    const cash = useSelector(state => state.cash.cash)
    const customers = useSelector(state => state.customers.customers)

    const addCash = (cash) => {
        dispatch({type: 'ADD_CASH', payload: cash})
    }
    const getCash = (cash) => {
        dispatch({type: 'GET_CASH', payload: cash})
    }
    const addCustomer = (name) => {
        const customer = {
            name,
            id: Date.now()
        }
        dispatch(addCustomerAction(customer))
    }
    const removeCustomer = (customer) => {
        dispatch(removeCustomerAction(customer.id))
    }

    return (
        <div className="App">
            <div style={{fontSize: '3rem'}}>{cash}</div>
            <div style={{display: 'flex'}}>
                <button onClick={() => addCash(Number(prompt()))}>Top up the account</button>
                <button onClick={() => getCash(Number(prompt()))}>Withdraw</button>
                <button onClick={() => addCustomer(prompt())}>Add client</button>
                {<button onClick={() => dispatch(fetchCustomers())}>Add customers from base</button>}
            </div>
            {customers.length > 0
                ? <div>
                    {customers.map(c =>
                    <div onClick={() => removeCustomer(c)} style={{fontSize: '2rem', marginTop: '5px', border: '1px solid black', padding: '10px'}}>{c.name}</div>)}
                </div>
                : <div style={{fontSize: '2rem', marginTop: '20px'}}>
                    No clients!
                </div>
            }
        </div>
    );
}

export default App;
