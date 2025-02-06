import axios from "axios";

const DeleteCourse = ({ isOpen, onClose, onDelete, courseId }) => {
  if (!isOpen || !courseId) return null;

  const handleDelete = () => {
    axios
      .delete(`http://localhost:5000/api/courses/${courseId}`)
      .then(() => {
        onDelete(); // Refresh the course list
        onClose(); 
      })
      .catch((error) => console.error("Error deleting course:", error));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this course?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourse;

