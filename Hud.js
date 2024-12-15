import React from 'react'
import Rupees from './Rupees'
import Hearts from './Hearts'
import MagicBar from './MagicBar'
import MinMaxButton from './MinMaxButton'
import {Heart, Rupee, MagicJar} from "./icons";

export default class Hud extends React.Component {

  state = {
    hearts: 5,
    maxHearts: 10,
    magic: 100,
    maxMagic: 100,
    rupees: 10,
    maxRupees: 99,
  };

  render() {
    return (
      <div className={"Hud"}>
        <div>
          <Hearts
            hearts={this.state.hearts}
            maxHearts={this.state.maxHearts}
          />
          <MagicBar
            magic={this.state.magic}
            maxMagic={this.state.maxMagic}
          />
          <Rupees
            rupees={this.state.rupees}
            maxRupees={this.state.maxRupees}
          />
        </div>
        <aside className="Sidebar">
          <MinMaxButton
            renderIcon={() => {
              return <Heart fill={0.5}/>
            }}
            increment={0.5}
            value={this.state.hearts}
            maxValue={this.state.maxHearts}
            onNewValue={(newValue) => {
              this.setState({
                hearts: newValue
              })
            }}
          />
          <MinMaxButton
            renderIcon={() => {
              return <Heart fill={1}/>
            }}
            increment={1}
            value={this.state.maxHearts}
            maxValue={20}
            minValue={3}
            onNewValue={(newValue) => {
              this.setState({
                maxHearts: newValue
              })
            }}
          />
          <MinMaxButton
            renderIcon={() => {
              return <MagicJar width={30}/>
            }}
            increment={20}
            value={this.state.magic}
            maxValue={this.state.maxMagic}
            minValue={0}
            onNewValue={(newValue) => {
              this.setState({
                magic: newValue
              })
            }}
          />
          <MinMaxButton
            renderIcon={() => {
              return <Rupee width={30}/>
            }}
            increment={12}
            value={this.state.rupees}
            maxValue={this.state.maxRupees}
            minValue={0}
            onNewValue={(newValue) => {
              this.setState({
                rupees: newValue
              })
            }}
          />
        </aside>
      </div>
    );
  }
}