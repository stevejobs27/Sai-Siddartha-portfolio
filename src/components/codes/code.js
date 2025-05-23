import covid19 from './covid19';
import cyclistic from './cyclistic';

const Code = (code) => {
  switch (code) {
    case 'Covid19':
      return covid19;
    case 'Cyclistic':
      return cyclistic;
    default:
      return '';
  }
};

export default Code;