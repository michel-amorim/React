import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import api from "../../services/api";

import logo from "../../assets/logo.svg";
import "../CreateLocation/style.css";
import Feature from "../../components/feature";

interface Item {
  id: number;
  name: string;
  img: string;
  description: string;
}

const CreateLocation: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [selectedMapPosition, setSelectedMapPosition] = useState<
    [number, number]
  >([0, 0]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: "",
  });

  const [selectedItems, setSelectedIems] = useState<Number[]>([]);

  // função assíncrona
  useEffect(() => {
    api.get("/v1/produtos").then((response) => {
      setItems(response.data);
    });
  }, []);

  const handMapClick = useCallback((event: LeafletMouseEvent): void => {
    console.log(handMapClick);
    setSelectedMapPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target.name, event.target.value);
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    },
    [formData]
  );

  const handleSelectItem = useCallback((id: number) => {
    const alreadySelected = selectedItems.findIndex((item) => item === id);

    if (alreadySelected >= 0) {
      const filterItems = selectedItems.filter((item) => item !== id);
      setSelectedIems(filterItems);
    } else {
      setSelectedIems([...selectedItems, id]);
    }
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { city, email, name, uf, whatsapp } = formData;
      const [latitude, longitude] = selectedMapPosition;
      const items = selectedItems;

      const data = {
        city,
        email,
        name,
        uf,
        whatsapp,
        latitude,
        longitude,
        items,
      };

      await api.post("location", data);
    },
    [formData, selectedItems, selectedMapPosition]
  );

  return (
    <div id="page-create-location">
      <div className="content">
        <header>
          <img src={logo} alt="Coleta Seletiva" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form onSubmit={handleSubmit}>
          <h1>
            Cadastro do <br /> local de coleta
          </h1>

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <label htmlFor="name">Nome da entidade</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleInputChange}
              />
            </div>
            <div className="field-group">
              <div className="field">
                <label htmlFor="email">E-mail</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <label htmlFor="whatsapp">Whatsapp</label>
                <input
                  type="text"
                  name="whatsapp"
                  id="whatsapp"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Marque o endereço no mapa</span>
            </legend>

            <Map
              center={[-23.0003709, -43.365895]}
              zoom={14}
              onclick={handMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={selectedMapPosition} />
            </Map>

            <div className="field-group">
              <div className="field">
                <label htmlFor="city">Cidade</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  onChange={handleInputChange}
                />
              </div>

              <div className="field">
                <label htmlFor="uf">Estado</label>
                <input
                  type="text"
                  name="uf"
                  id="uf"
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Ítens coletados</h2>
              <span>Você pode marcar um ou mais ítens</span>
            </legend>
            <ul className="items-grid">
              {items.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? "selected" : ""}
                >
                  <Feature
                    img={item.img}
                    title={item.name}
                    width="300px"
                    height="300px"
                  />
                </li>
              ))}
            </ul>
          </fieldset>

          <button type="submit">Cadastrar local de coleta</button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
