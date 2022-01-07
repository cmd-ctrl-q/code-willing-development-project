import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const submitNumberAsync = createAsyncThunk(
    'number/submitNumberAsync',
    async (payload, { rejectWithValue }) => {
        const response = await fetch('http://localhost:5000/api/number', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: payload.number })
        })
        if (response.ok) {
            const newNumber = await response.json();
            return { number: newNumber };
        }

        return rejectWithValue({ status: response.status })
    }
)

const numberSlice = createSlice({
    name: 'number', 
    initialState: {
        number: 0,
        loading: 'idle',
        error: '',
    },
    reducers: {
        // reset number and error
        resetNumber: (state, action) => {
            state.number = 0;
            state.error = '';
        }
    },
    extraReducers: {
        [submitNumberAsync.pending]: (state, action) => {
            if (state.loading === 'idle') {
                state.loading = 'pending'
            }
        },
        [submitNumberAsync.fulfilled]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
            }
            state.number = action.payload.number
        },
        [submitNumberAsync.rejected]: (state, action) => {
            if (state.loading === 'pending') {
                state.loading = 'idle'
            }

            switch (action.payload.status) {
                case 400:
                    state.error = 'Invalid number'
                    break
                case 500:
                    state.error = 'Server error'
            }
            state.number = 0
        }
    }
})

export const { resetNumber } = numberSlice.actions;

export default numberSlice.reducer;