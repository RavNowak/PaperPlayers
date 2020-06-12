import React from 'react';
import UserComponent from '../components/UserComponent/UserComponent';
import SelectGameComponent from '../components/SelectGameComponent/SelectGameComponent';
import RulesComponent from '../components/RulesComponent/RulesComponent';
import GameComponent from '../components/GameComponent/GameComponent';

import { connect } from 'react-redux';

class RouteGuard extends React.Component {
  constructor(props) {
    super(props);

    this.currentPath = this.props.history.location.pathname;
    this.defaultPath = '/';

    if (this.props.nick === '' && this.currentPath !== this.defaultPath) {
      this.props.history.push(this.defaultPath);
    }
  }

  render = () => {
    switch (this.props.history.location.pathname) {
      case '/' :
        return <UserComponent history={this.props.history}></UserComponent>
      case '/games':
        return <SelectGameComponent history={this.props.history}></SelectGameComponent>
      case '/createGame':
        return <RulesComponent history={this.props.history}></RulesComponent>
      case '/game':
        return <GameComponent history={this.props.history}></GameComponent>
      default :
        return <UserComponent history={this.props.history}></UserComponent>
    }
  }
}

const mapStateToProps = (state) => {
  return {
    nick: state.nick
  }
};

export default connect(mapStateToProps, null)(RouteGuard);