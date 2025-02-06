import React from "react";
import DetailsPage from "./components/DetailsPage/DetailsPage.tsx";
import "@bw/bw-styles/dist/bwStyles.css";
import { useLocation } from "react-router-dom";

export default function App() {
  const location = useLocation();

  return (
    <div>
      <DetailsPage location={location} />
    </div>
  );
}
