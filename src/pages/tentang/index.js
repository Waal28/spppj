import React from "react";
import ParentComp from "../../components/ParentComp";

export default function Tentang() {
  return (
    <ParentComp>
      <div className="lg:w-1/2 md:w-1/2 sm:w-1.2 w-full mx-auto">
        <h1 className="text-center font-serif text-2xl">SPPPJ</h1>
        <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
        <p className="text-justify mt-6">
          Ini adalah <span className="text-red-600">S</span>istem{" "}
          <span className="text-red-600">P</span>emesanan dan{" "}
          <span className="text-red-600">P</span>enentuan{" "}
          <span className="text-red-600">P</span>enanggung{" "}
          <span className="text-red-600">J</span>awab sarapan dan makan siang.
          Sistem ini dibuat berdasarkan keluh kesah seorang PJ dan peserta yang
          merasa sistem pemesanan sarapan dan makan siang secara manual tidak
          termanage dengan baik. Oleh karena itu dengan pembuatan sistem
          diharapkan PJ dan peserta bisa memanajemen pemesanan sarapan dan makan
          siang dengan lebih baik lagi. Sistem ini dibuat oleh programmer magang
          msib batch 5 Garuda Cyber Indonesia.
        </p>
      </div>
    </ParentComp>
  );
}
