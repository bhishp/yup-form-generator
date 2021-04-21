import React from "react";
import {ObjectRenderer} from "../../../src/types";

export const ColumnView: ObjectRenderer = ({ label, name, depth = 0, children }) => {
  return (
    <div style={{ margin: `${depth * 8}px`}}>
      <label htmlFor={name}>{label}</label>
      <hr />
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {React.Children.map(children, (c, i) => (
          i % 2 === 0 ? <div style={{ flex: '1 1 67%' }}>{c}</div>
            : <div style={{ flex: '1 1 33%' }}>{c}</div>
        ))}
      </div>
    </div>
  );
};
