import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";

const ManageBooks = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data));
  }, [])

  //delete a books

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/book/${id}`,{
      method: "DELETE",

    }).then(res => res.json()).then(data => alert("Book is deleted successfully!"),
    //  setAllBooks(data)
  )}

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Manage your Book</h2>

      {/* table for book data */}
      <Table className="lg:w-[1140px]">
        <TableHead>
          <TableRow>
            <TableHeadCell>No.</TableHeadCell>
            <TableHeadCell>Book Name</TableHeadCell>
            <TableHeadCell>Author Name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Prices</TableHeadCell>
            <TableHeadCell>
              <span>Edit or Manage</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        {
          allBooks.map((book, index) =>  <TableBody className="divide-y" key={book._id}>
              <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
               {index + 1}
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.booktitle}
            </TableCell>
            <TableCell>{book.authorName}</TableCell>
            <TableCell>{book.category}</TableCell>
            <TableCell>$10.00</TableCell>
            <TableCell>
              <Link
                to= {`/admin/dashboard/edit-books/${book._id}`}
                className="font-medium text-cyan-600 hover:underline mr-5 dark:text-cyan-500"
              >
                Edit
              </Link>
              <button onClick={() => handleDelete(book._id)} className="bg-red-600 px-4 py-1 font-semibold text-white rounded-sm hover:bg-sky-600">Delete</button>
            </TableCell>
          </TableRow>
          </TableBody>)
        }
      </Table>
    </div>
  );
};

export default ManageBooks;
