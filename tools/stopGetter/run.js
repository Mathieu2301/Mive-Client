const fs = require('fs');

// const report = fs.readFileSync(
//   '../../mive-server/data/REPORT_EXAMPLE.csv',
//   'utf8',
// )
//   .split('\r\n')
//   .filter((line) => line.length > 0)
//   .map((line) => line.split(';'))
//   .map((line) => ({
//     stop_id: line[2],
//     stop_name: line[3],
//     route_id: line[4],
//   }))
//   .filter((line) => ['1', '2', '3', '4'].includes(line.route_id));

// const n = (s) => s.replace(/[^a-z0-9]/gi, '_').toUpperCase();
// function search(props) {
//   const name = n(props.nom);
//   const results = {};

//   report.forEach((line) => {
//     if (line.route_id);

//     const s = n(line.stop_name);
//     if (s === name) {
//       results[line.stop_id] = { score: 0, name: line.stop_name };
//       return;
//     }
//     if (s.includes(name)) {
//       results[line.stop_id] = { score: 1, name: line.stop_name };
//       return;
//     }
//     if (name.includes(s)) {
//       results[line.stop_id] = { score: 2, name: line.stop_name };
//       return;
//     }
//   });

//   return results;
// }


const stops = fs.readFileSync(
  '../../mive-server/data/stops.csv',
  'utf8',
)
  .split('\r\n')
  .filter((line) => line.length > 0)
  .map((line) => line.split(','))
  .map((line) => ({
    stop_id: line[0],
    stop_code: line[1],
    stop_name: line[2].slice(1, -1),
    stop_coord: [Number(line[4]), Number(line[3])],
    location_type: line[5],
    parent_station: line[6],
  }));

stops.shift();

console.log(stops[0]);

function search(feat) {
  const results = {};
  stops.forEach((stop) => {
    const dist = Math.sqrt(
      (stop.stop_coord[0] - feat.geometry.coordinates[0]) ** 2
      + (stop.stop_coord[1] - feat.geometry.coordinates[1]) ** 2
    );
    if (dist < 0.0005 && stop.stop_code.startsWith('4')) {
      results[stop.stop_code] = {
        dist,
        name: stop.stop_name,
      };
    }
  });
  return results;
}

JSON.parse(fs.readFileSync('../src/assets/stops.json')).features.forEach((feat) => {
  console.log(
    feat.properties.nom,
    search(feat),
    // search(fet.properties),
  );
});
// console.log(report);
