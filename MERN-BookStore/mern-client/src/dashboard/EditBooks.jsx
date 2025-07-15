import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const EditBooks = () => {
   
  const {id} = useParams();
  const {booktitle, authorName, imageURL, category, description, pdfURL} = useLoaderData();

    const bookCategories = [
          "Fiction",
          "Non-Fiction",
          "Comic",
          "Programming",
          "Science",
          "Fantasy",
          "Horror",
          "Bibliograpgy",
          "Autobiography",
          "History",
          "Self-help",
          "Memoir",
          "Business",
          "Children Books",
          "Travel",
          "Religion",
          "Art and Design",
          "Music"
   
          
     ]
   
     const [selectedBookCategory, setSelectedBookCategory] =  useState(bookCategories[0]);
   
     const handleChangeSelectedValue = (event) => {
       // console.log(event.target.value);
            setSelectedBookCategory(event.target.value)
     }
   
     {/* Handle Book Submission */}
       const handleUpdate = (event) => {
             event.preventDefault();
             const form = event.target;
   
             const booktitle = form.booktitle.value;
             const authorName = form.authorName.value;
             const imageURL = form.imageURL.valuel
             const category = form.category.value;
             const description = form.description.value;
             const pdfURL = form.pdfURL.value;
             
             const updatebookObj = {
               booktitle, authorName, imageURL, category, description, pdfURL
             }
                 
             //update book data
             fetch(`http://localhost:5000/book/${id}`,{
              method: "PATCH",
              headers: {
                "Content-Type" : "application/json"
              },
              body: JSON.stringify(updatebookObj)
             }).then(res => res.json()).then(data => {
             alert("Book is updated successfully!!!");
            
          })
       }
   
     return (
       <div className="px-4 my-12">
         <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
   
         <form onSubmit={handleUpdate} className="flex lg:w-[1150px] flex-col flex-wrap gap-4">
          <div className="flex gap-8">
               <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="booktitle">Book Title</Label>
             </div>
             <TextInput
               id="booktitle"
               type="text"
               name="booktitle"
               placeholder="Book name"
               required
               defaultValue={booktitle}
             />
           </div>
   
           {/* author Name */}
            <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="authorName">Author Name</Label>
             </div>
             <TextInput
               id="authorName"
               type="text"
               name="authorName"
               placeholder="Author Name"
               required
               defaultValue={authorName}
             />
           </div>
          </div> 
     
           {/* 2nd Row */}
           <div className="flex gap-8">
            <div className="lg:w-1/2">
             <div className="mb-2 block">
               <Label htmlFor="imageURL">Book Image URL</Label>
             </div>
             <TextInput
               id="imageURL"
               type="text"
               name="imageURL"
               placeholder="Book image URL"
               required
               defaultValue={imageURL}
             />
           </div>
             
             {/* Category */}
             <div className="lg:w-1/2">
                 <div className="mb-2 block">
               <Label htmlFor="inputState">Book Category</Label>
             </div>
              
              <Select id="inputState" name="category" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {
               bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
              }
                
              </Select>
   
           </div>
           </div> 
   
           {/* bookDescription */} 
           <div>
             <div className="mb-2 block">
              <Label htmlFor="description">Book Description</Label>
             </div>
                 <Textarea id="description" placeholder="Write your book description..." required rows={4} 
                   className="w-full"
                   defaultValue={description}
                 />
           </div>
   
           {/* book pdf link */}
            <div>
           <div className="mb-2 block">
             <Label htmlFor="pdfURL"> Book PDF URL</Label>
           </div>
           <TextInput id="pdfURL" type="text" placeholder="book pdf url" required shadow defaultValue={pdfURL} />
         </div>
   
          <Button type="submit" className="mt-5">Update Book</Button>
   
         </form>
       </div>
     );
}

export default EditBooks
