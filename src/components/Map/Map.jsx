import React, { useEffect, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style as OLStyle } from 'ol/style';
import { Circle as CircleStyle, Fill, Stroke, RegularShape } from 'ol/style';
import './map.css';

const destinations = [
  { id: 1, name: 'Paris', coordinates: [2.3522, 48.8566] },
  { id: 2, name: 'New York', coordinates: [-74.0060, 40.7128] },
  { id: 3, name: 'Tokyo', coordinates: [139.6917, 35.6895] },
];

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [baseLayer, setBaseLayer] = useState('OSM');

  useEffect(() => {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: destinations.map(destination => {
          const feature = new Feature({
            geometry: new Point(fromLonLat(destination.coordinates)),
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

          return feature;
        }),
      }),
    });

    const mapInstance = new Map({
      target: 'map',
      layers: [tileLayer, vectorLayer],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 2,
      }),
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    let source;
    if (baseLayer === 'OSM') {
      source = new OSM();
    } else if (baseLayer === 'Satellite') {
      source = new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
      });
    } else if (baseLayer === 'Topographic') {
      source = new XYZ({
        url: 'https://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
        attributions: ['&copy; Thunderforest, OpenStreetMap contributors'],
      });
    }

    map.getLayers().getArray()[0].setSource(source);

  }, [baseLayer, map]);

  return (
    <div>
      <div className="select-container">
        <select
          className="form-select"
          value={baseLayer}
          onChange={e => setBaseLayer(e.target.value)}
        >
          <option value="OSM">OpenStreetMap</option>
          <option value="Satellite">Satellite</option>
        </select>
      </div>
      <div id="map"></div>
    </div>
  );
};

export default MapComponent;