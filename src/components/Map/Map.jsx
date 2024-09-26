import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Style as OLStyle } from 'ol/style';
import { Circle as CircleStyle, Fill, Stroke, RegularShape } from 'ol/style';

// Örnek destinasyon verileri
const destinations = [
  { id: 1, name: 'Paris', coordinates: [2.3522, 48.8566] },
  { id: 2, name: 'New York', coordinates: [-74.0060, 40.7128] },
  { id: 3, name: 'Tokyo', coordinates: [139.6917, 35.6895] },
];

/* 
TODOLIST : 
- Destination Ekleme Modunda Haritadan tıklanan koordinatlara yeni destinationlar eklenebilmeli.
- Tıklanan koordinatlar için bir pop-up açılmalı ve belki bir panoramik viewer? ve detay bilgileri buradan görülebilmeli, Buradan detay sayfasına gidilebilmeli
- Destinations için detay sayfası oluşturulmalı. Bu sayfa aracılığı ile update ve delete yapılabilmeli.
- Settings Sayfası Olmalı
- REDUX
- About sayfası
- Openlayers için altlık değiştirme özelliği olmalı(radio button şeklinde burası da component olmalı.)
- 20 tane componente ulaşmak lazım
*/

const MapComponent = () => {
  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: destinations.map(destination => {
              const feature = new Feature({
                geometry: new Point(fromLonLat(destination.coordinates)),
              });

              feature.setStyle(new OLStyle({
                image: new RegularShape({
                  points: 3,
                  radius: 10,
                  fill: new Fill({ color: 'red' }),
                  stroke: new Stroke({ color: 'black', width: 2 }),
                }),
              }));

              return feature;
            }),
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]), // Haritanın merkezi
        zoom: 2, // Başlangıç zoom seviyesi
      }),
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div id="map" style={{ width: '100%', height: '800px' }}></div>
  );
};

export default MapComponent;
