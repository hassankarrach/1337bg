import { NextPage } from 'next';

const Custom404: NextPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20vh'}}>
      <h1>Oops! This page is not found.</h1>
      <p>Maybe it got swallowed by a blackhole... 🕳️</p>
    </div>
  );
};

export default Custom404;
