import React from 'react';
import { 
  FiMail, 
  FiGithub, 
  FiLinkedin, 
  FiUser, 
  FiMessageSquare, 
  FiSend, 
  FiCheckCircle
} from 'react-icons/fi';
import { FaMediumM } from 'react-icons/fa';
import { RiStarSLine } from "react-icons/ri";
import { IoDocumentAttachOutline } from "react-icons/io5";
import PowerBIIcon from "./PowerBIIcon";
 // ✅ Custom Icon Import

const Icon = ({ name, className }) => {
  const iconStyle = {
    ...(className && { className })
  };

  switch (name.toLowerCase()) {
  case 'mail':
  case 'email':
    return <FiMail {...iconStyle} />;
  case 'github':
    return <FiGithub {...iconStyle} />;
  case 'linkedin':
    return <FiLinkedin {...iconStyle} />;
  case 'medium':
    return <FaMediumM {...iconStyle} />;
  case 'star':
    return <RiStarSLine {...iconStyle} />;
  case 'powerbi':
    return <PowerBIIcon {...iconStyle} />;
  case 'user':
    return <FiUser {...iconStyle} />;
  case 'messagesquare':
    return <FiMessageSquare {...iconStyle} />;
  case 'send':
    return <FiSend {...iconStyle} />;
  case 'checkcircle':
    return <FiCheckCircle {...iconStyle} />;
  case 'document':
    return <IoDocumentAttachOutline {...iconStyle} />;
  default:
    return null;
}

};

export default Icon;
