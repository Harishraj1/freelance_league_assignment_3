import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const AddCourse = ({ isOpen, onClose, onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-1/3 h-auto max-h-screen overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <Formik
          initialValues={{
            title: "",
            description: "",
            instructor: "",
            duration: "",
            category: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is required"),
            description: Yup.string().required("Description is required"),
            instructor: Yup.string().required("Instructor name is required"),
            duration: Yup.string().required("Duration is required"),
            category: Yup.string().required("Category is required"),
          })}
          onSubmit={(values, { resetForm }) => {
            setIsLoading(true);
            axios.post("http://localhost:5000/api/courses", values)
              .then(() => {
                onClose();
                resetForm();
                setIsLoading(false);
                window.location.reload();
              })
              .catch(() => setIsLoading(false));
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field name="title" className="w-full p-2 border rounded mb-2" placeholder="Title" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mb-2" />

              <Field name="description" as="textarea" className="w-full p-2 border rounded mb-2" placeholder="Description" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm mb-2" />

              <Field name="instructor" className="w-full p-2 border rounded mb-2" placeholder="Instructor" />
              <ErrorMessage name="instructor" component="div" className="text-red-500 text-sm mb-2" />

              <Field name="duration" className="w-full p-2 border rounded mb-2" placeholder="Duration" />
              <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mb-2" />

              <Field name="category" className="w-full p-2 border rounded mb-2" placeholder="Category" />
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm mb-2" />

              <button type="submit" className="bg-blue-600 text-white p-2 rounded mt-4" disabled={isSubmitting || isLoading}>
                {isLoading ? "Adding..." : "Add Course"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCourse;
