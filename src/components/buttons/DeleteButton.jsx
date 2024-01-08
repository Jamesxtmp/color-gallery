import propTypes from "prop-types";
import { MdDeleteForever } from "react-icons/md";

const DeleteButton = ( { disable } ) => {
  return (
    <div
      className="w-8 h-8 bg-red-700 rounded-full flex justify-center items-center"
      style={{ backgroundColor: `${disable && 'gray'}` }}
    >
      <MdDeleteForever />
    </div>
  )
}
DeleteButton.propTypes = {
  disable: propTypes.bool,
}

export default DeleteButton