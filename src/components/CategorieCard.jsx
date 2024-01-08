import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import ColorItem from './ColorItem';

const CategorieCard = ( { collectionObjet, actionTitle, actionColor } ) => {
  const { id, nameCollection, colors } = { ...collectionObjet };

  return (
    <div className="">
      <h3
        onClick={() =>
          actionTitle( { visible: true, mode: 'update', title: nameCollection, id } )
        }
        className="text-center my-2"
      >
        {nameCollection ? nameCollection : 'Categoria sin nombre'}
      </h3>
      <div className="grid gap-2 grid-cols-3">
        {colors
          ? colors.map( ( color, i ) => (
            <ColorItem
              key={i}
              color={color}
              onDoubleClick={() => actionColor( { visible: true, mode: 'update', color, colorPos: i, idCollection: id } )}
            />
          ) )
          : null}
        <div
          className="h-10 bg-gray-800 flex justify-center items-center rounded-lg"
          onClick={() => actionColor( { visible: true, mode: 'new', idCollection: id } )}
        >
          <FaPlus />
        </div>
      </div>
    </div>
  );
};

CategorieCard.propTypes = {
  collectionObjet: PropTypes.shape( {
    nameCollection: PropTypes.string,
    colors: PropTypes.array,
    id: PropTypes.string,
  } ),
  actionTitle: PropTypes.func,
  actionColor: PropTypes.func,
};

export default CategorieCard;
