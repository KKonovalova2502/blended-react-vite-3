import { useEffect, useState } from 'react';
import Container from '../components/Container/Container';
import CountryList from '../components/CountryList/CountryList';
import Section from '../components/Section/Section';
import Loader from '../components/Loader/Loader';
import { getCountries } from '../service/countryApi';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCountries() {
      try {
        setLoading(true);
        setError(false);
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <Section>
      <Container>
        {error && <p>Oooops!.. Try again!</p>}
        {loading && <Loader />}
        {countries.length > 0 && <CountryList countries={countries} />}
      </Container>
    </Section>
  );
};
export default Home;
