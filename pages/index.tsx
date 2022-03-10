import type { NextPage } from 'next';
import withLayout from '@layout/.';
import Header from '@containers/HomePageHeader';

const Home: NextPage = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default withLayout(Home);
