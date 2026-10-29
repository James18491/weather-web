import { useState, type FormEvent } from 'react';

interface SearchFormProps {
  onSearch: (city: string) => void;
  onLocation: () => void;
  loading: boolean;
}

function SearchForm({ onSearch, onLocation, loading }: SearchFormProps) {
  const [city, setCity] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!city.trim()) return;
    onSearch(city.trim());
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Type a city... e.g. Seoul"
      />
      <button type="button" className="location-btn" onClick={onLocation} disabled={loading}>
        📍
      </button>
      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchForm;