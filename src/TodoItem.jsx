import React from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export const TodoItem = (props)=>{


    return(
        <div>
            <Paper elevation={3}>
                <p>{props.message}</p>
            </Paper>
        </div>
    )


}