import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style as OLStyle } from 'ol/style';
import { RegularShape, Fill, Stroke } from 'ol/style';
import './map.css';

const MapComponent = ({ lat, lon }) => {
  const [map, setMap] = useState(null);
  const [vectorLayer, setVectorLayer] = useState(null);

  useEffect(() => {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const mapInstance = new Map({
      target: 'map',
      layers: [tileLayer],
      view: new View({
        center: fromLonLat([lon, lat]), // Harita merkezini lat ve lon prop'larına göre ayarlayın
        zoom: 10,
      }),
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, [lat, lon]);

  useEffect(() => {
    if (!map) return;

    const feature = new Feature({
      geometry: new Point(fromLonLat([lon, lat])),
    });

    feature.setStyle(
      new OLStyle({
        image: new RegularShape({
          points: 3,
          radius: 10,
          fill: new Fill({ color: 'red' }),
          stroke: new Stroke({ color: 'black', width: 2 }),
        }),
      })
    );

    if (vectorLayer) {
      map.removeLayer(vectorLayer);
    }

    const newVectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
    });

    map.addLayer(newVectorLayer);
    setVectorLayer(newVectorLayer);

  }, [map, lat, lon]);

  return <div id="map" style={{ height: '500px', width: '100%' }}></div>;
};

export default MapComponent;
