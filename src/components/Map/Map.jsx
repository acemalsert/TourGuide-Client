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
import axios from 'axios';

const MapComponent = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [baseLayer, setBaseLayer] = useState('OSM');
  const [vectorLayer, setVectorLayer] = useState(null); // Vector layer state

  const fetchDestinations = async () => {
    setLoading(true); 
    try {
      const token = localStorage.getItem('token'); 
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };
  
      const res = await axios.get(`http://localhost:5008/api/Destination/GetAllDestinations`, config);
      debugger
      setDestinations(res.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();

    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    const mapInstance = new Map({
      target: 'map',
      layers: [tileLayer],
      view: new View({
        center: fromLonLat([0, 0]), // Başlangıç merkez noktası
        zoom: 2,
      }),
    });

    setMap(mapInstance);

    return () => {
      mapInstance.setTarget(null);
    };
  }, []);

  useEffect(() => {
    if (!map || destinations.length === 0) return;
    const features = destinations.map(destination => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([destination.longitude, destination.latitude])),
      });

      //feature.set('id', destination.id);

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
    });

   
    if (vectorLayer) {
      map.removeLayer(vectorLayer);
    }

    const newVectorLayer = new VectorLayer({
      source: new VectorSource({
        features,
      }),
    });

    map.addLayer(newVectorLayer);
    setVectorLayer(newVectorLayer); 
  }, [map, destinations]);


  useEffect(() => {
    if (!map) return;

    let source;
    if (baseLayer === 'OSM') {
      source = new OSM();
    } else if (baseLayer === 'Satellite') {
      source = new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
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
