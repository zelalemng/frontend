import React from "react";
// import Footer from "../footer/Footer";
import Header from "../Header";
import FloatingShape from "../FloatingShape";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {/* Main Content */}
      <div className="min-h-screen p-2 md:px-6 lg:px-6 flex flex-col bg-opacity-30 items-center bg-gradient-to-br
        from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden">
        <FloatingShape color='bg-green-500' size='w-64 h-64' top='-5%' left='10%' delay={0} />
			  <FloatingShape color='bg-emerald-500' size='w-48 h-48' top='70%' left='80%' delay={5} />
			  <FloatingShape color='bg-lime-500' size='w-32 h-32' top='40%' left='-10%' delay={2} />
        <div className="w-full max-w-6xl">
          {children}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
