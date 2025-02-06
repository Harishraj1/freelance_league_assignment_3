import { useState, useEffect } from "react";
import axios from "axios";
import AddCourse from "../components/AddCourse";
import UpdateCourse from "../components/UpdateCourse";
import DeleteCourse from "../components/DeleteCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo,faGear, faEllipsisH, faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState({});
    const [currentPage, setCurrentPage] = useState(1); 
    const [rowsPerPage, setRowsPerPage] = useState(10); 

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = () => {
        axios.get("http://localhost:5000/api/courses")
            .then((res) => setCourses(res.data))
            .catch((error) => console.error("Error fetching courses:", error));
    };

    const handleDelete = (courseId) => {
        setSelectedCourse(courseId);
        setIsDeleteOpen(true);
        setDropdownOpen({}); // Close dropdowns
    };

    const handleUpdate = (course) => {
        setSelectedCourse(course);
        setIsUpdateOpen(true);
        setDropdownOpen({}); // Close dropdowns
    };

    const toggleDropdown = (courseId) => {
        setDropdownOpen(prevState => ({
            ...prevState,
            [courseId]: !prevState[courseId]
        }));
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }; 

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(event.target.value);
    };

    const getVisibleCourses = () => {
        const start = (currentPage - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return courses.slice(start, end);
    }; 

    return (
        <div className="container mx-auto p-6">
            <nav className="border-b-2 flex justify-between mx-4 px-4 py-4">
                <div className="flex gap-4 items-center">
                    <p className="text-gray-500">All Users: <span className="text-black font-semibold">1,356,546</span></p>
                    <p className="text-gray-500">Projects: <span className="text-black font-semibold">884</span></p>
                    <p className="text-white text-xs font-semibold border rounded-full bg-gray-400 px-2 py-0.5">
                        <FontAwesomeIcon icon={faInfo} />
                    </p>
                </div>
                <div>
                    <p className="border-2 px-2 py-1 rounded-md"><FontAwesomeIcon icon={faGear} className="px-1" /> Table settings</p>
                </div>
            </nav>
            <div className="px-8 py-4">
                <button onClick={() => {
                    setIsAddOpen(true);
                    setDropdownOpen({}); // Close all dropdowns when add course button is clicked
                }} className="bg-blue-800 text-white px-4 py-2 border rounded-md">
                    + Add new course
                </button>
            </div>

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Title</th>
                        <th className="border p-2">Description</th>
                        <th className="border p-2">Instructor</th>
                        <th className="border p-2">Duration</th>
                        <th className="border p-2">Category</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {getVisibleCourses().map((course) => (
                        <tr key={course._id} className="border">
                            <td className="border p-2">{course.title}</td>
                            <td className="border p-2">{course.description}</td>
                            <td className="border p-2">{course.instructor}</td>
                            <td className="border p-2">{course.duration}</td>
                            <td className="border p-2">{course.category}</td>
                            <td className="border p-2">
                                <div className="relative inline-block text-left">
                                    <div>
                                        <button type="button" className="inline-flex justify-center w-full px-4 py-2 bg-white text-sm font-medium text-gray-700" id="options-menu" aria-expanded="true" aria-haspopup="true" onClick={() => toggleDropdown(course._id)}>
                                            <FontAwesomeIcon icon={faEllipsisH} />
                                        </button>
                                    </div>
                                    {dropdownOpen[course._id] && (
                                        <div className="origin-top-right absolute right-0 mt-2 w-56 z-10 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <div className="py-1" role="none">
                                                <button onClick={() => handleUpdate(course)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Update</button>
                                                <button onClick={() => handleDelete(course._id)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" role="menuitem">Delete</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* pagination */}
            <div className="flex justify-between items-center w-[87%] fixed bottom-0 bg-white p-4">
                <div className="flex items-center">
                    <label htmlFor="rowsPerPage" className="font-medium text-gray-700">Rows per page</label>
                    <select
                        id="rowsPerPage"
                        name="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="ml-2 pl-3 pr-2 py-2 border rounded-md border-gray-300 focus:outline-none focus:bg-gray-100"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                    </select>
                </div>
                <div>
                    <nav aria-label="Pagination">
                        <ul className="inline-flex items-center">
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-2 border-2 rounded-md hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faAngleLeft} />
                                </button>
                            </li>
                            <li>
                                <span className="px-3 py-2 border-2 rounded-md rounded">
                                    {currentPage} of {Math.ceil(courses.length / rowsPerPage)}
                                </span>
                            </li>
                            <li>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === Math.ceil(courses.length / rowsPerPage)}
                                    className="px-3 py-2 border-2 rounded-md hover:bg-gray-100"
                                >
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <AddCourse isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} onSubmit={fetchCourses} />
            <UpdateCourse isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} onUpdate={fetchCourses} course={selectedCourse} />
            <DeleteCourse isOpen={isDeleteOpen} onClose={() => setIsDeleteOpen(false)} onDelete={fetchCourses} courseId={selectedCourse} />
        </div>
    );
};

export default CoursesPage;