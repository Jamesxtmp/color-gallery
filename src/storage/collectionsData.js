import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid';

const setDataToFirebase = async ( data ) => {
  await fetch( "https://gallery-colors-xtmp-default-rtdb.firebaseio.com/galleryData.json", {
    method: "PUT",
    body: JSON.stringify( data )
  } ).catch( err => console.error( err ) )
}
const getDataToFirebase = async () => {
  const data = await fetch( "https://gallery-colors-xtmp-default-rtdb.firebaseio.com/galleryData.json" ).then( res => res.json() )
  return data
}

const useCollections = create( ( set ) => ( {
  data: [],
  setInitialDataFirebase: async () => {
    const dataToFirebase = await getDataToFirebase();
    // eslint-disable-next-line no-unused-vars
    set( ( state ) => ( { data: dataToFirebase.data } ) );
  },

  /* addCollection
  * collectionName : string
  */
  addCollection: ( collectionName ) => set( state => {
    const newCollection = {
      id: uuidv4(),
      nameCollection: collectionName ? collectionName : '',
      colors: []
    };
    const newData = { data: [...state.data, newCollection] }
    setDataToFirebase( newData )
    return newData;
  } ),
  /* deleteCollection
  * id : string
  */
  deleteCollection: ( id ) => set( state => {
    const newData = { data: state.data.filter( collection => collection.id !== id ) }
    setDataToFirebase( newData )
    return newData
  } ),
  /* updateCollectionName
  * idCollection : string
  * newName : string
  */
  updateCollectionName: ( idCollection, newName ) => set( ( state ) => {
    const updatedData = state.data.map( ( collection ) => {
      if ( collection.id === idCollection ) {
        return { ...collection, nameCollection: newName };
      }
      return collection;
    } );
    const newData = { data: updatedData };
    setDataToFirebase( newData );
    return newData;
  } ),

  /* addColor
  * idCollection : string
  * color : string 
  */
  addColor: ( idCollection, color ) => set( state => {
    const updatedData = state.data.map( collection => {
      if ( collection.id === idCollection ) {
        if ( collection.colors ) {
          return { ...collection, colors: [...collection.colors, color] };
        } else {
          return { colors: [color] };
        }
      }
      return collection;
    } );
    const newData = { data: updatedData }
    setDataToFirebase( newData )
    return newData;
  } ),

  /* updateColor
  * idCollection : string
  * color : string
  * colorPos : number 
 */
  updateColor: ( idCollection, color, colorPos ) => set( state => {
    console.log( "entry updateColor", idCollection, color, colorPos );
    const updatedData = state.data.map( collection => {
      if ( collection.id === idCollection ) {
        // Actualiza el color en la posición especificada
        const updatedColors = collection.colors.map( ( c, index ) => ( index === colorPos ? color : c ) );
        return { ...collection, colors: updatedColors };
      }
      return collection;
    } );
    const newData = { data: updatedData }
    setDataToFirebase( newData )
    return newData;
  } ),

























  /* deleteColor
  * idCollection : string
  * colorPos : number 
  */
  deleteColor: ( idCollection, colorPos ) => set( state => {
    const updatedData = state.data.map( collection => {
      if ( collection.id === idCollection ) {
        const updatedColors = collection.colors.filter( ( _, index ) => index !== colorPos );
        return { ...collection, colors: updatedColors };
      }
      return collection;
    } );
    const newData = { data: updatedData }
    setDataToFirebase( newData )
    return newData;
  } )

} ) )
export default useCollections