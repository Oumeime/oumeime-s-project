import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState({
    type: searchParams.get("type") || "",
    city: searchParams.get("city") || "",
    property: searchParams.get("property") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    bedroom: searchParams.get("bedroom") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
      Résultats de recherche pour <b>{searchParams.get("city")}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Emplacement</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
            onChange={handleChange}
            defaultValue={query.city}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={query.type}
          >
            <option value="">n'importe lequel</option>
            <option value="buy">Acheter</option>
            <option value="rent">Louer</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Propriété</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={query.property}
          >
            <option value="">n'importe lequel</option>
            <option value="apartment">Appartement</option>
            <option value="house">Maison</option>
            {/* <option value="condo">Condo</option> */}
            <option value="land">Atterrir</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Prix minimum</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="n'import lequel"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Prix maximum</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="n'import lequel"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Chambre</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="n'import lequel"
            onChange={handleChange}
            defaultValue={query.bedroom}
          />
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
