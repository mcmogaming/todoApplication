import logo from './logo.svg';
import './App.css';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
          <h1>Todo List 2</h1>
          <TextField id="filled-basic" label="Todo Message" variant="filled" />
          <Button variant="contained">Send</Button>
    </div>
  );
}

export default App;
