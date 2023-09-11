import React from "react";
import AlertComp from "../AlertComp";

export default function ConfirmSetPj({
  confirm,
  setConfirm,
  msg,
  setMsg,
  setIsClick,
}) {
  const clickBatal = () => {
    setConfirm({ ...confirm, isCheck: !confirm.isCheck });
    setIsClick(false);
    setMsg(false);
  };
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_4"
        checked={confirm.isCheck}
        onChange={() => setConfirm({ ...confirm, isCheck: !confirm.isCheck })}
        className="modal-toggle"
      />
      <div className="modal">
        <main className="modal-box">
          <h3 className="font-bold text-lg">{confirm.title}</h3>
          {msg && <AlertComp msg={msg} setMsg={setMsg} />}
          <div className="my-4 text-justify">{confirm.text}</div>
          <div className="flex justify-around items-center mt-6">
            <button
              className="btn btn-sm bg-secondary text-tPrimary capitalize"
              onClick={clickBatal}
            >
              {confirm.titleNbutton}
            </button>
            <button
              className="btn btn-sm bg-secondary text-tPrimary capitalize"
              onClick={confirm.funcYbutton}
            >
              {confirm.titleYbutton}
            </button>
          </div>
        </main>
        <label className="modal-backdrop" htmlFor="my_modal_4">
          Close
        </label>
      </div>
    </>
  );
}
