import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';

class InsertMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      menuOpened: props.alwaysOpened,
      hoveredTool: null
    }
  }

  openMenu = () => {
    this.setState({menuOpened: this.props.alwaysOpened || true})
  }

  closeMenu = () => {
    this.setState({menuOpened: this.props.alwaysOpened || false})
  }

  hoverTool = type => {
    this.setState({hoveredTool: type})
  }

  unhoverTool = type => {
    if (this.state.hoveredTool == type) {
      this.setState({hoveredTool: null})
    }
  }

  render() {
    let {currentTool, tools, showMenuTop} = this.props;
    let {menuOpened, hoveredTool} = this.state;
    let keys = Object.keys(tools);

    return (
      <div style={{
          ...(showMenuTop ? styles.insertMenuHorizontal : styles.insertMenu),
          ...menuOpened ? (showMenuTop ? styles.insertMenuHoverHorizontal : styles.insertMenuHover) : {}
        }}
        onMouseOver={this.openMenu}
        onMouseOut={this.closeMenu}
      >
        {this.props.alwaysOpened ? null : (<div style={styles.mainIcon}>
        {currentTool
          ? tools[currentTool].meta.icon
          : <Icon icon={"add"} size={30} />}
        </div>)}
        <ul style={showMenuTop ? styles.toolBox : styles.toolBoxHorizontal}>
          {keys.map((type, i) => (
            <li style={{
                  ...styles.toolBoxItem,
                  ...currentTool === type ? styles.currentToolboxItem : {},
                  ...hoveredTool === type ? styles.currentToolboxItem : {}
                }}
                onMouseOver={() => this.hoverTool(type)}
                onMouseOut={() => this.unhoverTool(type)}
                onMouseDown={this.props.onSelect.bind(this, type)}
                key={i}>
              {tools[type].meta.icon}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const styles = {
  insertMenu: {
    height: 40,
    width: 40,
    overflow: 'hidden',
  },
  insertMenuHorizontal: {
    height: 40,
    width: 40,
    overflow: 'hidden',
  },
  insertMenuHover: {
    background: '#eeeff5',
    height: 'auto',
  },
  insertMenuHoverHorizontal: {
    background: '#eeeff5',
    width: 'auto',
  },
  toolBox: {
    margin: 0,
    padding: 0,
  },
  toolBoxHorizontal: {
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'row'
  },
  toolBoxItem: {
    listStyle: "none",
    padding: "5px 5px"
  },
  currentToolboxItem: {
    background: "#ebebeb"
  },
  mainIcon: {
    padding: "10px 5px",
    borderBottom: "1px solid #e0e0e0"
  }

};

export default InsertMenu;
