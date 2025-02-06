import React, { useState, useEffect } from "react";
import {
  Datepicker,
  Typography,
  Row,
  Col,
  Select,
  Button,
  TextArea,
} from "@bw/alloy-react";
import "@bw/alloy-react";
import "@bw/bw-styles/dist/bwStyles.css";

const QuickBooking = ({ handleBooking }) => {
  const [date, setDate] = useState("");
  const [selectedWorkoutClass, setSelectedWorkoutClass] = useState({
    text: "",
    value: "",
  });
  const [workoutClassData, setWorkoutClassData] = useState<
    { id: string; name: string }[]
  >([]);
  const [name, setName] = useState("");

  useEffect(() => {
    console.log("state!", date);
    import("lunch_workout_app/WorkoutData").then((module) => {
      const workoutData = module.default;
      console.log("workoutData", workoutData);
      // publishes the date into the observable
      workoutData.next(date);
    });

    const day = date?.split(",")[0];
    console.log("day", day);

    fetch(`http://localhost:5555/${date ? `day/${day}` : "data"}`)
      .then((response) => response.json())
      .then((data) => {
        setWorkoutClassData(data);
        import("lunch_workout_app/WorkoutData").then((module) => {
          const workoutData = module.default;
          // publishes the day's classes into the observable
          workoutData.next({ date, classes: data });
        });
      });
  }, [date, setDate]);

  const handleSubmit = () => {
    console.log("selectedWorkoutClass", selectedWorkoutClass);
    import("lunch_workout_app/WorkoutData").then((module) => {
      const workoutData = module.default;
      // publishes the day's classes into the observable
      workoutData.next({
        date,
        classes,
        selectedWorkoutClass: selectedWorkoutClass,
      });
    });
    handleBooking(selectedWorkoutClass);
  };
  return (
    <Row
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Col size={2}>
        <Typography tag="h1" children="Quick Booking" />
      </Col>

      <Col size={3}>
        <Datepicker
          helpText="Select a date"
          format="mm/dd/yyyy"
          inputToggle
          inline
          value={new Date().toLocaleDateString()}
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
      <Col size={3}>
        <Select
          placeholder="Select a class"
          preventFirstSelection={true}
          required
          classes="pt-1"
          data={workoutClassData.map((workoutClass) => ({
            text: workoutClass?.name,
            value: workoutClass.id,
          }))}
          onChange={(value) => {
            setSelectedWorkoutClass(value);
          }}
        />
      </Col>
      <Col size={3}>
        {" "}
        <TextArea
          style={{ maxHeight: "30px" }}
          required
          placeholder="Name"
          value={name || ""}
          onClick={() => setName("")}
          onChange={(value) => setName(value)}
        />
      </Col>
      <Col size={1} classes="d-flex align-items-center">
        <Button
          disabled={!selectedWorkoutClass.value}
          classes="mt-3"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Col>
    </Row>
  );
};

export default QuickBooking;
