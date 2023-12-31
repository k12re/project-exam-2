import { useParams } from "react-router-dom";
import { AuthFetch } from "../AuthFetch";
import { url } from "../Constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { load } from "../Storage";

const action = "/venues";

function useDeleteVenueAPI() {
  let { id } = useParams();

  const deleteVenue = async () => {
    const venuesUrl = url + action + `/${id}`;

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
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  function ShowDeleteMessage() {
    return (
      <div className="text-dark-green mx-auto text-xs absolute -ml-20 mt-10">
        {" "}
        Venue deleted successfully, redirecting..
      </div>
    );
  }

  const handleDelete = async () => {
    setShowConfirm(false);

    try {
      await deleteVenue();
      setShowMessage(true);

      setTimeout(() => {
        const myProfile = load("profile");
        navigate(`/profiles/${myProfile?.name}`);
      }, 2000);
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
        className="text-md font-bold px-4 pt-5 hover:cursor-pointer hover:text-dark-red dark:hover:text-red"
        onClick={openConfirm}
      >
        Delete venue
      </p>
      {showConfirm && (
        <div className="drop-shadow-lg modal max-w-md mx-auto mt-8 -ml-8 rounded-2xl p-4 absolute z-50 bg-white-pink dark:bg-dark-green border border-green ">
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
