import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

export default function AvatarComp() {
  const [user, setUser] = useState({
    name: (
      <div className="animate-pulse w-20 h-3 bg-gray-400 rounded-md "></div>
    ),
    posisi: (
      <div className="animate-pulse w-20 h-3 bg-gray-400 rounded-md "></div>
    ),
  });
  const [avatar, setAvatar] = useState(
    <div className="animate-pulse w-8 h-8 bg-gray-400 rounded-full "></div>
  );
  useEffect(() => {
    if (Cookies.get("user")) {
      const user = jwtDecode(Cookies.get("user"));
      setUser({ name: user.name, posisi: `(${user.posisi})` });
      setAvatar(user.name.slice(0, 2));
    }
  }, []);

  return (
    <main>
      <div className="bg-gray-500 flex text-neutral-content items-center rounded-full">
        <div className="ms-2 grid grid-cols-1">
          <span className="text-sm text-center capitalize w-full transform scale-75">
            {user.name}
          </span>
          <span className="text-xs text-center capitalize w-full transform scale-75">
            {user.posisi}
          </span>
        </div>
        <div className="avatar placeholder">
          <div className="bg-slate-700 rounded-full w-10 uppercase">
            <span>{avatar}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
