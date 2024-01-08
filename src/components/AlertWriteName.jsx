/* eslint-disable no-unused-vars */
import propTypes from "prop-types"
import { useState } from "react"

import ConfirmButton from "./buttons/ConfirmButton";
import DeleteButton from "./buttons/DeleteButton";
import CancelButton from "./buttons/CancelButton";

import useCollections from "../storage/collectionsData";


const AlertWriteName = ( { toggle, conf } ) => {
  const { title, id, mode } = { ...conf }

  const [inputValue, setInputValue] = useState( title || "" );

  const addCollection = useCollections( state => state.addCollection )
  const deleteCollection = useCollections( state => state.deleteCollection )
  const updateCollectionName = useCollections( state => state.updateCollectionName )

  const handleInputValue = ( event ) => {
    setInputValue( event.target.value );
  };


  const actionConfirmButton = () => {
    if ( mode === "new" ) {
      addCollection( inputValue )
    }
    if ( mode === "update" ) {
      updateCollectionName( id, inputValue )
    }
    toggle()
  }
  const actionCancelButton = () => {
    toggle()
  }
  const actionDeleteButton = () => {
    deleteCollection( id )
    toggle()
  }

  return (
    <div className="absolute lg:w-[25vw] w-[90vw] flex flex-col justify-center rounded-md bg-gray-600 py-3 px-5 items-center">
      <div onClick={actionCancelButton} className="absolute top-2 right-2">
        <CancelButton />
      </div>
      <span>Nombre de la categoría:</span>
      <input
        value={inputValue}
        onChange={handleInputValue}
        className="bg-transparent border-b-2 outline-none w-full text-center focus:border-blue-300" type="text" />
      <div className="mt-2 flex justify-around w-full" >
        <div onClick={mode !== "new" ? actionDeleteButton : undefined}>
          <DeleteButton disable={mode === "new"} />
        </div>
        <div onClick={actionConfirmButton}>
          <ConfirmButton />
        </div>
      </div>
    </div>
  )
}
AlertWriteName.propTypes = {
  toggle: propTypes.func,
  defaultValue: propTypes.string,
  conf: propTypes.shape( {
    visible: propTypes.bool,
    mode: propTypes.oneOf( ['new', 'update'] ),
    placeholder: propTypes.string,
  } )
}

export default AlertWriteName