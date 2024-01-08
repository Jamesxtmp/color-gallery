/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

import AlertAddColor from "./components/AlertAddColor"
import AlertWriteName from "./components/AlertWriteName"
import CategorieCard from "./components/CategorieCard"

import useCollections from "./storage/collectionsData"


const App = () => {
  const [showAlertColor, setShowAlertColor] = useState( { visible: false, mode: 'new', color: '', colorPos: 0, idCollection: '' } )
  const handleAlertColor = ( data ) => {
    if ( data ) {
      const { visible, mode, color, colorPos, idCollection } = data;
      setShowAlertColor( {
        visible: visible ? visible : setShowAlertColor.visible,
        mode: mode ? mode : setShowAlertColor.mode,
        color: color ? color : setShowAlertColor.color,
        colorPos: colorPos || colorPos === 0 ? colorPos : setShowAlertColor.colorPos,
        idCollection: idCollection ? idCollection : setShowAlertColor.idCollection,
      } )
    } else {
      setShowAlertColor( !setShowAlertColor );
    }
  }
  const [showAlertWrite, setShowAlertWrite] = useState( { visible: false, mode: 'new', title: '', id: '' } )

  const handleAlertWrite = ( data ) => {
    if ( data ) {
      const { visible, mode, title, id } = data;
      setShowAlertWrite( {
        visible: visible ? visible : showAlertWrite.visible,
        mode: mode ? mode : showAlertWrite.mode,
        title: title ? title : showAlertWrite.title,
        id: id ? id : showAlertWrite.id,
      } )
    } else {
      setShowAlertWrite( !showAlertWrite );
    }
  };

  const collections = useCollections( state => state.data )
  const setInitialDataFirebase = useCollections( state => state.setInitialDataFirebase )

  useEffect( () => {
    setInitialDataFirebase()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] )

  return (
    <div className="w-full">
      <div className="px-4 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
        {collections && collections.map( ( collection ) => {
          return (
            <CategorieCard
              key={collection.id}
              collectionObjet={collection}
              actionTitle={handleAlertWrite}
              actionColor={handleAlertColor}
            />

          )
        } )}
        <div onClick={() => { handleAlertWrite( { visible: true, mode: 'new' } ) }} className="my-2 h-20 flex justify-center items-center bg-gray-800 rounded-xl">
          Nueva categoria
        </div>
      </div>
      {showAlertColor.visible || showAlertWrite.visible
        ? <div className="h-full w-full bg-[#000000b9] absolute top-0" ></div> : null}
      <div className="w-full top-20 absolute flex justify-center">
        {showAlertColor.visible && <AlertAddColor conf={showAlertColor} toggle={handleAlertColor} />}
        {showAlertWrite.visible && <AlertWriteName conf={showAlertWrite} toggle={handleAlertWrite} />}
      </div>
    </div>
  )
}

export default App