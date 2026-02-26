import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
      <nav className="space-y-4">
        <h6 className="footer-title">ChefBazaar</h6>
        <h1>📍 Dhaka, Bangladesh</h1>
        <h2>📞 +880 1234-567890</h2>
        <h2>✉️ support@localchefbazaar.com</h2>
      </nav>
      <nav className="space-y-4">
        <h6 className="footer-title">Working Hours</h6>
        <h1>Saturday – Thursday</h1>
        <h2>9:00 AM – 10:00 PM</h2>
        <h2 className="text-sm text-error">Friday: Closed</h2>
      </nav>
      <nav>
        <h6 className="footer-title">Social</h6>
        <div className="grid grid-flow-col gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="22" 
            height="22" 
            viewBox="0 0 24 24" 
            className="fill-current"
            >
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
            </svg>
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
            </svg>
          </a>
        </div>
        <p className="text-sm mt-15">
          © {new Date().getFullYear()} LocalChefBazaar. All rights reserved.
        </p>
      </nav>
    </footer>
  );
};

export default Footer;
