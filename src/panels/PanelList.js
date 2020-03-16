import React, {Component} from 'react';
import _ from 'lodash';
import { Portal } from 'react-portal';

import Icon from '../Icon';

import styles from './styles';
import PropertyGroup from './PropertyGroup';
import Button from './Button';
import SwitchState from './SwitchState';
import Columns from './Columns';
import Column from './Column';

class PanelList extends Component {
  render() {
    let {object, objectComponent, id, position} = this.props;

    return (
      <div style={{...styles.propertyPanel, ...(position === 'bottom' ? {
        width: '100%',
        clear: "both",
      } : {})}}>
        {objectComponent.panels.map((Panel, i) => {
          return !Panel.position || Panel.position === position ? (
            <Panel key={i} id={id} {...this.props} />
          ) : null;
        })}
      </div>
    );
  }
};

export default PanelList;
