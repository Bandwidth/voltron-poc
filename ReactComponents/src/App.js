import React from "react";
import { Typography } from "@bw/alloy-react";
import "@bw/bw-styles/dist/bwStyles.css";
import ClassCard from "./components/ClassCard/ClassCard.tsx";

export default function App() {
  return (
    <div>
      <Typography tag="h1">Hey yall</Typography>
      <ClassCard />
    </div>
  );
}
