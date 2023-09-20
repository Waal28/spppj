import React from "react";
import ParentComp from "../../components/ParentComp";
import CardUser from "../../components/CardUser";
import iwal from "../../img/iwal2.jpg";
import ferdie from "../../img/ferdie.jpeg";

export default function Tentang() {
  const users = [
    {
      id: 1,
      nama: "Wal Husna Faizul",
      img: iwal,
      developer: "Frontend",
      wa: "https://wa.me/+6282272693608",
      github: "https://github.com/Waal28",
    },
    {
      id: 2,
      nama: "Ferdie Maulana",
      img: ferdie,
      developer: "Backend",
      wa: "https://wa.me/+6285278145715",
      github: "https://github.com/Ferdie12",
    },
  ];
  return (
    <ParentComp>
      <div className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <section>
          <h1 className="text-center font-serif text-2xl">Tentang</h1>
          <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
          <main className="text-justify mt-6">
            <div className="text-5xl mb-1 me-6 w-fit float-left font-serif">
              S
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-11 -mx-3 -mt-2.5 inline"
                viewBox="0 0 512 512"
              >
                <path
                  d="M270.2 148.9c0 .1-.1.1 0 0v.1-.1z"
                  fill="currentColor"
                />
                <path
                  d="M320 166c0-43.2-15-93.2-24-133.7V32h-8l-.2 116.9c0 6.1-2.9 11.1-9 11.1-5.7 0-8-4.3-8.6-9.9-.1-.4 0-.8 0-1.2L259.9 32h-8l-9 117-.1 1.1c-.6 5.6-3.7 9.9-9.5 9.9-6.1 0-9.1-5-9.1-11.1L223.8 32h-8C207 73 192 122.9 192 166.1c0 25.7 14.6 48.1 36.7 58.2 11.2 5.1 11.3 10.3 11.3 10.3s-16 201.7-16 213.1c0 11.4 4 18.5 9.5 24s14.2 8.2 22.4 8.2h.4c8.2 0 16.8-2.7 22.4-8.2 5.5-5.5 9.3-10.9 9.3-24s-16-213.1-16-213.1-1-5 11.4-10.6c21.6-9.8 36.6-32.2 36.6-58z"
                  fill="currentColor"
                />
              </svg>
              PJ
            </div>
            <p className="text-sm">
              <span className="text-red-600 text-lg">SI</span>stem{" "}
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
          <main className="grid grid-cols-1 gap-4 mt-6">
            {users.map((user) => (
              <CardUser user={user} key={user.id} />
            ))}
          </main>
        </section>
      </div>
    </ParentComp>
  );
}
