import React from 'react';
import Katsu from './katsu';

export default ({katsus}) => (
  <div className="column">
    {katsus.map(k => <Katsu key={k.id} katsu={k}/>)}
  </div>
);
