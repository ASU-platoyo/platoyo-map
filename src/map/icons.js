import L from "leaflet";

const createSpotIcon = (className) =>
  L.divIcon({
    className: "platto-div-icon-wrapper",
    html: `<div class="platto-pin ${className}"></div>`,
    iconSize: [40, 58],
    iconAnchor: [20, 58],
    popupAnchor: [0, -48],
  });

export const getIconByCategory = (category) => {
  switch (category) {
    case "歴史":
      return createSpotIcon("pin-history");
    case "公園":
      return createSpotIcon("pin-park");
    case "駅":
      return createSpotIcon("pin-station");
    case "グルメ":
      return createSpotIcon("pin-gourmet");
    default:
      return createSpotIcon("pin-feature");
  }
};