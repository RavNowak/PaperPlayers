import React from 'react';

import { connect } from 'react-redux';
import { EventEmitter } from '../../Common/EventEmitter';
import { EventType } from '../../Common/EventTypes';

import './SquareComponent.scss';

class SquareComponent extends React.Component {
  constructor(props) {
    super(props);

    //
    // When line is confirmed it means that it can't
    // be no longer deleted by right click. repaint flags
    // refers to user decisions before move confirmation.
    //

    this.lines = {
      top: { name: 'borderTop', repaint: true, userConfirmed: false, oponentConfirmed: false },
      bottom: { name: 'borderBottom', repaint: true, userConfirmed: false, oponentConfirmed: false },
      left: { name: 'borderLeft', repaint: true, userConfirmed: false, oponentConfirmed: false },
      right: { name: 'borderRight', repaint: true, userConfirmed: false, oponentConfirmed: false },
      diagonal1: { name: 'topLeftBottomRight', repaint: true, userConfirmed: false, oponentConfirmed: false },
      diagonal2: { name: 'topRightBottomLeft', repaint: true, userConfirmed: false, oponentConfirmed: false },
    }

    this.squareStyle = {
      basicSquare: ' basicSquare',
      leftSquare: ' leftSquare',
      transparentLeftSquare: ' transparentLeftSquare',
      transparentRightSquare: ' transparentRightSquare',
      bottomSquare: ' bottomSquare',
      topLeftSquare: ' topLeftSquare',
      bottomLeftSquare: ' bottomLeftSquare',
      topRightSquare: ' topRightSquare',
      bottomRightSquare: ' bottomRightSquare',
      centerBottomLeftSquare: ' centerBottomLeftSquare',
      centerTopLeftSquare: ' centerTopLeftSquare',
      centerBottomRightSquare: ' centerBottomRightSquare'
    }

    this.lineStyle = {
      defaultInactiveColor: 'rgb(255, 255, 255)',
      defaultCenterColor: 'rgba(255, 255, 0, 0.675)',
      default: '1px dashed rgb(255, 255, 255)',
      center: '1px dashed rgba(255, 255, 0, 0.675)',
      userBacklight: '',
      oponentBacklight: ''
    }

    this.centerLine = '';
  }

  componentDidMount = () => {
    EventEmitter.subscribe(EventType.GAME_MOVES, this.handleRecivedMoves);
    EventEmitter.subscribe(EventType.LINE_CONFIRMED, this.handleOwnMovesConfirmed);
    EventEmitter.subscribe(EventType.CLEAR_MOVES, this.clearUnconfirmedMoves);

    this.setUserAndOponentColor();
  }

  clearUnconfirmedMoves = (localMoves) => {
    for (const move of localMoves) {
      if (move.id === this.props.id) {
        for (let key in this.lines) {
          const line = this.lines[ key ];
          if (line.name === move.name) {
            line.repaint = true;
          }
        }
      }
    }
    this.clear();
  }

  handleRecivedMoves = (data) => {
    for (const move of data.moves) {
      if (move.id === this.props.id) {
        for (let key in this.lines) {
          const line = this.lines[ key ];
          if (line.name === move.name) {
            line.repaint = false;
            line.oponentConfirmed = true;
          }
        }
        this.drawBorderLine(move, this.lineStyle.oponentBacklight);
      }
    }
  }

  handleOwnMovesConfirmed = (moves) => {
    for (const move of moves) {
      if (move.id === this.props.id) {
        for (let key in this.lines) {
          const line = this.lines[ key ];
          if (line.name === move.name) {
            line.repaint = false;
            line.userConfirmed = true;
          }
        }
      }
    }
  }

  setUserAndOponentColor = () => {
    if (this.props.initializer) {
      this.lineStyle.userBacklight = '1px solid ' + this.getColorAsRGB(this.props.userLineColor);
      this.lineStyle.oponentBacklight = '1px solid ' + this.getColorAsRGB(this.props.oponentLineColor);
    }
    else {
      this.lineStyle.userBacklight = '1px solid ' + this.getColorAsRGB(this.props.oponentLineColor);
      this.lineStyle.oponentBacklight = '1px solid ' + this.getColorAsRGB(this.props.userLineColor);
    }
  }

