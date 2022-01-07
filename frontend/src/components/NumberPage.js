import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { submitNumberAsync, resetNumber } from '../redux/numberSlice';
import { Alert } from 'react-bootstrap'

const NumberPage = () => {
    const [newNumber, setNewNumber] = useState(0);

    const dispatch = useDispatch();
    const {number, loading, error} = useSelector((state) => state.number);

    const handleNumberSubmit = () => {
        dispatch(submitNumberAsync({
            number: newNumber,
        }))
    }

    const updateValuesOnChange = (number) => {
        // set new number in local state to 0
        setNewNumber(parseInt(number));
        // reset global state to 0
        dispatch(resetNumber());
    }

    return (
        <div style={{
            textAlign: 'center',
        }}>
            {error && (
                <Alert variant='danger' style={{
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%'
                }}>{error}</Alert>
            )}
            <div style={{marginTop: '100px'}}>

                <label htmlFor='number'>Insert a number </label>
                <input 
                    type='text'
                    id='number'
                    name='number'
                    onChange={(e) => updateValuesOnChange(e.target.value)}
                ></input>

                <button 
                    onClick={handleNumberSubmit}
                >Submit</button>
            </div>

            <div style={{
                fontSize: '3em',
                marginTop: '200px',
            }}>
                {loading === 'pending' ? <p>Loading...</p> 
                : (
                    <span>{newNumber} ( 2 ) + 10 = {number.number}</span>
                )}
            </div>
        </div>
    )
}

export default NumberPage;