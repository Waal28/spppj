import React from "react";
import ParentComp from "../../components/ParentComp";
import CardUser from "../../components/CardUser";
import iwal from "../../img/iwal2.jpg";

export default function Tentang() {
  const user = {
    nama: "Wal Husna Faizul",
    img: iwal,
    developer: "Frontend",
    portfolio: "https://portfolio-wal-husna-faizul.vercel.app",
  };
  return (
    <ParentComp>
      <div className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <section>
          <h1 className="text-center font-serif text-2xl">Tentang</h1>
          <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
          <main className="text-justify mt-6">
            <div className="text-5xl mb-1 me-6 w-fit float-left font-serif">
              SPPPJ
            </div>
            <p className="text-sm">
              <span className="text-red-600 text-lg">S</span>istem{" "}
              <span className="text-red-600 text-lg">P</span>emesanan dan{" "}
              <span className="text-red-600 text-lg">P</span>enentuan{" "}
              <span className="text-red-600 text-lg">P</span>enanggung{" "}
              <span className="text-red-600 text-lg">J</span>awab sarapan dan
              makan siang. Sistem ini dibuat berdasarkan keluh kesah seorang PJ
              dan peserta yang merasa sistem pemesanan sarapan dan makan siang
              secara manual tidak termanage dengan baik. Oleh karena itu dengan
              pembuatan sistem diharapkan PJ dan peserta bisa memanajemen
              pemesanan sarapan dan makan siang dengan lebih baik lagi. Sistem
              ini dibuat oleh programmer msib batch 5 Garuda Cyber Indonesia.
            </p>
          </main>
        </section>
        <section className="mt-10">
          <h1 className="text-center font-serif text-2xl">Developer</h1>
          <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
          <main className="grid grid-cols-1">
            <CardUser user={user} />
          </main>
        </section>
      </div>
    </ParentComp>
  );
}
