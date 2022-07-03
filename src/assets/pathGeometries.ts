import type LineString from 'ol/geom/LineString';
import pathFeatures from './pathFeatures';

const geometries: { [pathID: string]: LineString } = {};

for (const lineID in pathFeatures) {
  geometries[lineID] = pathFeatures[lineID].getGeometry() as LineString;
}

export default geometries;
