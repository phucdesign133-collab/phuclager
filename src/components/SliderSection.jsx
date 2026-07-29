import React from "react";
import { Link } from "react-router-dom";
import "./SliderSection.css";

const SliderSection = ({ title, tools, basePath }) => {
  return (
    <div className="resource-section">
      {title && <h3 className="section-title">{title}</h3>}

      <div className="res-slider">
        {tools.map((tool) => {
          const thumbImage = tool.images?.[0] || tool.icon;

          return (
            <Link 
              key={tool.id} 
              to={`${basePath}/${tool.id}`} 
              className="res-card-thumb"
            >
              <div className="res-thumb-container">
                <img src={thumbImage} alt={tool.title} />
              </div>
              
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SliderSection;