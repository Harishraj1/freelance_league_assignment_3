// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // MongoDB Atlas Connection
// const mongoURI = "mongodb+srv://harish:123@cluster0.xa5qtja.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("Connected to MongoDB Atlas"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Course Schema & Model
// const courseSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   instructor: String,
//   duration: String,
//   category: String,
// });
// const Course = mongoose.model("Course", courseSchema);

// // API Routes

// // Get all courses
// app.get("/api/courses", async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching courses" });
//   }
// });

// // Add a new course
// app.post("/api/courses", async (req, res) => {
//   try {
//     const newCourse = new Course(req.body);
//     await newCourse.save();
//     res.status(201).json(newCourse);
//   } catch (error) {
//     res.status(500).json({ error: "Error adding course" });
//   }
// });

// // Update a course
// app.put("/api/courses/:id", async (req, res) => {
//   try {
//     const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedCourse) return res.status(404).json({ error: "Course not found" });
//     res.json(updatedCourse);
//   } catch (error) {
//     res.status(500).json({ error: "Error updating course" });
//   }
// });

// // Delete a course
// app.delete("/api/courses/:id", async (req, res) => {
//   try {
//     const deletedCourse = await Course.findByIdAndDelete(req.params.id);
//     if (!deletedCourse) return res.status(404).json({ error: "Course not found" });
//     res.json({ message: "Course deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Error deleting course" });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/courses", courseRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
