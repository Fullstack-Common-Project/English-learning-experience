"use client";

import { FaGamepad, FaGithub } from "react-icons/fa"; 

export default function Footer() {
    const developers = [
        { name: "Sara Kahana", url: "/games/sara-kahana" },
        { name: "Yael Bloch", url: "/games/yael-bloch" },
        { name: "Michal Segal", url: "/games/michal-segal" },
        { name: "Tamar Vurtzel", url: "/games/tamar-vurtzel" },
        { name: "Abigail Berk", url: "/games/abigail-berk" },
        { name: "Shifra Strul", url: "/games/shifra-strul" },
        { name: "Rivka Merchavy", url: "/games/rivka-merchavy" },
        { name: "Miriam Rosenberg", url: "/games/miriam-rosenberg" },
        { name: "Rivka Maman", url: "/games/rivka-maman" },
        { name: "Shira Shtiglitz", url: "/games/shira-shtiglitz" },
        { name: "Hadar Gerashi", url: "/games/hadar-gerashi" },
        { name: "Avital Goldring", url: "/games/avital-goldring" },
        { name: "Dvora Etinger", url: "/games/dvora-etinger" },
        { name: "Shani Gavra", url: "/games/shani-gavra" },
        { name: "Yafa Werthaimer", url: "/games/yafa-werthaimer" },
        { name: "Shira Lezarovitz", url: "/games/shira-lezarovitz" },
      ];

  return (
    <footer className="footer">

      <div className="footer__container">
        <h2 className="footer__title"> Project Developers
          <a
          href="https://github.com/Fullstack-Common-Project/English-learning-experience"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-white transition text-2xl"><FaGithub />
          </a>
        </h2>

        <div className="footer__developers">
          {developers.map((dev) => (
            <a
            key={dev.name}
            href={dev.url}
            className="text-sm hover:text-white transition">
      {dev.name}
      </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
