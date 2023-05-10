import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, Button } from '@mui/material';
import { View, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [todoMessage, setTodoMessage] = useState('');
  const [todoId, setTodoId] = useState('');

  const refreshHandler = function () {
    fetch(
      'https://3jiqvblf6esnso4wi72j5j4f5i0wpisv.lambda-url.us-east-1.on.aws/',
      { method: 'POST', body: JSON.stringify({}) },
    )
      .then((data) => data.json())
      .then((data) => { 
        console.log(data);
        setTodoItems(
          data.my_data.map((item) => {
            return (
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell align='right'>{item.message}</TableCell>
                <TableCell align='right'><Button onClick={()=>{removeSpecificItemHandler(item.id)}}>Remove</Button></TableCell>
              </TableRow>
            );
          }),
        );
      });
  };

  const addItemHandler = function () {
    fetch(
      'https://yhl5u44f253mrzletlbecufqb40oeqlj.lambda-url.us-east-2.on.aws/',
      {
        method: 'PUT',
        body: JSON.stringify({ id: todoId, message: todoMessage }),
      },
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        refreshHandler();
      });
  };

  const removeItemHandler = function () {
    fetch(
      'https://yhl5u44f253mrzletlbecufqb40oeqlj.lambda-url.us-east-2.on.aws/',
      { method: 'DELETE', body: JSON.stringify({ id: todoId }) },
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        refreshHandler();
      });
  };

  const removeSpecificItemHandler = function (itemId) {
    fetch(
      'https://yhl5u44f253mrzletlbecufqb40oeqlj.lambda-url.us-east-2.on.aws/',
      { method: 'DELETE', body: JSON.stringify({ id: itemId }) },
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        refreshHandler();
      });
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <div style={{ margin: '1em' }}>
        <TextField
          id='filled-basic'
          label='id'
          variant='filled'
          onChange={(e) => {
            setTodoId(e.target.value);
          }}
        />
      </div>
      <div style={{ margin: '1em' }}>
        <TextField
          id='filled-basic'
          label='Todo Message'
          variant='filled'
          onChange={(e) => {
            setTodoMessage(e.target.value);
          }}
        />
      </div>
      <div style={{ margin: '2em', display:'flex', flexDirection:'row', justifyContent:'center' }}>
        <div style={{ margin: '1em' }}>
          <Button variant='contained' onClick={refreshHandler}>
            Refresh
          </Button>
        </div>
        <div style={{ margin: '1em' }}>
          <Button variant='contained' onClick={addItemHandler}>
            Add
          </Button>
        </div>
        <div style={{ margin: '1em' }}>
          <Button variant='contained' onClick={removeItemHandler}>
            Remove
          </Button>
        </div>
      </div>
      <div
        style={{
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <div>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='right'>ID</TableCell>
                <TableCell align='right'>Message</TableCell>
                <TableCell align='right'>Remove</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{todoItems}</TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default App;
