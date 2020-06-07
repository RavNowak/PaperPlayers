import React from 'react';
import SquareComponent from '../SquareComponent/SquareComponent';
import styles from './BoardComponent.module.scss';
import GoalComponent from '../GoalComponent/GoalComponent';

class BoardComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  addSquares = () => {
    // const rows = this.props.rows;
    // const columns = this.props.columns;

    const { rows, columns } = this.getRowsAndColumns();
    console.log(rows, columns)

    let squares = [];

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= columns; j++) {
        const id_ = `row${i}column${j}`;
        const coordinates_ = {
          row: i,
          column: j
        }

        squares.push(<SquareComponent
          key={id_}
          id={id_}
          rows={rows}
          columns={columns}
          coordinates={coordinates_}
          saveMove={this.props.saveMove} />)
      }
    }

    return squares;
  }

  getRowsAndColumns = () => {
    switch (this.props.size) {
      case 'small': return { rows: 6, columns: 10 }
      case 'medium': return { rows: 8, columns: 12 }
      case 'big': return { rows: 10, columns: 14 }
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <GoalComponent left={true}/>
        <div className={styles[ this.props.size + 'Board' ]}>
          {this.addSquares()}
        </div>
        <GoalComponent right={true}/>
        </div>
    );
  }
}

export default BoardComponent;