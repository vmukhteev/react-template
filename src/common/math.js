export function getDistance(coords1, coords2) {
  let R = 6371; // Radius of the earth in km
  let dLat = deg2rad(coords2.lat - coords1.lat);  // deg2rad below
  let dLon = deg2rad(coords2.lng - coords1.lng);
  let a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(coords1.lat)) * Math.cos(deg2rad(coords2.lat)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
  return d;
}

export function deg2rad(deg) {
  return deg * (Math.PI/180)
}

export function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}