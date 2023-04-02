import React, { useState, useEffect } from 'react';

interface FullName {
  name: string;
}

function DbTestComponent(props: FullName){
  return <div className="shopping-list">
  <h1>Shopping List for {props.name}</h1>
  <ul>
    <li>a</li>
    <li>b</li>
    <li>c</li>
  </ul>
  </div>;
}
export default DbTestComponent;
