import type { NextPage } from 'next';
import Htag from '@components/Htag';
import withLayout from '@layout/.';

const Home: NextPage = () => {
  return (
    <div>
      <Htag size={1}>Hello</Htag>
      <Htag size={2}>Hello</Htag>
      <Htag size={3}>Hello</Htag>
      <Htag size={4}>Hello</Htag>
    </div>
  );
};

export default withLayout(Home);
