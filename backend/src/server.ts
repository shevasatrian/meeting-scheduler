import express from "express";
import cors from "cors";
import { settingsRouter } from "./routes/settings"; 
import { bookingsRouter } from "./routes/bookings"; 
import { slotsRouter } from "./routes/slots"; 

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/settings", settingsRouter);
app.use("/api/bookings", bookingsRouter);
app.use("/api/slots", slotsRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
