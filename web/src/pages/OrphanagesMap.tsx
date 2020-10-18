import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus, FiSearch } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import 'leaflet/dist/leaflet.css'


import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanage-map.css';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [orphanageName, setOrphanageName] = useState('');
  const [position, setPosition] = useState({ latitude: -23.2694847, longitude: -47.2981202, zoom: 14.4 });

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
  }, [orphanageName]);

  function handleSearchOrphanage() {
    api.get(`orphanagesName?name=${orphanageName}`).then(response => {
      const orphanageParams = response.data[0] as Orphanage;

      if (orphanageParams) {
        setPosition({
          latitude: orphanageParams.latitude,
          longitude: orphanageParams.longitude,
          zoom: 20
        });
      }

    });
  }

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>

        </header>

        <footer>
          <strong>Itu</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[position.latitude, position.longitude]}
        zoom={position.zoom}
        style={{ width: '100%', height: '100%' }}>
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png " /> */}
        <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} />

        {orphanages.map(orphanage => {
          return (
            <Marker
              position={[orphanage.latitude, orphanage.longitude]}
              key={orphanage.id}
              icon={mapIcon}>
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {orphanage.name}
                <a href={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </a>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <div className="input-block">
        <label htmlFor="name">Nome</label>
        <input placeholder="Encontre um orfanato"
          id="name"
          value={orphanageName}
          onChange={event => setOrphanageName(event.target.value)} />

        <button onClick={handleSearchOrphanage} className="search">
          <FiSearch size={32} color="#fff" />
        </button>
      </div>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;