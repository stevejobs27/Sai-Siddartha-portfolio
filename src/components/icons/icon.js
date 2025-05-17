import React from 'react';
import PropTypes from 'prop-types';
import IconExternal from './external';
import IconFolder from './folder';
import IconFork from './fork';
import IconGitHub from './github';
import IconLinkedin from './linkedin';
import IconLogo from './logo';
import IconMedium from './medium';
import IconPower from './power';

const Icon = ({ name }) => {
  switch (name) {
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
    default:
      return <IconExternal />;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;