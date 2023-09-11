import React from "react";

export default function ModalComp({ dataModal, setDataModal }) {
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_3"
        checked={dataModal.isClick}
        onChange={() =>
          setDataModal({ ...dataModal, isClick: !dataModal.isClick })
        }
        className="modal-toggle"
      />
      <div className="modal">
        {dataModal.children}
        <label
          className="modal-backdrop"
          onClick={() =>
            setDataModal({ ...dataModal, isClick: !dataModal.isClick })
          }
        >
          Close
        </label>
      </div>
    </>
  );
}
