/* eslint-disable */

export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxzaGxrYW55IiwiYSI6ImNsdG11ZGYzdTF0dzIycXM0amdzOXF5Z2QifQ.sX4tTde_Zz6Meetg2JxJ7Q';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/alshlkany/cltmvt249015j01qn1r6egowe',
    scrollZoom: false,
  });
  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    const e = document.createElement('div');
    e.className = 'marker';

    new mapboxgl.Marker({
      element: e,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
