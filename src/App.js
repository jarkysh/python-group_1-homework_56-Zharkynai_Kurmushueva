import React, {Component} from 'react';
import './App.css';
import Field from "./components/Field/Field";
import Cell from "./components/Field/Cell/Cell";
import Counter from './components/Menu/Tries';
import Button from './components/Menu/Reset';

// Чтобы FIELD_SIZE корректно работал, нужно ширину поля и ячеек задавать динамически
// через style в Cell.js, а не через классы. Тем не менее,
// количество ячеек на поле можно менять прямо сейчас, но они будут некорректно отображаться -
// будут выходить за границы поля или не заполнять поле, если их слишком мало.
const FIELD_SIZE = 6;


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cells: this.generateCells(),
            counter: 0,
            win: false
        }
    }

    generateCells = () => {
        let cells = [];
        let cellsCount = FIELD_SIZE ** 2;
        for (let i = 0; i < cellsCount; i++) {
            cells.push({
                open: false,
                hasItem: false,
            })
        }
        let randomIndex = Math.floor(Math.random() * cellsCount);
        cells[randomIndex].hasItem = true;
        console.log(cells)
        return cells;
    };

    openCell = (id) => {
        if (!this.state.win) {
            let cell = {...this.state.cells[id]};

            if (!cell.open) {
                cell.open = true;


                let cells = [...this.state.cells];
                cells[id] = cell;

                let state = {...this.state};
                if (cell.hasItem) {
                    state.win = true;
                }
                state.cells = cells;
                state.counter = state.counter + 1;

                this.setState(state);
            }
        }
    };

    resetGame = () => {
        let state = {...this.state};
        state.cells = this.generateCells();
        state.counter = 0;
        state.win = false;

        this.setState(state);
    };

    render() {
        return (
            <div className="container">
                {this.state.win ? <h1 className='youwin'>You Win!</h1>
                    :
                    null }
                <Field>

                    {this.state.cells.map((item, index) =>
                        <Cell
                            cell={item}
                            key={index}
                            click={() => this.openCell(index)}
                        />
                    )}

                </Field>
                <Counter tries={this.state.counter}/>
                <Button reset={this.resetGame}/>


            </div>
        );
    }
}

export default App;