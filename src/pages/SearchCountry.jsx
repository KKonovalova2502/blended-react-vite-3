import { useSearchParams } from 'react-router-dom';
import Container from '../components/Container/Container';
import SearchForm from '../components/SearchForm/SearchForm';
import Section from '../components/Section/Section';
import { useEffect, useState } from 'react';
import CountryList from '../components/CountryList/CountryList';
import Loader from '../components/Loader/Loader';
import { fetchByRegion } from '../service/countryApi';

const SearchCountry = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const region = searchParams.get('region');

    if (!region) return;

    async function getData() {
      try {
        setLoading(true);
        setError(false);
        const data = await fetchByRegion(region);
        setCountries(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [searchParams]);

  const onSubmit = region => {
    setSearchParams({ region });
  };

  return (
    <Section>
      <Container>
        <SearchForm onSubmit={onSubmit} />
        {error && <p>Oooops!.. Try again!</p>}
        {loading && <Loader />}
        <CountryList countries={countries} />
      </Container>
    </Section>
  );
};

export default SearchCountry;
