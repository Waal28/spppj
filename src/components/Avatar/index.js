import React from "react";
import { useSelector } from "react-redux";

export default function AvatarComp() {
  const user = useSelector((state) => state.myReducer.user);

  return (
    <main>
      <div className="bg-gray-500 flex text-neutral-content items-center rounded-full">
        <div className="ms-2 grid grid-cols-1">
          <span className="text-sm text-center capitalize w-full transform scale-75">
            {user.name ? (
              user.name
            ) : (
              <div className="animate-pulse w-20 h-3 bg-gray-400 rounded-md "></div>
            )}
          </span>
          <span className="text-xs text-center capitalize w-full transform scale-75">
            {user.posisi ? (
              user.posisi
            ) : (
              <div className="animate-pulse w-20 h-3 bg-gray-400 rounded-md "></div>
            )}
          </span>
        </div>
        <div className="avatar placeholder">
          <div className="bg-slate-700 rounded-full w-10 uppercase">
            <span>
              {user.name ? (
                user.name.slice(0, 2)
              ) : (
                <div className="animate-pulse w-8 h-8 bg-gray-400 rounded-full "></div>
              )}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
