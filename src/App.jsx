import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
import { spots } from "./data/spots.js";
import { getIconByCategory } from "./map/icons.js";

/* 開発用スポット生成ツール 公開時はfalseへ。*/
const ENABLE_SPOT_BUILDER = false;

/* ===== 地図設定 ===== */
const INITIAL_CENTER = [34.7816, 135.4696];
const INITIAL_ZOOM = 16;
const SPOT_ZOOM = 18;

/* ===== 現在地アイコン ===== */
const userIcon = L.divIcon({
  className: "user-location",
  html: `<div class="user-dot"></div>`,
  iconSize: [20, 20],
});

/* ===== 地図移動コントローラー ===== */
function MapController({ action }) {
  const map = useMap();

  useEffect(() => {
    if (!action) return;

    // スポット選択時はズームしない
    if (action.type === "spot" && action.spot) {
      return;
    }

    if (action.type === "custom" && action.coords) {
      map.flyTo(action.coords, action.zoom || 16, {
        animate: true,
        duration: 0.8,
      });
      return;
    }

    if (action.type === "zoomout-here") {
      map.flyTo(map.getCenter(), INITIAL_ZOOM, {
        animate: true,
        duration: 0.8,
      });
      return;
    }

    if (action.type === "home") {
      map.flyTo(INITIAL_CENTER, INITIAL_ZOOM, {
        animate: true,
        duration: 0.8,
      });
    }
  }, [action, map]);

  return null;
}

/* ===== 開発用：クリック地点をスポット雛形としてコピー ===== */
function SpotBuilder() {
  const [clickedLatLng, setClickedLatLng] = useState(null);

  useMapEvents({
    click(e) {
      const lat = Number(e.latlng.lat.toFixed(6));
      const lng = Number(e.latlng.lng.toFixed(6));

      const spotTemplate = `{
  id: ${Date.now()},
  slug: "new-spot",
  name: "新規スポット",
  lat: ${lat},
  lng: ${lng},
  category: "公園",
  image: "/spots/sample.jpg",
  description: "ここに説明を入れる",
  links: [
    {
      type: "archive",
      label: "ぷらとよアーカイブを見る",
      url: ""
    },
    {
      type: "walk",
      label: "散歩記事を見る",
      url: "",
      thumbnail: "/thumbnails/sample.jpg"
    }
  ],
  guide: {
    character: "とよな",
    image: "/characters/toyana.png",
    comment: "ここはこんな場所やで！"
  }
},`;

      navigator.clipboard.writeText(spotTemplate).catch(() => {});
      console.log(spotTemplate);

      setClickedLatLng({
        lat,
        lng,
        text: spotTemplate,
      });
    },
  });

  if (!clickedLatLng) return null;

  return (
    <Popup position={[clickedLatLng.lat, clickedLatLng.lng]}>
      <div style={{ minWidth: "240px" }}>
        <strong>スポット雛形コピー済</strong>
        <p style={{ margin: "8px 0" }}>
          緯度: {clickedLatLng.lat}
          <br />
          経度: {clickedLatLng.lng}
        </p>

        <textarea
          readOnly
          value={clickedLatLng.text}
          style={{
            width: "100%",
            height: "180px",
            fontSize: "12px",
            boxSizing: "border-box",
          }}
        />
      </div>
    </Popup>
  );
}

/* ===== 現在地表示 ===== */
function UserLocation({ setUserLocation, shouldAutoFly }) {
  const map = useMap();
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const coords = [lat, lng];

        setPosition(coords);
        setUserLocation(coords);

        if (shouldAutoFly) {
          map.flyTo(coords, 16, {
            animate: true,
            duration: 0.8,
          });
        }
      },
      (err) => {
        console.log("位置情報取得失敗", err);
      }
    );
  }, [map, setUserLocation, shouldAutoFly]);

  if (!position) return null;

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>現在地</Popup>
    </Marker>
  );
}

