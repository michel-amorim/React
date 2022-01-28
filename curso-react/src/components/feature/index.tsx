import React from "react";
import "../feature/style.css";

interface IFeature {
  img: string;
  title: string;
  description?: string;
  width: string;
  height: string;
}

const feature: React.FC<IFeature> = ({
  img,
  title,
  description,
  width,
  height,
}) => {
  return (
    <div className="card">
      <img
        className="borderImg"
        src={img}
        width={width}
        height={height}
        alt={title}
      />
    </div>
  );
};

export default feature;
