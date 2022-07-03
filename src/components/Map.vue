<script setup lang="ts">
import { Map, View } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import OSM from 'ol/source/OSM';
import { useGeographic } from 'ol/proj';
import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Text,
} from 'ol/style';
import {
  Tile as TileLayer,
  Vector as VectorLayer,
} from 'ol/layer';
import LineString from 'ol/geom/LineString';
import MovingTrain from './MovingTrain';
import pathFeatures from '../assets/pathFeatures';
import stops from '../assets/stops';
import 'ol/ol.css';
</script>

<template>
  <div id="map"></div>
</template>

<script lang="ts">
useGeographic();

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM({
        url: 'https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        // url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        // url: 'https://tiles.jawg.io/jawg-transports/{z}/{x}/{y}@2x.png?api-key=4cKtE4Rze1HrvxWa9a7mdolSk10lVThTFC8zadQYMIMxTjkpTeIDJAAmhReDGnCH&odsdomain=occitanie',
      }),
    }),
  ],
  view: new View({
    center: [
      Number(localStorage.getItem('centerX')) || 431283.88,
      Number(localStorage.getItem('centerY')) || 43.6,
    ],
    zoom: Number(localStorage.getItem('zoom')) || 11.8,
    // minZoom: 8,
  }),
});

const styles = {
  stop: new Style({
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({ color: '#000A' }),
      stroke: new Stroke({ color: 'white', width: 1 }),
    }),
  }),
  MovingTrain1: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: '#0068bf' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  }),
  MovingTrain2: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: '#ff7723' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  }),
  MovingTrain3: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: '#cdd13e' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  }),
  MovingTrain4: new Style({
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({ color: '#5d2a21' }),
      stroke: new Stroke({ color: 'white', width: 2 }),
    }),
  }),
};

const vectorSource = new VectorSource();

const vectorLayer = new VectorLayer({
  source: vectorSource,
  style: (feature) => {
    if (feature.get('routes') !== undefined) return styles.stop;
    // if (feature.get('routes') !== undefined) return new Style({
    //   text: new Text({
    //     text: feature.get('name'),
    //     // fill: new Fill({ color: '#000A' }),
    //     scale: 1.2,
    //     offsetY: -15,
    //     stroke: new Stroke({ color: 'white', width: 0.5 }),
    //   }),
    //   image: new CircleStyle({
    //     radius: 4,
    //     fill: new Fill({ color: '#000A' }),
    //     stroke: new Stroke({ color: 'white', width: 1 }),
    //   }),
    // });

    if (feature.get('type') === 'TramPath') return new Style({
      stroke: new Stroke({
        color: feature.get('color'),
        width: 5,
        lineCap: 'round',
      }),
    });

    return styles[feature.get('type') as keyof typeof styles];
  },
});

map.addLayer(vectorLayer);

map.on('moveend', () => {
  const view = map.getView();
  const center = view.getCenter();
  localStorage.setItem('centerX', `${center ? center[0] : 0}`);
  localStorage.setItem('centerY', `${center ? center[1] : 0}`);
  localStorage.setItem('zoom', `${view.getZoom()}`);
});

const line = new LineString(JSON.parse(localStorage.getItem('currentLine') ?? '[]'));

function saveCurrentLine() {
  localStorage.setItem('currentLine', JSON.stringify(line.getCoordinates()));
}

map.on('click', (e) => {
  const precision = 7;
  const x = Math.round((e.coordinate[0] - 431280) * 10 ** precision) / 10 ** precision;
  const y = Math.round(e.coordinate[1] * 10 ** precision) / 10 ** precision;
  navigator.clipboard.writeText(`[${x}, ${y}],`);
  console.log(e.coordinate, `[${x}, ${y}]`);
  // line.appendCoordinate([x, y]);
  // saveCurrentLine();
});

// document.addEventListener('keydown', (e) => {
//   if (e.key !== ' ') return;

//   const newCoords = line.getCoordinates();
//   newCoords.pop();
//   line.setCoordinates(newCoords);
//   saveCurrentLine();
// }, false);

setTimeout(() => {
  map.setTarget('map');

  vectorSource.addFeatures(Object.values(pathFeatures));
  vectorSource.addFeatures(new GeoJSON().readFeatures(stops));

  vectorSource.addFeature(new Feature({
    type: 'TramPath',
    color: '#000',
    geometry: line,
  }));

  const trains = {
    '00001': new MovingTrain(1, vectorSource),
    // '00002': new MovingTrain(2, vectorSource),
    // // '00003': new MovingTrain(3, vectorSource),
    // '00004': new MovingTrain(4, vectorSource),

    // [Math.random()]: new MovingTrain(Math.round(Math.random() * 3) + 1, vectorSource),
  };

  let a = 5;
  vectorLayer.on('postrender', (e) => {
    // if (!a) return;
    a -= 1;
    for (const train of Object.values(trains)) train.updatePos(e);
  });
}, 0);

const STOPS = {
  
};
</script>

<style scoped>
#map {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
