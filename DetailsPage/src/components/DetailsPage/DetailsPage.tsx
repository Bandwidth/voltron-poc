import React, { Suspense, useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Button,
  TextArea,
  useAlerts,
} from "@bw/alloy-react";
const ClassCard = React.lazy(() => import("reactComponents/ClassCard"));

const DetailsPage: React.FC = ({ location, handleBooking }) => {
  const { addAlert } = useAlerts();
  const [workoutClassData, setWorkoutClassData] = useState({});
  const [date, setDate] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    setWorkoutClassData(location?.state?.chosenClass);
    import("lunch_workout_app/WorkoutData").then((module) => {
      const workoutData = module.default;
      console.log("workoutData", workoutData);
      workoutData.subscribe({
        next: (val) => {
          console.log("data received!", val);
          setDate(val.date);
        },
      });
    });
  }, [location?.state, location]);

  const handleSubmit = () => {
    console.log("booking!", workoutClassData);
    import("lunch_workout_app/WorkoutData").then((module) => {
      const workoutData = module.default;
      workoutData.next({ date, participant: name });
      addAlert({
        delay: 5000,
        id: "123",
        children: "This is an alert",
        severity: "success",
        autohide: true,
      });

      console.log("yay");
      handleBooking(workoutClassData);
    });
  };

  return (
    <Row classes="p-4">
      <Typography classes="mb-3" tag="h2">
        Details
      </Typography>

      <Col>
        <Suspense fallback={<div>Loading ClassCard...</div>}>
          <ClassCard
            name={workoutClassData?.name}
            description={workoutClassData?.description}
            image={workoutClassData?.image}
          />
        </Suspense>
        <Typography tag="p" classes="mt-2">
          Offered on {`${workoutClassData?.days}`}
        </Typography>
      </Col>
      <Col>
        {!!date && <Typography tag="h4">{date}</Typography>}

        <Suspense fallback={<div>Loading ClassCard...</div>}>
          <TextArea
            required
            placeholder="Name"
            value={name || ""}
            onClick={() => setName("")}
            onChange={(value) => setName(value)}
          />
        </Suspense>
        <Button
          classes="mt-2"
          type="submit"
          disabled={!name}
          onClick={handleSubmit}
        >
          Book
        </Button>
      </Col>
    </Row>
  );
};

export default DetailsPage;