  getColorAsRGB = (color) => {
    switch (color) {
      case 'red': return 'rgb(255, 0, 0)';
      case 'green': return 'rgb(124, 252, 0)';
      case 'blue': return 'rgb(0, 191, 255)';
      default: break;
    }
  }

  isLeftSquare = () => {
    return this.props.coordinates.column === 1;
  }

  isRightSquare = () => {
    return this.props.coordinates.column === this.props.columns;
  }

  isBottomSquare = () => {
    return this.props.coordinates.row === this.props.rows;
  }

  isCenterRow = () => {
    return this.props.coordinates.row === this.props.rows / 2 ||
      this.props.coordinates.row === (this.props.rows / 2) + 1;
  }

  getCornerStyle = () => {
    const rows = this.props.rows;
    const columns = this.props.columns;
    const row = this.props.coordinates.row;
    const column = this.props.coordinates.column;

    if (row === 1 && column === 1) {
      return this.squareStyle.topLeftSquare;
    }
    else if (row === rows && column === 1) {
      return this.squareStyle.bottomLeftSquare;
    }
    else if (row === 1 && column === columns) {
      return this.squareStyle.topRightSquare;
    }
    else if (row === rows && column === columns) {
      return this.squareStyle.bottomRightSquare;
    }
    else {
      return '';
    }
  }

  getCenterStyle = () => {
    const rows = this.props.rows;
    const columns = this.props.columns;
    const row = this.props.coordinates.row;
    const column = this.props.coordinates.column;

    if (row === rows / 2 && column === columns / 2) {
      this.centerLine += this.lines.right.name;
      return this.squareStyle.centerTopLeftSquare;
    }
    else if (row === rows / 2 + 1 && column === columns / 2) {
      this.centerLine += (this.lines.right.name + this.lines.top.name);
      return this.squareStyle.centerBottomLeftSquare;
    }
    else if (row === rows / 2 + 1 && column === columns / 2 + 1) {
      this.centerLine += this.lines.top.name;
      return this.squareStyle.centerBottomRightSquare;
    }
    else {
      return '';
    }
  }

  getStyle = () => {
    let style = this.squareStyle.basicSquare;

    if (this.isLeftSquare()) {
      style += this.squareStyle.leftSquare;

      if (this.isCenterRow()) {
        style += this.squareStyle.transparentLeftSquare;
      }
    }

    if (this.isBottomSquare()) {
      style += this.squareStyle.bottomSquare;
    }

    if (this.isRightSquare() && this.isCenterRow()) {
      style += this.squareStyle.transparentRightSquare;
    }

    style += this.getCenterStyle();

    return style;
  }

  getActiveLine = (mouseX, mouseY) => {
    const self = document.getElementById(this.props.id);

    if (mouseY - self.getBoundingClientRect().top < 5) {
      return this.lines.top;
    }
    else if (self.getBoundingClientRect().bottom - mouseY < 5) {
      return this.lines.bottom;
    }
    else if (mouseX - self.getBoundingClientRect().left < 5) {
      return this.lines.left;
    }
    else if (self.getBoundingClientRect().right - mouseX < 5) {
      return this.lines.right;
    }
    else if (((mouseY - self.getBoundingClientRect().top < 20) && (mouseX - self.getBoundingClientRect().left < 20)) ||
      ((self.getBoundingClientRect().bottom - mouseY < 20) && (self.getBoundingClientRect().right - mouseX < 20))) {
      return this.lines.diagonal1;
    }
    else if (((mouseY - self.getBoundingClientRect().top < 20) && (self.getBoundingClientRect().right - mouseX < 20)) ||
      ((self.getBoundingClientRect().bottom - mouseY < 20) && (mouseX - self.getBoundingClientRect().right < 20))) {
      return this.lines.diagonal2;
    }
    else {
      return null;
    }
  }

