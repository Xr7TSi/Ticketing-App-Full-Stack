import React from "react";
import { Header } from "./partials/Header.comp";


export const DefaultLayout = ({children}) => {
  return (
    <div className="default-layout">
      <header className="header">
        <Header />
      </header>

      <main className="main">{children}</main>

     
    </div>
  );

}

export default DefaultLayout;
