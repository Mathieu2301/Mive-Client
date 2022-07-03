import Feature from 'ol/Feature';
import { Point } from 'ol/geom';
import { getVectorContext } from 'ol/render';
import pathGeometries from '../assets/pathGeometries';
import type { Geometry, LineString } from 'ol/geom';
import type VectorSource from 'ol/source/Vector';
import type RenderEvent from 'ol/render/Event';
import type { FrameState } from 'ol/PluggableMap';
import type { Coordinate } from 'ol/coordinate';

export default class {
  feature: Feature<Geometry>;

  position: Point;

  source: VectorSource;

  line: number;

  constructor(line: number, source: VectorSource) {
    this.line = line;

    this.position = new Point([0, 0]);
    this.feature = new Feature({
      type: `MovingTrain${line}`,
      geometry: this.position,
    });

    this.source = source;
    this.source.addFeature(this.feature);

    this.lastTime = Date.now();
  }

  distance = 0;
  // distance = Math.random();
  lastTime: number;
  speed = 40.5;

  updatePos(event: RenderEvent) {
    const time = (event.frameState as FrameState).time;
    const elapsedTime = time - this.lastTime;
    this.distance = (this.distance + (this.speed * elapsedTime) / 1e6) % 2;
    this.lastTime = time;

    const l = 'T2-JS';
    const currentCoordinate = pathGeometries[l].getCoordinateAt(
      this.distance > 1 ? 2 - this.distance : this.distance,
    );

    // const currentCoordinate = this.geometry.getClosestPoint(
    //   [3.9202995002478254, 43.60378468221162],
    // );

    // console.log(currentCoordinate);
    // if (!currentCoordinate) return;
    this.position.setCoordinates(currentCoordinate);
    const vectorContext = getVectorContext(event);
    vectorContext.drawGeometry(this.position);
  }

  delete() {
    this.source.removeFeature(this.feature);
  }
};
