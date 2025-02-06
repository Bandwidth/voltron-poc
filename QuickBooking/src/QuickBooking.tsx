import React, { useState, useEffect } from "react";
import { Datepicker, Typography, Button, Row, Col } from "@bw/alloy-react";
import "@bw/alloy-react";
import "@bw/bw-styles/dist/bwStyles.css";

const QuickBooking = () => {
  const [date, setDate] = useState();

  useEffect(() => {
    console.log("state!", date);
    import("app/WorkoutData").then((module) => {
      const workoutData = module.default;
      console.log("workoutData", workoutData);
      // publishes the date into the observable
      workoutData.next(date);
    });
  }, [date, setDate]);
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Col size={6}>
        <Typography tag="h1" children="Quick Booking" />
        {!!date && <Typography>{date}</Typography>}
      </Col>

      <Col size={4}>
        <Datepicker
          helpText="Select a date"
          format="mm/dd/yyyy"
          inputToggle
          inline
          defaultValue={new Date()}
          onChange={(value) => {
            const newDate = new Date(value).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });
            setDate(newDate);
          }}
          setValueAs={"string"}
        />
      </Col>
      <Col size={2} style={{ display: "flex", alignItems: "center" }}></Col>
    </Row>
  );
};

export default QuickBooking;
