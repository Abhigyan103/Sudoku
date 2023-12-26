import { useEffect, useState } from "react";
import "./App.css";

function Cell({ value, pos, grid,index, setGrid, className }) {
  return (
    <input
      type="text"
      className={`cell ${className}`}
      value={value}
      id={pos}
      onChange={(e) => {
        let ar = [...grid];
        let val = e.target.value[0];
        const posi=[parseInt(pos[0]),parseInt(pos[1])];
        if ((val >= "1" && val <= "9")) {
          ar[posi[0]][posi[1]] = val;
          if(index !=80){document.getElementsByClassName('cell')[index+1].focus();}
          setGrid(ar);
        }else if(val==null){
          ar[posi[0]][posi[1]] = '';
          if(index !=0){document.getElementsByClassName('cell')[index-1].focus();}
          setGrid(ar);
        }
      }}></input>
  );
}

function check(board, i, j, cond) {
  let a = true;
  let b = cond;
  for (let k = 0; k < 9; k++) {
    if ((board[i][k] == b && k ^ j) || (board[k][j] == b && k ^ i)) a = false;
  }
  let r = Math.floor(i / 3) * 3;
  let c = Math.floor(j / 3) * 3;
  for (let p = r; p < r + 3; p++) {
    for (let q = c; q < c + 3; q++) {
      if (board[p][q] == b && p != i && q != j) a = false;
    }
  }
  return a;
}

function solve(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] == "") {
        for (let k = 1; k <= 9; k++) {
          if (check(board, i, j, k)) {
            board[i][j] = k;
            if (solve(board)) {
              return 1;
            } else {
              board[i][j] = "";
            }
          } else {
            continue;
          }
        }
        return 0;
      }
    }
  }
  return 1;
}

function App() {
  const [grid, setGrid] = useState([]);
  useEffect(() => {
    let ar = [];
    for (let i = 0; i < 9; i++) {
      ar[i] = [];
      for (let j = 0; j < 9; j++) {
        ar[i][j] = "";
      }
    }
    setGrid(ar);
  }, []);
  const update = () => {
    let ar = [];
    for (let i = 0; i < 9; i++) {
      ar[i] = [];
      for (let j = 0; j < 9; j++) {
        ar[i][j] = i;
      }
    }
    setGrid(ar);
  };

  return (
    <>
      <div className="board">
        <Board boardGrid={grid} setGrid={setGrid} />
      </div>
      <button
        type="submit"
        onClick={() => {
          let arr = [...grid];
          if(solve(arr)==1){setGrid(arr);}
          else {
            alert('Umm... This is awkward but can you check if  the input is correct ?');
          }
        }}>
        Solve
      </button>
    </>
  );
}
function Board(props) {
  const { boardGrid, setGrid } = props;
  return boardGrid.map((e, i) => {
    return (
      <div className="board_section" key={i}>
        {e.map((v, j) => {
          return (
            <Cell
              value={v}
              className={
                ((i + 1) % 3 == 0 && i != 8 ? "vsp " : "") +
                ((j + 1) % 3 == 0 && j != 8 ? "hsp" : "")
              }
              key={`${i}${j}`}
              pos={`${i}${j}`}
              index={9*i+j}
              grid={boardGrid}
              setGrid={setGrid}
            />
          );
        })}
      </div>
    );
  });
}

export default App;
