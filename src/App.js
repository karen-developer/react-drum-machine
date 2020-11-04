import React from 'react';
import './App.css';

// Sounds
const Bank1 = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const Bank2 = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

// Power switch styles 
const activeTxtStyle = {
  color: "#f0f0f0",
  textShadow: "0 0 10px #aaa"
};
const inactiveTxtStyle = {
  color: "#aaa",
  textShadow: "none"
};
const activeBorderStyle = {
  boxShadow: "0 0 20px #E0A7B1",
  borderColor: "#E0A7B1"
};
const inactiveBorderStyle = {
  boxShadow: "none",
  borderColor: "#aaa"
};
const activeBtn = {
  color: "#2AEBFE",
  borderColor: "#2AEBFE",
  transform: "scale(0.9)",
  boxShadow:
    "1px 1px 10px 3px #2AEBFE,-1px -1px 10px 3px #2AEBFE"
};
const inactiveBtn = {
  color: "#f0f0f0",
  transform: "scale(1)",
  boxShadow: "none"
};


class DrumItem extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playSound = this.playSound.bind(this);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  };

  playSound = () => {
    if (this.props.power) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.volume = this.props.volume / 100;
      sound.play();
      this.props.displayUpdate(this.props.id);

      this.setState({ active: !this.state.active });
      setTimeout(() => {
        this.setState({ active: !this.state.active });
      }, 200);
    }
  };
  getBtnStyle = () => {
    return this.state.active ? activeBtn : inactiveBtn;
  };

  render() {
    return (
      <div className="drum-pad btn"
          id={this.props.id}      
          onClick={this.playSound}
          style={this.getBtnStyle()}
        >
          {this.props.keyTrigger}{" "}
        
        <audio
          src={this.props.url}
          className="clip"
          id={this.props.keyTrigger}
        />
      </div>
    );
  }
}

class Drums extends React.Component {
  render() {
    let currentBank = this.props.bank;

    return (
      <div className="drum-container">     
        <div className="drumbtn-container">
          {currentBank.map(el => {
            return (
              <DrumItem
                key={el.id}
                id={el.id}
                url={el.url}
                keyCode={el.keyCode}
                keyTrigger={el.keyTrigger}
                volume={this.props.volume}
                displayUpdate={this.props.displayUpdate}
                power={this.props.power}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleBank = this.toggleBank.bind(this);

    this.state = {
      power: true,
      volume: 50,
      drum: "",
      bank: Bank1,
      display: "Press key or Click"
    };
  }
  getTextStyle = () => {
    return this.state.power ? activeTxtStyle : inactiveTxtStyle;
  };
  getBorderStyle = () => {
    return this.state.power ? activeBorderStyle : inactiveBorderStyle;
  };

  volumeHandler = e => {
    if (this.state.power) {
      this.setState({ volume: e.target.value });
    }
  };

  displayUpdate = displayVal => {
    this.setState({ display: displayVal });
  };

  togglePower = () => {
    this.setState({ power: !this.state.power });
    if (this.state.power) {
      this.displayUpdate("Power Off");
    } else {
      this.displayUpdate("Power On");
    }
  };

  toggleBank = () => {
    if (this.state.power) {
      this.state.bank === Bank1
      ? this.setState({ bank: Bank2 })
      : this.setState({ bank: Bank1 }); 
    }
  };

  render() {
    return (
      <div id="drum-machine" className="App">

        <div className="dashboard-container" style={this.getTextStyle()}>        
       
          <div id="display" className="control-container">
          <div className="power-wrapper">
              <input
                id="power"
                type="checkbox"
                className="checkBox"
                onChange={this.togglePower}
              />
              <label className="powerLabel" htmlFor="power">
                <i className="fas fa-power-off fa-2x" />
              </label>
            </div>
          
            <div className="screen-wrapper" style={this.getBorderStyle()}>
              <div className="screen">{this.state.display}</div>
              <div className="volume">
                  {"Volume: " + this.state.volume}%     
              </div>
            </div>

            <div className="volume-wrapper">
              <input
                className="volume-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={this.state.volume}
                onChange={this.volumeHandler}
                style={this.getBorderStyle()}
              />
            </div>

            <Drums
            volume={this.state.volume}
            displayUpdate={this.displayUpdate}
            power={this.state.power}
            bank={this.state.bank}
          />

           <div className="bank-wrapper">
              <label className="toggle-text">
                <div className="toggle-bank">
                  <input
                    className="toggle-state"
                    type="checkbox"
                    name="check"
                    value="check"
                    onClick={this.toggleBank}
                  />
                <div className="indicator"></div>
                </div>
                 Change Music Bank
              </label>
            </div>

          </div>

          </div>
        
          <div className="footer">
           ⓒ 2020 Made with <i class="far fa-heart"></i> by{" "}
            <a href="https://karen-developer.com" target="_blank">
            <span className="karen">Karen Chang</span>
            </a>
          </div>
       
      </div>
    );
  }
}

export default App;
