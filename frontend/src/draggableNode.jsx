import React from 'react';

export const DraggableNode = ({ 
  type, 
  label, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType }
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      {...props}
      className={`
        ${className}
        ${type}
        flex flex-col items-center justify-center 
        p-2 md:p-4 rounded-lg border border-indigo-700 
        bg-indigo-800/50 hover:bg-indigo-700/50 
        transition-colors cursor-grab md:w-[70px] w-[50px] 
      `}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      {Icon && <Icon className="w-4 h-4  mb-2 text-indigo-300" />}
      <span className="text-xs font-medium text-indigo-200">{label}</span>
    </div>
  );
};