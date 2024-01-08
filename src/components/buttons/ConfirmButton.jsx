import PropTypes from "prop-types";
import { FaCheck } from "react-icons/fa";

const ConfirmButton = () => {
  return (
    <div className="w-8 h-8 bg-green-700 rounded-full flex justify-center items-center">
      <FaCheck />
    </div>
  )
}
ConfirmButton.propTypes = {
  action: PropTypes.func
}

export default ConfirmButton