/* eslint-disable no-unused-vars */

/*{ visible: true, mode: 'new', color: '', colorPos: 0, idCollection: '' }  */
import propTypes from "prop-types"

import { useRef, useState } from "react";

import ConfirmButton from "./buttons/ConfirmButton";
import DeleteButton from "./buttons/DeleteButton";
import CancelButton from "./buttons/CancelButton";
import useCollections from "../storage/collectionsData";


const AlertAddColor = ( { toggle, conf } ) => {
  const { mode, color, colorPos, idCollection } = { ...conf }
  const hexCode = useRef( null );
  const [inputValue, setInputValue] = useState( color || '' );

  const addColor = useCollections( state => state.addColor )
  const updateColor = useCollections( state => state.updateColor )
  const deleteColor = useCollections( state => state.deleteColor )

  const handleInputValue = ( event ) => {
    setInputValue( event.target.value );
  };


  const actionConfirmButton = () => {
    if ( mode === "new" ) {
      addColor( idCollection, inputValue )
    }
    if ( mode === "update" ) {
      updateColor( idCollection, inputValue, colorPos )
    }
    toggle()
  }
  const actionCancelButton = () => {
    toggle()
  }
  const actionDeleteButton = () => {
    deleteColor( idCollection, colorPos )
    toggle()
  }

  return (
    <div className="absolute lg:w-[25vw] w-[90vw] flex flex-col justify-center rounded-md bg-gray-600 py-3 px-5 items-center">
      <div onClick={actionCancelButton} className="absolute top-2 right-2">
        <CancelButton />
      </div>
      <span>Código Hexadecimal:</span>
      <input
        ref={hexCode}
        value={inputValue}
        onChange={handleInputValue}
        className="text-center bg-transparent border-b-2 outline-none focus:border-blue-300 w-[50%]"
        type="text"
      />
      <div className="w-[50%] h-10 rounded-xl mt-2 border-2 border-gray-500" style={{ backgroundColor: inputValue }}></div>
      <div className="mt-2 flex justify-around w-full" >
        <div onClick={mode !== "new" ? actionDeleteButton : undefined}>
          <DeleteButton disable={mode === "new"} />
        </div>
        <div onClick={actionConfirmButton}>
          <ConfirmButton />
        </div>
      </div>
    </div>
  );
};
AlertAddColor.propTypes = {
  toggle: propTypes.func,
  conf: propTypes.shape( {
    visible: propTypes.bool,
    mode: propTypes.oneOf( ['new', 'update'] ),
    placeholder: propTypes.string,
  } )
}

export default AlertAddColor;
