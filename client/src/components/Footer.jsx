import { Github, Instagram, Facebook, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="pt-20 bg-black w-full">
      <div className="container">
        <div className="grid grid-cols-12 gap-6 mb-10">
          <div className="col-span-12 lg:col-span-4">
            <Link to="/" className="mb-6 text-white text-2xl md:text-4xl">
              Primart
              <span className="text-red-500">.</span>
            </Link>
            <p className="mb-6 body-text text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Mollitia
              eaque cumque, deleniti suscipit, quae deserunt ullam similique nam
              hic totam blanditiis accusantium libero amet ad. Necessitatibus
              rerum minima maxime, quibusdam numquam odit excepturi animi hic,
              veritatis dignissimos quis vel eaque adipisci a nobis fuga
              doloribus corrupti, praesentium pariatur amet. Velit?
            </p>
            <ul className="flex mb-4 gap-2">
              <li>
                <a target="_blank" href="https://www.facebook.com">
                  <Facebook />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://in.linkedin.com">
                  <Linkedin />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://www.instagram.com">
                  <Instagram />
                </a>
              </li>
              <li>
                <a target="_blank" href="https://github.com">
                  <Github />
                </a>
              </li>
            </ul>
          </div>
          <div className="grid grid-cols-12 gap-4 col-span-12 lg:col-span-8">
            <ul className="lg:mt-14 col-span-6 md:col-span-3">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
            <ul className="lg:mt-14 col-span-6 md:col-span-3">
              <li>
                <Link to="/promotions">Promotions</Link>
              </li>
              <li>
                <Link to="/partners">partners</Link>
              </li>
              <li>
                <Link to="/career">Careers</Link>
              </li>
              <li>
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
            <ul className="mt-2 lg:mt-14 col-span-6 md:col-span-3">
              <li>
                <Link to="/browse?category=electronic">Electronic</Link>
              </li>
              <li>
                <Link to="/browse?category=furniture">Furniture</Link>
              </li>
              <li>
                <Link to="/browse?category=lamp">Lamp</Link>
              </li>
              <li>
                <Link to="/browse?category=skin-care">Skin Care</Link>
              </li>
            </ul>
            <ul className="mt-2 lg:mt-14 col-span-6 md:col-span-3">
              <li>
                <Link to="/terms">Terms</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy</Link>
              </li>
              <li>
                <Link to="/accesibility">Accesibility</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="py-5">
          <p className="text-center text-gray-400 text-sm tracking-wider">
            Copyright @ 2025. All Rights Reserved. -
            <a
              href="https://aayushdobriyal.vercel.app"
              className="text-red-500 ml-1"
            >
              Aayush Dobriyal
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
