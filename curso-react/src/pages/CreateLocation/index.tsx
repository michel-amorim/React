import React from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import logo from "../../logo.svg";
import "./style.css";

const CreateLocation: React.FC = () => {
  return (
    <div id="page-create-location">
      <div className="content">
        <header>
          <img src={logo} alt="coleta Seletiva" />
          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <form>
          <h1>
            Cadastro de <br /> local de coleta
          </h1>
          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Itens coletados</h2>
              <span>Você pode marcar um ou mais ítens</span>
            </legend>
          </fieldset>

          <button type="submit"></button>
        </form>
      </div>
    </div>
  );
};

export default CreateLocation;
