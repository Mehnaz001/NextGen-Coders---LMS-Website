import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 pt-8 text-center text-gray-500">

      <p className="mb-2">
        © {new Date().getFullYear()} Your Platform Name. All rights reserved.
      </p>

      <p className="text-sm">
        Built with ❤️ for learners and developers.
      </p>

    </footer>
  );
};

export default Footer;