  clear = () => {
    let self = document.getElementById(this.props.id);

    for (let key in this.lines) {
      const line = this.lines[ key ];

      if (this.lines.hasOwnProperty(key) && line.repaint && self.style[ line.name ] && !line.confirmed) {

        if (this.centerLine.includes(line.name)) {
          self.style[ line.name ] = this.lineStyle.center;
        }
        else {
          self.style[ line.name ] = this.lineStyle.default;
        }
      }
    }

    self.getContext('2d').clearRect(0, 0, self.width, self.height);

    if (!this.lines.diagonal1.repaint) {
      if (this.lines.diagonal1.userConfirmed) {
        this.drawDiagonalLine(this.lines.diagonal1, this.lineStyle.userBacklight);
      }
      else if (this.lines.diagonal1.oponentConfirmed) {
        this.drawDiagonalLine(this.lines.diagonal1, this.lineStyle.oponentBacklight);
      }
      else {
        this.drawDiagonalLine(this.lines.diagonal1, this.lineStyle.userBacklight);
      }
    }
    if (!this.lines.diagonal2.repaint) {
      if (this.lines.diagonal2.confirmed) {
        this.drawDiagonalLine(this.lines.diagonal2, this.lineStyle.userBacklight);
      }
      else if (this.lines.diagonal2.oponentConfirmed) {
        this.drawDiagonalLine(this.lines.diagonal2, this.lineStyle.oponentBacklight);
      }
      else {
        this.drawDiagonalLine(this.lines.diagonal2, this.lineStyle.userBacklight);
      }
    }
  }

  drawBorderLine = (line, lineStyle) => {
    const self = document.getElementById(this.props.id);
    const currentBorderStyle = window.getComputedStyle(self)[ line.name ];
    
    if (currentBorderStyle && (currentBorderStyle.includes(this.lineStyle.defaultInactiveColor) || currentBorderStyle.includes(this.lineStyle.defaultCenterColor))) {
      self.style[ line.name ] = lineStyle;
    }
    else {
      this.drawDiagonalLine(line, lineStyle);
    }
  }

  drawDiagonalLine = (line, lineStyle) => {
    const self = document.getElementById(this.props.id);
    const ctx = self.getContext('2d');
   
    switch (line.name) {
      case 'topLeftBottomRight':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(self.width, self.height);
        ctx.lineWidth = 5;
        ctx.strokeStyle = lineStyle.substring(10);
        ctx.stroke();
        break;
      case 'topRightBottomLeft':
        ctx.beginPath();
        ctx.moveTo(self.width, 0);
        ctx.lineTo(0, self.height);
        ctx.lineWidth = 5;
        ctx.strokeStyle = lineStyle.substring(10);
        ctx.stroke();
        break;
      default: break;
    }
  }

  handleMouseClick = (e) => {
    e.preventDefault();

    if (!this.props.allowMove) return;

    const line = this.getActiveLine(e.clientX, e.clientY);

    if (!line || this.isLineTransparent(line) || line.userConfirmed) return;

    const leftClick = 0;
    const rightClick = 2;

    if (e.button === leftClick) {
      line.repaint = false;

      this.props.saveMove({id: this.props.id, ...line});
    }
    else if (e.button === rightClick) {
      if (!line.userConfirmed) {
        line.repaint = true;
  
        this.props.saveMove({id: this.props.id, ...line});
        this.clear();
      }
    }
  }

  handleMouseMove = (e) => {
    const line = this.getActiveLine(e.clientX, e.clientY);
    
    if (!line || this.isLineTransparent(line) || line.userConfirmed || line.oponentConfirmed) return;

    this.clear();
    this.drawBorderLine(line, this.lineStyle.userBacklight);
  }

  handleMouseLeave = () => {
    this.clear();
  }

  isLineTransparent  = (line) => {
    const self = document.getElementById(this.props.id);
    const currentBorderStyle = window.getComputedStyle(self)[ line.name ];

    if (currentBorderStyle && currentBorderStyle.includes('0px')) {
      return true;
    }

    return false;
  }

  render = () => {
    return (
      <canvas 
          id={this.props.id}
          className={this.getStyle()}
          onMouseMove={this.handleMouseMove}
          onMouseLeave={this.handleMouseLeave}
          onClick={this.handleMouseClick}
          onContextMenu={this.handleMouseClick}>
        </canvas>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    userLineColor: state.rules.userColor,
    oponentLineColor: state.rules.oponentColor,
    initializer: state.initializer
  }
};

export default connect(mapStateToProps, null)(SquareComponent);