import React, { useState, Component } from "react";
import ReactMapGL from "react-map-gl";
import { Marker } from "react-map-gl";

export class Map extends Component {
  constructor(props)  {
    super(props);
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: -33.9249,
        longitude: 18.4241,
        zoom: 8
      },
      myPosition: {
        latitude: 0,
        longitude: 0
      },
      mounted: false
    }
  }

  componentDidMount = () => {
    this.setState({ mounted: true });
    if(this.props.flag === false) {
      
      navigator.geolocation.getCurrentPosition((position) =>  {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({
          viewport: {
            ...this.state.viewport, latitude: latitude, longitude: longitude
          },
          myPosition: {
            latitude: latitude, longitude: longitude
          }
        });
        this.props.setMyposition({latitude, longitude});
      });
      return;
    }
    this.setState({
      viewport: {
        ...this.state.viewport, latitude: this.props.mypos.latitude, longitude: this.props.mypos.longitude
      },
      myPosition: {
        latitude: this.props.mypos.latitude, longitude: this.props.mypos.longitude
      }
    });
    return;
  }


  posChange = (event) =>  {
    if(this.props.currentState.username === false) return;
    this.setState({
      myPosition: {
        latitude: event.lngLat.lat,
        longitude: event.lngLat.lng
      }
    });
    this.props.setMyposition({latitude:event.lngLat.lat, longitude:event.lngLat.lng});
  }

  viewportChange = (viewport) => {
    this.setState({ viewport:viewport.viewState });
  }

  render () {
    const { mounted } = this.state
    return (
      <ReactMapGL
        mapboxAccessToken='pk.eyJ1IjoidG9wdGFsZW50IiwiYSI6ImNrenBqdW9mdjYxOW0yeHBycnNzYzEybjgifQ.fh70WgDAw5DUhXUnzhU99Q'
        mapStyle="mapbox://styles/mapbox/streets-v9"
        boxZoom='true'
        {...this.state.viewport}
        onMove={(viewport) =>  this.viewportChange(viewport)}
        onClick={(event) => this.posChange(event)}
      >
        {
         <Marker longitude={this.state.myPosition.longitude} latitude={this.state.myPosition.latitude} >
           <img src="https://img.icons8.com/color/48/000000/marker.png" width="15px" />
         </Marker>
        }
      </ReactMapGL>
    )
  }
}

export default Map