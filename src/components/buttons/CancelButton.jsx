import propTypes from "prop-types";
import { IoCloseSharp } from "react-icons/io5";

const CancelButton = () => {
  return (
    <div className="w-8 h-8 flex justify-center items-center">
      <IoCloseSharp />
    </div>
  )
}
CancelButton.propTypes = {
  action: propTypes.func,
  active: propTypes.bool
}

export default CancelButton