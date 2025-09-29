import { Github, Instagram, Facebook, Linkedin } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-20 bg-black w-full">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Link to="/" className="mb-6 text-white text-4xl">
              Primart
              <span className="text-red-500">.</span>
            </Link>
            <p className="mb-6 body-text text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
              eaque cumque, deleniti suscipit, quae deserunt ullam similique nam
              hic totam blanditiis accusantium libero amet ad. Necessitatibus
              rerum minima maxime, quibusdam numquam odit excepturi animi hic,
              veritatis dignissimos quis vel eaque adipisci a nobis fuga
              doloribus corrupti, praesentium pariatur amet. Velit?
            </p>
            <ul className="flex mb-4 gap-2">
              <li>
                <Link>
                  <Facebook />
                </Link>
              </li>
              <li>
                <Link>
                  <Linkedin />
                </Link>
              </li>
              <li>
                <Link>
                  <Instagram />
                </Link>
              </li>
              <li>
                <Link>
                  <Github />
                </Link>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-4 gap-4 col-span-8">
            <ul className="mt-14">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul className="mt-14">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul className="mt-14">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
            <ul className="mt-14">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-5 text-sm">
          <p className="text-center text-gray-300">
            Copyright @ 2025. All Rights Reserved. -
            <a
              href="https://aayushdobriyal.vercel.app"
              className="text-red-500"
            >
              {" "}
              Aayush Dobriyal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
