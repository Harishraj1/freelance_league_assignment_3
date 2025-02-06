import { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateCourse = ({ isOpen, onClose, onUpdate, course }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [FormData, setFormData] = useState("");

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title || "",
        description: course.description || "",
        instructor: course.instructor || "",
        duration: course.duration || "",
        category: course.category || "",
      });
    }
  }, [course]);

  if (!isOpen || !course) return null;

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    instructor: Yup.string().required("Instructor name is required"),
    duration: Yup.string().required("Duration is required"),
    category: Yup.string().required("Category is required"),
  });

  const handleUpdate = (values) => {
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/api/courses/${course._id}`, values)
      .then(() => {
        onUpdate();  // Refresh course list
        onClose();   // Close modal
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error updating course:", error);
        setIsLoading(false);
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Update Course</h2>
        <Formik
          initialValues={{
            title: course.title,
            description: course.description,
            instructor: course.instructor,
            duration: course.duration,
            category: course.category,
          }}
          validationSchema={validationSchema}
          onSubmit={handleUpdate}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-2">
                <label className="block text-sm font-medium">Course Title</label>
                <Field name="title" className="w-full p-2 border rounded" />
                <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Description</label>
                <Field name="description" as="textarea" className="w-full p-2 border rounded" />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Instructor</label>
                <Field name="instructor" className="w-full p-2 border rounded" />
                <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Duration</label>
                <Field name="duration" className="w-full p-2 border rounded" />
                <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium">Category</label>
                <Field name="category" className="w-full p-2 border rounded" />
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={isSubmitting || isLoading}>
                  {isLoading ? "Updating..." : "Update Course"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateCourse;


