import * as React from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { Ice, Categorie } from 'shared';
import { useNavigate } from 'react-router-dom';

const options: readonly { value: string; label: string }[] = [
  { value: 'Milch', label: 'Milch' },
  { value: 'Vollmilch', label: 'Vollmilch' },
  { value: 'Kokosfett', label: 'Kokosfett' },
  { value: 'Zucker', label: 'Zucker' },
  { value: 'Schlagsahne', label: 'Schlagsahne' },
  { value: 'Bourbon-Vanilleextrakt', label: 'Bourbon-Vanilleextrakt' },
  { value: 'Vanilleschoten', label: 'Vanilleschoten' },
  { value: 'Kakao', label: 'Kakao' },
  { value: 'Schokolade', label: 'Schokolade' },
  { value: 'Eigelb', label: 'Eigelb' },
] as const;

const categorieOptions: readonly { value: Categorie; label: Categorie }[] = [
  { value: 'Sahne-Eis', label: 'Sahne-Eis' },
  { value: 'Frucht-Eis', label: 'Frucht-Eis' },
  { value: 'Wasser-Eis', label: 'Wasser-Eis' },
] as const;

export const AddIce = () => {
  const navigate = useNavigate();
  const [ice, setIce] = React.useState<Ice>({
    name: '',
    categorie: undefined,
    ingredients: [],
    allergenics: '',
    nutritionalValue: undefined,
    price: undefined,
  });

  const navigateBack = () => {
    navigate('/');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    fetch('http://localhost:3000/addIce', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(ice),
    })
      .then((response) => {
        if (response.ok) navigateBack();
        else throw new Error(response.status.toString());
      })
      .catch((err: Error) => {
        const errorMessage =
          err.message === '409'
            ? 'Eissorte bereits angelegt'
            : 'Eissorte konnte nicht angelegt werden';
        alert(errorMessage);
      });
  };

  return (
    <div className="container">
      <h1>Neue Eissorte hinzufügen</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div className="columnContainer">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Was für ein Eis ?"
            name="name"
            type="text"
            value={ice.name}
            onChange={(event) => {
              setIce({ ...ice, name: event.target.value });
            }}
          />
          <label htmlFor="categorie" className="pt20">
            Kategorie
          </label>
          <Select
            id="categorie"
            options={categorieOptions}
            placeholder="Bitte wählen"
            name="categorie"
            value={categorieOptions.find(
              (categorieOption) => categorieOption.value === ice?.categorie
            )}
            onChange={(selectedOption) => {
              setIce({ ...ice, categorie: selectedOption?.value });
            }}
            styles={{
              control: (base) => ({
                ...base,
                boxShadow: 'none',
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#33c3f0',
              },
            })}
          />

          <label htmlFor="ingredients" className="pt20">
            Zutaten
          </label>
          <CreatableSelect
            id="ingredients"
            placeholder="Bitte wählen"
            name="ingredients"
            isMulti
            options={options}
            onChange={(selectedOptions) => {
              setIce({
                ...ice,
                ingredients: selectedOptions.map((selectedOption) => selectedOption.value),
              });
            }}
            styles={{
              control: (base) => ({
                ...base,
                boxShadow: 'none',
              }),
            }}
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: '#33c3f0',
              },
            })}
          />
          <label htmlFor="allergenics" className="pt20">
            Lebensmittelunverträglichkeiten
          </label>
          <textarea
            id="allergenics"
            rows={3}
            name="allergenics"
            placeholder="Unbedingt ausfüllen"
            value={ice.allergenics}
            onChange={(event) => {
              setIce({ ...ice, allergenics: event.target.value });
            }}
          />
          <label htmlFor="nutritionalValue" className="pt20">
            Nährwert
          </label>
          <input
            id="nutritionalValue"
            placeholder="In kcal / 100 g"
            name="nutritionalValue"
            type="number"
            step="0.01"
            value={ice.nutritionalValue}
            onChange={(event) => {
              setIce({ ...ice, nutritionalValue: Number(event.target.value) });
            }}
          />
          <label htmlFor="price" className="pt20">
            VK Preis
          </label>
          <input
            id="price"
            placeholder="In Euro / 1 Liter"
            name="price"
            type="number"
            step="0.01"
            value={ice.price}
            onChange={(event) => {
              setIce({ ...ice, price: Number(event.target.value) });
            }}
          />
        </div>
        <button name="add" type="button" onClick={handleSubmit} className="mt20">
          Hinzufügen
        </button>
        <button
          name="back"
          type="button"
          style={{ margin: '20px 0px 0px 25px' }}
          onClick={navigateBack}
        >
          Zurück
        </button>
      </form>
    </div>
  );
};

export default AddIce;
