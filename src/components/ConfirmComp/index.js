import React from "react";

export default function ConfirmComp({ confirm, setConfirm }) {
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_2"
        checked={confirm.isCheck}
        onChange={() => setConfirm({ ...confirm, isCheck: !confirm.isCheck })}
        className="modal-toggle"
      />
      <div className="modal">
        <main className="modal-box">
          <h3 className="font-bold text-lg">{confirm.title}</h3>
          <div className="my-4 text-justify">{confirm.text}</div>
          <div className="flex justify-around items-center mt-6">
            <button
              className="btn btn-sm bg-secondary text-tPrimary shadow-md capitalize"
              onClick={() => setConfirm({ ...confirm, isCheck: false })}
            >
              {confirm.titleNbutton}
            </button>
            <button
              className="btn btn-sm bg-secondary text-tPrimary shadow-md capitalize"
              onClick={confirm.funcYbutton}
            >
              {confirm.titleYbutton}
            </button>
          </div>
        </main>
        <label
          className="modal-backdrop"
          onClick={() => setConfirm({ ...confirm, isCheck: false })}
        >
          Close
        </label>
      </div>
    </>
  );
}
