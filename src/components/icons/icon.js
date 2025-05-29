import React from 'react';
import IconEmail from './email';
import IconGitHub from './github';
import IconLinkedin from './linkedin';
import IconMedium from './medium';
import IconPower from './power';
import IconTableau from './tableau';

const Icon = ({ name }) => {
  switch (name) {
    case 'Email':
      return <IconEmail />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Medium':
      return <IconMedium />;
    case 'Power':
      return <IconPower />;
    case 'Tableau':
      return <IconTableau />;
    default:
      return '';
  }
};

export default Icon;