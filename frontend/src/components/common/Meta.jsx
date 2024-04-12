/* eslint-disable react/prop-types */
import { Helmet } from 'react-helmet-async';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Etem Meals',
  description: 'Sell the best meal kits and so on!',
  keyword: 'deliver meal, meals, cheap meals, healty meals',
};

export default Meta;
