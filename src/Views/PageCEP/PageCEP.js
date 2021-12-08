import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import api from "../../services/api";

import "./PageCEP.css";

export default function PageCEP() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleInput() {
    if (input === "") {
      alert("Preencha algum CEP");
      return;
    }
    try {
      const response = await api.get(`${input}/json`);
      console.log(response.data);
      setCep(response.data);
      setInput("");
      console.log(cep.logradouro);
    } catch {
      alert("O CEP Digitado é incorreto");
      setInput("");
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title"> Buscador de CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            placeholder="Digite o CEP"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <button className="buttonSearch" onClick={handleInput}>
            <FiSearch size={25} color="#fff" />
          </button>
        </div>

        {Object.keys(cep).length > 0 ? (
          <main className="main">
            <h3>
              CEP Pesquisado: <p className="cep-info">{cep.cep}</p>
            </h3>
            <p>
              Logradouro:<span> {cep.logradouro} </span>
            </p>

            {cep.complemento && (
              <p>
                Complemento: <span>{cep.complemento}</span>
              </p>
            )}
            <p>
              Bairro: <span>{cep.bairro}</span>
            </p>
            <p>
              Município/UF:{" "}
              <span>
                {cep.localidade} - {cep.uf}
              </span>
            </p>
          </main>
        ) : null}
      </div>
    </>
  );
}
