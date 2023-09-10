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
              className="btn btn-sm bg-gray-200 hover:bg-gray-300 capitalize"
              onClick={() => setConfirm({ ...confirm, isCheck: false })}
            >
              {confirm.titleNbutton}
            </button>
            <button
              className="btn btn-sm bg-green-500 hover:bg-green-600 text-white capitalize"
              onClick={confirm.funcYbutton}
            >
              {confirm.titleYbutton}
            </button>
          </div>
        </main>
        <label className="modal-backdrop" htmlFor="my_modal_2">
          Close
        </label>
      </div>
    </>
  );
}
