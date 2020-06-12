import React from 'react';
import OrangeSelect from '../../Common/MaterialUI/Select/Select';
import OrangeCheckBox from '../../Common/MaterialUI/CheckBox/CheckBox';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import styles from './RulesComponent.module.scss';

import { OrangeButton } from '../../Common/MaterialUI/Button';
import { connect } from 'react-redux';
import { setRules, setInitializer } from '../../redux/action';
import { gamesService } from '../../services/gamesService';

class RulesComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      borderSize: null,
      time: null,
      userColor: null,
      oponentColor: null,
      playingForTime: true,
      autocomplete: false,
      liveChat: true,
      rulesError: null
    };
  }

  handleBoarderSizeChange = (e) => {
    this.setState({
      borderSize: e.target.value,
      rulesError: null
    })
  }

  handleTimeChange = (e) => {
    this.setState({
      time: e.target.value,
      rulesError: null
    })
  }

  handleUserColorChange = (e) => {
    this.setState({
      userColor: e.target.value,
      rulesError: null
    })
  }

  handleOponentColorChange = (e) => {
    this.setState({
      oponentColor: e.target.value,
      rulesError: null
    })
  }

  handlePlayingForTimeChange = (e) => {
    const checked = e.target.checked;

    this.setState({
      playingForTime: checked,
      rulesError: null
    })


    if (checked === false) {
      this.setState({
        time: null
      })
    }
  }

  handleAutocompleteChange = (e) => {
    this.setState({
      autocomplete: e.target.checked
    })
  }

  handleLiveChatChange = (e) => {
    this.setState({
      liveChat: e.target.checked
    })
  }

  checkRules = () => {
    let rulesError = '';

    if (!this.state.borderSize || !this.state.userColor ||
      !this.state.oponentColor || (this.state.playingForTime && !this.state.time)) {
      rulesError = 'All fields must be full filled'
    }
    else if (this.state.userColor === this.state.oponentColor) {
      rulesError = 'Selected colors can\'t be the same';
    }

    return rulesError;
  }

  handleCreateGameRules = async () => {
    const rulesError = this.checkRules();

    let rules = this.state;
    delete rules.rulesError;

    if (rulesError === '') {
      try {
        const response = await gamesService.adddNewGame(this.props.nick, rules);

        if (response.data.OK) {
          this.props.setRules(rules);
          this.props.setInitializer(true);

          this.props.history.push('/game');
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      this.setState({
        rulesError
      })
    }
  }

  render = () => {
    return (
      <div className={styles.main}>
        <span className={styles.rulesFont}>Set up your rules</span>
        <div className={styles.settings}>
          <div className={styles.selects}>
            <div className={styles.selectContainer}>
              <OrangeSelect
                handleChange={this.handleBoarderSizeChange}
                label="Border Size"
                items={[
                  { value: 'small', name: 'Small 6x10' },
                  { value: 'medium', name: 'Medium 8x12' },
                  { value: 'big', name: 'Big 10x14' }
                ]}
              >
              </OrangeSelect>
            </div>
            <div className={styles.selectContainer}>
              <OrangeSelect
                handleChange={this.handleUserColorChange}
                label="Your color"
                items={[
                  { value: 'red', name: 'red' },
                  { value: 'blue', name: 'blue' },
                  { value: 'green', name: 'green' }
                ]}
              >
              </OrangeSelect>
            </div>
            <div className={styles.selectContainer}>
              <OrangeSelect
                handleChange={this.handleOponentColorChange}
                label="Oponent color"
                items={[
                  { value: 'red', name: 'red' },
                  { value: 'blue', name: 'blue' },
                  { value: 'green', name: 'green' }
                ]}
              >
              </OrangeSelect>
            </div>
            {
              this.state.playingForTime &&
              <div className={styles.selectContainer}>
                <OrangeSelect
                  handleChange={this.handleTimeChange}
                  label="Time per round"
                  items={[
                    { value: 'fast', name: '30s' },
                    { value: 'medium', name: '1m' },
                    { value: 'slow', name: '2m' }
                  ]}
                >
                </OrangeSelect>
              </div>
            }
          </div>
          <div className={styles.checkBoxses}>
            <div className={styles.checkBoxContainer}>
              <OrangeCheckBox
                handleChange={this.handlePlayingForTimeChange}
                label="Playing for time"
                checked={this.state.playingForTime}
              >
              </OrangeCheckBox>
            </div>
            <div className={styles.checkBoxContainer}>
              <OrangeCheckBox
                handleChange={this.handleLiveChatChange}
                label="Live chat"
                checked={this.state.liveChat}
              >
              </OrangeCheckBox>
            </div>
            {
              this.state.playingForTime &&
              <div className={styles.checkBoxContainer}>
                <OrangeCheckBox
                  handleChange={this.handleAutocompleteChange}
                  label="Round autocomplete"
                  checked={this.state.autocomplete}
                >
                </OrangeCheckBox>
              </div>
            }
          </div>
        </div>
        {this.state.rulesError && <div style={{ padding: '10px' }}><ErrorComponent message={this.state.rulesError}></ErrorComponent></div>}
        <div className={styles.submitRules}>
          <OrangeButton onClick={this.handleCreateGameRules}>Create game</OrangeButton>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setRules: (rules) => dispatch(setRules(rules)),
    setInitializer: (value) => dispatch(setInitializer(value))
  }
}

const mapStateToProps = (state) => {
  return {
    nick: state.nick
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RulesComponent);