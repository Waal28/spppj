import React from "react";
import meme from "../../img/meme.gif";

export default function ModalOrderFailed({ isFailedOrder, setFailedOrder }) {
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_7"
        checked={isFailedOrder}
        onChange={() => setFailedOrder(!isFailedOrder)}
        className="modal-toggle"
      />
      <div className="modal">
        <main className="modal-box">
          <div className="bg-black rounded-md py-3">
            <h3 className="font-bold text-lg text-center text-white">
              Yahaha kasian gak bisa mesan ya
            </h3>
            <img
              src={meme}
              alt=""
              style={{ width: "300px", margin: "5px auto" }}
            />
            <h3 className="font-bold text-lg text-center text-white">
              Makanya list tepat waktu
            </h3>
          </div>
        </main>
        <label
          className="modal-backdrop"
          onClick={() => setFailedOrder(!isFailedOrder)}
        >
          Close
        </label>
      </div>
    </>
  );
}
