import React, { Component } from "react";
import { View, Text, Dimensions } from "react-native";
import SlideShow from "./Slideshow";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/Feather";

const { height, width } = Dimensions.get("window");

const data = [
  { url: require("../../assets/soufi.png") },
  { url: require("../../assets/moto.jpg") },
  { url: require("../../assets/soufi.png") },
  { url: require("../../assets/soufi.png") }
];

class CarouselSlider extends Component {
  state = {
    position: 1,
    interval: null
  };
  componentDidMount() {
    this.setState({
      interval: setInterval(() => {
        this.setState({
          position:
            this.state.position === data.length ? 0 : this.state.position + 1
        });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <View>
        <SlideShow
          onPositionChanged={position => this.setState({ position })}
          position={this.state.position}
          dataSource={data}
          indicatorSize={8}
          indicatorColor={Colors.$orange}
          indicatorSelectedColor={Colors.$lightOrange}
          arrowSize={12}
          height={120}
          arrowLeft={
            <Icon name="chevron-left" size={20} color={Colors.$orange} />
          }
          arrowRight={
            <Icon name="chevron-right" size={20} color={Colors.$orange} />
          }
          containerStyle={{
            backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center"
          }}
          imageStyle={{
            width: 120,
            height: 120,
            backgroundColor: Colors.$white
          }}
          imageContainerStyle={{
            width,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.$white
          }}
          //arrowLeft={}
        />
      </View>
    );
  }
}

export default CarouselSlider;
