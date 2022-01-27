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
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
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
        console.log('for each', iceElement);
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 20,
              marginBottom: 20,
              border: '1px solid #ddd',
              borderRadius: 12,
              backgroundColor: 'white',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <label>Name: {iceElement.name}</label>
                <label>Kategorie: {iceElement.categorie}</label>
                <label>Nährwert: {iceElement.nutritionalValue} kcal / 100g</label>
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
                <div
                  style={{
                    fontSize: '1.2rem',
                    padding: '3px 10px',
                    borderRadius: 20,
                    display: 'inline-flex',
                    margin: '5px 5px 0px 0px',
                    backgroundColor: 'lightgray',
                  }}
                >
                  {ingredient}
                </div>
              ))}
            </label>
            <label>
              <strong style={{ color: '#ff2400' }}>Allergene: </strong>
              {iceElement.allergenics}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default IceList;
