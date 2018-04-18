import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

class TodoListItem extends React.Component{
  // + add new items to the list
  // legyen: checkbox, title, description
  // state nelkul   https://reactjs.org/docs/components-and-props.html

  render() {
    return (
      <li>
        <input type="checkbox" name={this.props.name} checked={this.props.value.checked} onChange={this.props.onChange}></input>
        {this.props.value.label}
      </li>
    );
  }
}

class NewEntry extends React.Component{

  state = {
    newitem: ""
  }

  handleChange = (event) => {
    console.log(event.target.value);
    this.setState({
      newitem: event.target.value
    })
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    this.props.onNewEntry(this.state.newitem);
    this.setState({
      newitem:""
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.newitem} name="newitem" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

class TodoList extends React.Component{
  state = {
      0:{
        label: "asdad",
        checked: true,
        description: "hello"
      },
      1:{
        label: "asdad21",
        checked: false,
        description: "hello"
      },
      2:{
        label: "asdad132123123",
        checked: true,
        description: "hello"
      }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: {
        label: this.state[event.target.name].label,
        checked: event.target.checked
      }
    })
    console.log(event.target.checked);
  }

  getName = (event) =>{
    console.log(event.target.value);
    return event.target.value;
  }

  addEntry = (entryName) => {
    
    let arr = Object.keys(this.state);
    let lastKey = arr.length;

    // console.log(event.target["0"].value);

    this.setState({
      [lastKey]: {
        label: entryName,
        checked: false,
        description: "adasd"
      }
    })
  }


  render(){
    return(
      <div>
        <h3>Todo List:</h3>
        <ul>
          {Object.entries(this.state).map(([key, el])=>
          !el.checked && <TodoListItem key = {key} name = {key} value = {el} onChange={this.handleChange}/>
          )}
        </ul>

        <h3>Done</h3>
        <ul>
          {Object.entries(this.state).filter(([key, el]) => el.checked).map(([key, el])=>
          <TodoListItem key = {key} name = {key} value = {el} onChange={this.handleChange}/>
        )}
        </ul>

        <NewEntry onNewEntry={this.addEntry}/>
      
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
ReactDOM.render(<TodoList />, document.getElementById("list"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
