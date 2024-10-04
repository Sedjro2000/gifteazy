import React from 'react';

interface CardProps {
  title: string;
  value: string;
  subtitle: string;
}

const Card: React.FC<CardProps> = ({ title, value, subtitle }) => {
  return (
    <div className="p-6 bg-purple-100 rounded-md shadow-sm">
      <h3 className="text-md font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
      <span className="text-sm text-gray-500">{subtitle}</span>
    </div>
  );
};

export default Card;
