import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ice } from 'shared';

export const IceList = () => {
  const navigate = useNavigate();
  const [ice, setIce] = React.useState<Ice[]>([]);
  React.useEffect(() => {
    fetch('http://localhost:3000/getIce', {
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setIce(responseJson);
      })
      .catch(() => {
        alert('Eissorte konnte nicht geladen werden');
      });
  }, [setIce]);

  return (
    <div className="container">
      <div
        className="rowContainerBetween"
        style={{
          alignItems: 'center',
        }}
      >
        <h1>Eisliste</h1>
        <button
          onClick={() => {
            navigate('/addIce');
          }}
        >
          Hinzufügen
        </button>
      </div>
      {ice.map((iceElement) => {
        return (
          <div className="columnContainerBetween styledList">
            <div className="rowContainerBetween">
              <div className="columnContainerBetween">
                <div className="rowContainer">
                  <label>Name:&nbsp;</label>
                  <span>{iceElement.name}</span>
                </div>
                <div className="rowContainer">
                  <label>Kategorie:&nbsp;</label>
                  <span>{iceElement.categorie}</span>
                </div>
                <div className="rowContainer">
                  <label>Nährwert:&nbsp;</label>
                  <span>{iceElement.nutritionalValue} kcal / 100g</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontWeight: 'bold', fontSize: '2rem' }}>{iceElement.price}</span>
                <span style={{ display: 'block' }}>€ / Liter</span>
              </div>
            </div>
            <div
              style={{ borderBottom: '1px dotted #666', display: 'block', marginBottom: '5px' }}
            />
            <label>
              Zutaten:&nbsp;
              {iceElement.ingredients.map((ingredient) => (
                <div className="circled">{ingredient}</div>
              ))}
            </label>
            <div className="rowContainer">
              <label>
                <strong style={{ color: '#ff2400' }}>Allergene: </strong>&nbsp;
              </label>
              <span>{iceElement.allergenics}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IceList;
