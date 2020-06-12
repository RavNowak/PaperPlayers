import React from 'react';
import SquareComponent from '../SquareComponent/SquareComponent';
import GoalComponent from '../GoalComponent/GoalComponent';
import styles from './BoardComponent.module.scss';

class BoardComponent extends React.Component {
  addSquares = () => {
    const { rows, columns } = this.getRowsAndColumns();
    let squares = [];

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        const id_ = `row${i}column${j}`;
        const coordinates_ = {
          row: i,
          column: j
        }

        squares.push(
          <SquareComponent
            key={id_}
            id={id_}
            rows={rows}
            columns={columns}
            coordinates={coordinates_}
            saveMove={this.props.saveMove}
            allowMove={this.props.allowMove}
          />)
      }
    }

    return squares;
  }

  getRowsAndColumns = () => {
    switch (this.props.size) {
      case 'small': return { rows: 6, columns: 10 }
      case 'medium': return { rows: 8, columns: 12 }
      case 'big': return { rows: 10, columns: 14 }
      default: break;
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <GoalComponent 
          left={true}
          notifyOwnGoal={this.props.notifyOwnGoal}
          notifyWin={this.props.notifyWin}
        />
        <div className={styles[ this.props.size + 'Board' ]}>
          {this.addSquares()}
        </div>
        <GoalComponent 
          right={true}
          notifyOwnGoal={this.props.notifyOwnGoal}
          notifyWin={this.props.notifyWin}
        />
        </div>
    );
  }
}

export default BoardComponent;