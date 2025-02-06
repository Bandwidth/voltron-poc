import React from "react";
import "./ClassCard.scss";
import { Card, CardBody, Typography } from "@bw/alloy-react";

const ClassCard = ({ name, description, image, onClick }) => {
  console.log("image", image);
  return (
    <Card style={{ border: "1px solid black" }} onClick={onClick}>
      <Typography tag="h3" children={name} />
      <CardBody>
        <img
          src={image}
          alt={name}
          width="500"
          height="500"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
        <Typography tag="p" children={description} />
      </CardBody>
    </Card>
  );
};

export default ClassCard;
