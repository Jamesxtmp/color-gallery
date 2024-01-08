import { useState } from "react";
import PropTypes from 'prop-types';

const ColorItem = ( { color, onDoubleClick } ) => {
  const [showCopy, setShowCopy] = useState( false );

  return (
    <div
      className="h-10 rounded-lg border border-gray-500"
      style={{ backgroundColor: color }}
      onDoubleClick={onDoubleClick}
      onClick={() => {
        navigator.clipboard.writeText( color );
        setShowCopy( true );

        // Ocultar el mensaje después de 1.5 segundos
        setTimeout( () => {
          setShowCopy( false );
        }, 500 );
      }}
    >
      {showCopy && (
        <div className="relative bottom-3 inline px-2 py-[1px] rounded-lg bg-gray-500 text-sm">
          Copy
        </div>
      )}
    </div>
  );
};
ColorItem.propTypes = {
  color: PropTypes.string.isRequired,
  onDoubleClick: PropTypes.func.isRequired,
};

export default ColorItem;
