import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5; // Number of records per page
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5122/api/posts?page=${currentPage}&pageSize=${pageSize}`);
                setPosts(response.data.data);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]); // Fetch data when `currentPage` changes
   return (
        <div>
            <h2>Paginated Data Fetching</h2>
            {loading ? (
                <p>Loading data...</p>
            ) : (
                <>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Body</th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, index) => (
                                <tr key={index}>
                                    <td>{index + 1 + (currentPage - 1) * pageSize}</td>
                                    <td>{post.title}</td>
                                    <td>{post.body}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div>
                        <button 
                            disabled={currentPage === 1} 
                            onClick={() => setCurrentPage(currentPage - 1)}
                        >
                            Previous
                        </button>
                        <span> Page {currentPage} of {totalPages} </span>
                        <button 
                            disabled={currentPage === totalPages} 
                            onClick={() => setCurrentPage(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default FetchPosts;