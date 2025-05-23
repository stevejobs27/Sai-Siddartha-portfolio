import React from 'react';
import PropTypes from 'prop-types';
import IconEmail from './email';
import IconExternal from './external';
import IconFolder from './folder';
import IconFork from './fork';
import IconGitHub from './github';
import IconLinkedin from './linkedin';
import IconLogo from './logo';
import IconMedium from './medium';
import IconPower from './power';
import IconTableau from './tableau';

const Icon = ({ name }) => {
  switch (name) {
    case 'Email':
      return <IconEmail />;
    case 'External':
      return <IconExternal />;
    case 'Folder':
      return <IconFolder />;
    case 'Fork':
      return <IconFork />;
    case 'GitHub':
      return <IconGitHub />;
    case 'Linkedin':
      return <IconLinkedin />;
    case 'Logo':
      return <IconLogo />;
    case 'Medium':
      return <IconMedium />;
    case 'Power':
      return <IconPower />;
    case 'Tableau':
      return <IconTableau />;
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;