/* ===== 右パネル ===== */
function GuidePanel({ spot, onClose }) {
  if (!spot) {
    return (
      <aside className="guide-panel empty">
        <div className="guide-empty-box">
          <h2>ぷらとよMAP</h2>
          <p>地図上のスポットをクリックすると、</p>
          <p>とよなとちさとが案内してくれます。</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="guide-panel">
      <button className="guide-close" onClick={onClose} aria-label="案内を閉じる">
        ×
      </button>

      <div className="guide-header">
        <span className="guide-category">{spot.category}</span>
        <h2>{spot.name}</h2>
      </div>

      {spot.image && (
        <div className="guide-photo-wrap">
          <img
            src={spot.image}
            alt={spot.name}
            className="guide-photo"
          />
        </div>
      )}

      <div className="guide-section">
        <h3>スポット紹介</h3>
        <p>{spot.description}</p>
      </div>

      {spot.guide && (
        <div className={`guide-character-box`}>
          <img
            src={spot.guide.image}
            alt={`${spot.guide.character}の案内`}
            className="guide-character-image"
          />
          <div className={`guide-balloon balloon-${spot.guide.character}`}>
            <div className="guide-speaker">{spot.guide.character}</div>
            <p>{spot.guide.comment}</p>
          </div>
        </div>
      )}

      {spot.links && spot.links.length > 0 && (
        <div className="guide-links">
          {spot.links
            .filter((link) => link.type !== "walk")
            .map((link, index) => {
              const isDisabled = !link.url;

              return (
                <a
                  key={index}
                  className={`guide-link ${isDisabled ? "disabled" : ""}`}
                  href={isDisabled ? undefined : link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={isDisabled ? "準備中" : ""}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                  }}
                >
                  {link.label}
                </a>
              );
            })}

          {spot.links
            .filter((link) => link.type === "walk")
            .map((link, index) => (
              <a
                key={index}
                className="guide-thumb-link"
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.thumbnail && (
                  <img
                    src={link.thumbnail}
                    alt={link.label}
                    className="guide-thumb-image"
                  />
                )}
                <div className="guide-thumb-body">
                  <div className="guide-thumb-title">{link.label}</div>
                </div>
              </a>
            ))}
        </div>
      )}
    </aside>
  );
}

/* ===== メイン ===== */
export default function App() {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [mapAction, setMapAction] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  const spotSlug = useMemo(() => {
  const url = new URL(window.location.href);

  // 1. まず ?spot=machikaneyama を優先
  const querySpot = url.searchParams.get("spot");
  if (querySpot) return querySpot;

  // 2. なければ従来どおり /machikaneyama を読む
  const path = url.pathname.replace(/\/+$/, "");
  const parts = path.split("/");
  const lastPart = parts[parts.length - 1];

  // ルート直下や platoyo-map だけの時は無効扱い
  if (!lastPart || lastPart === "platoyo-map") return "";

  return lastPart;
}, []);

  const hasSpotParam = !!spotSlug;

  useEffect(() => {
    if (!spotSlug) return;

    const foundSpot = spots.find((spot) => spot.slug === spotSlug);

    if (foundSpot) {
      setSelectedSpot(foundSpot);
      setMapAction({
        type: "spot",
        spot: foundSpot,
        timestamp: Date.now(),
      });
    }
  }, [spotSlug]);

 const handleMarkerClick = (spot) => {
  if (selectedSpot?.id === spot.id) {
    setSelectedSpot(null);
    return;
  }

  setSelectedSpot(spot);
  setMapAction({
    type: "spot",
    spot,
    timestamp: Date.now(),
  });
};

const handleClosePanel = () => {
  setSelectedSpot(null);
};

  return (
    <div className="app-shell">
      <div className="map-area">
        <button
          className="locate-btn"
          onClick={() => {
            if (userLocation) {
              setMapAction({
                type: "custom",
                coords: userLocation,
                zoom: 16,
                timestamp: Date.now(),
              });
            }
          }}
        >
          📍 現在地
        </button>

        <MapContainer
          center={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          scrollWheelZoom={true}
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <UserLocation
            setUserLocation={setUserLocation}
            shouldAutoFly={!hasSpotParam}
          />

          {ENABLE_SPOT_BUILDER && <SpotBuilder />}

          <MapController action={mapAction} />

          {spots.map((spot) => (
            <Marker
              key={spot.id}
              position={[spot.lat, spot.lng]}
              icon={getIconByCategory(spot.category)}
              eventHandlers={{
                click: () => handleMarkerClick(spot),
              }}
            />
          ))}
        </MapContainer>
      </div>

      <GuidePanel spot={selectedSpot} onClose={handleClosePanel} />
    </div>
  );
}