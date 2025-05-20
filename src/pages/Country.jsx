import { useParams } from 'react-router-dom';
import Container from '../components/Container/Container';

import Section from '../components/Section/Section';

import { fetchCountry } from '../service/countryApi';
import { useEffect, useState } from 'react';
import CountryInfo from '../components/CountryInfo/CountryInfo';
import GoBackBtn from '../components/GoBackBtn/GoBackBtn';
import Loader from '../components/Loader/Loader';

const Country = () => {
  const { countryId } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const data = await fetchCountry(countryId);
        setCountry(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [countryId]);

  return (
    <Section>
      <Container>
        <GoBackBtn />
        {loading && <Loader />}
        {country && <CountryInfo country={country} />}
      </Container>
    </Section>
  );
};

export default Country;
