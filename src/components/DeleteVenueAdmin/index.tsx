import { useParams } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../../App";
import { useState } from "react";

const action = "/venues";

function useDeleteVenueAPI() {
  let { id } = useParams();

  const deleteVenue = async () => {
    // let { id } = useParams();
    const venuesUrl = url + action + `/${id}`;
    console.log("Deleteing venue");

    try {
      const response = await AuthFetch(venuesUrl, { method: "DELETE" });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteVenue };
}

function DeleteVenue() {
  const { deleteVenue } = useDeleteVenueAPI();
  // let { id } = useParams();

  const [showMessage, setShowMessage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function ShowDeleteMessage() {
    return (
      <div className="text-dark-green mx-auto"> Venue deleted successfully</div>
    );
  }

  const handleDelete = async () => {
    setShowConfirm(false);

    try {
      await deleteVenue();
      setShowMessage(true);
    } catch (error) {
      console.log(error);
    }
  };

  const openConfirm = () => {
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    setShowConfirm(false);
  };

  return (
    <span>
      {showMessage && <ShowDeleteMessage />}
      <p
        className="text-md font-bold px-4 pt-2 hover:cursor-pointer"
        onClick={openConfirm}
      >
        Delete venue
      </p>
      {showConfirm && (
        <div className="modal max-w-md mx-auto mt-4 -ml-8 rounded-2xl p-4 absolute z-50 bg-white-pink border border-green ">
          <div className="modal-content">
            <p className="pb-2 text-sm">Delete this venue?</p>
            <button
              className="text-white-pink bg-green dark:bg-pink rounded-md ml-2 px-3 py-1 w-12"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="text-white-pink bg-green dark:bg-pink rounded-md ml-2 px-3 py-1 w-12"
              onClick={closeConfirm}
            >
              No
            </button>
          </div>
        </div>
      )}
    </span>
  );
}

export default DeleteVenue;
