import React from "react";
import { useSelector } from "react-redux";

export default function AvatarComp() {
  const user = useSelector((state) => state.myReducer.user);

  return (
    <main>
      <div className="bg-kuarteneri flex text-neutral-content items-center rounded-full">
        <div className="ms-2 grid grid-cols-1">
          <span className="text-sm text-center -mb-1 font-medium text-primary capitalize w-full transform scale-75">
            {user.name ? (
              user.name
            ) : (
              <div className="animate-pulse w-20 h-3 bg-primary rounded-md "></div>
            )}
          </span>
          <span className="text-xs text-center -mt-1 font-medium text-primary capitalize w-full transform scale-75">
            {user.posisi ? (
              `(${user.posisi})`
            ) : (
              <div className="animate-pulse w-20 h-3 bg-primary rounded-md "></div>
            )}
          </span>
        </div>
        <div className="avatar placeholder">
          <div className="bg-secondary text-tPrimary rounded-full w-10 uppercase">
            <span>
              {user.name ? (
                user.name.slice(0, 2)
              ) : (
                <div className="animate-pulse w-8 h-8 bg-primary rounded-full "></div>
              )}
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
