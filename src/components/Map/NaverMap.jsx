import React, { useEffect, useState } from "react";
import greenMarkerIcon from "../../assets/icons/icon-map-marker-green.svg";
import redMarkerIcon from "../../assets/icons/icon-map-marker-red.svg";

const naverMaps = window.naver.maps;

// Correct the way to create marker images
const imageSize = new naverMaps.Size(56, 56);
const greenMarkerImage = new naverMaps.MarkerImage(greenMarkerIcon, imageSize);
const redMarkerImage = new naverMaps.MarkerImage(redMarkerIcon, imageSize);

let map;

function NaverMap({ viewControl = true, position, poiList }) {
  const [markerList, setMarkerList] = useState([]);

  useEffect(() => {
    if (map && position) {
      const moveLatLon = new naverMaps.LatLng(
        position.latitude,
        position.longitude
      );
      map.panTo(moveLatLon);
    }
  }, [position]);

  useEffect(() => {
    if (map && poiList) {
      for (const marker of markerList) {
        marker.setMap(null);
      }
      setMarkerList([]);

      const newMarkerList = [];
      for (const poi of poiList) {
        const marker = createMarker(poi);
        newMarkerList.push(marker);
        marker.setMap(map);
      }
      setMarkerList(newMarkerList);
    }
  }, [poiList]);

  useEffect(() => {
    const options = {
      center: new naverMaps.LatLng(36.51369912500116, 127.82143452358798),
      level: 6,
    };
    const container = document.getElementById("map");
    map = new naverMaps.Map(container, options);

    if (viewControl) {
      const control = new naverMaps.ZoomControl();
      // map.addControl(control, naverMaps.ControlPosition.BOTTOMRIGHT);
    }

    return () => {
      map = undefined;
    };
  }, []);

  const createMarker = (poi) => {
    let image;
    switch (poi.color) {
      case "red":
        image = redMarkerImage;
        break;
      case "green":
      default:
        image = greenMarkerImage;
    }

    return new naverMaps.Marker({
      position: new naverMaps.LatLng(poi.latitude, poi.longitude),
      image: image,
    });
  };

  return (
    <div
      id="map"
      style={{ position: "sticky", width: "100%", height: "100%" }}
    ></div>
  );
}

export default NaverMap;
