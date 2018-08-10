import React from 'react';
import { Markdown } from 'react-showdown';
import { Loading } from "element-react";

export default props => (
  <div className="readme-summary">
    {
      props.description === "" && <Loading className="readme-summary__loader" />
    }
    
    <Markdown markup={ props.description } className="readme-summary__content" />
  </div>
)