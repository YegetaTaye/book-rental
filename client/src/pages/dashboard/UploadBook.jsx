import React from 'react'

const handleChange = () => {

}

const handleSubmit = () => {

}

function UploadBook() {
    return (
        <div className="bg-grey-900 w-full mt-4">
          <div className="flex items-center justify-center">
            <div className="rightSide__container border ml-42 p-12 min-h-92 min-w-92 shadow-xl">
              <h1 className="text-2xl font-bold text-yellow-400">Upload Book</h1>
    
              <form onSubmit={handleSubmit}>
                <div className="mb-6 mt-12 flex">
                <label htmlFor="title" className='text-center mt-2 '>Title: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2'>Author: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="text"
                    name="author"
                    placeholder="Author"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2'>Image: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="file"
                    name="book_img"
                    accept=".jpg, .jpeg, .png" 
                    placeholder="Book Image"
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2 min-w-max'>Publication Year: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="Date"
                    name="publication_Year"
                    placeholder="Publication Year"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2 min-w-max'>Total Copies: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="Number"
                    name="copies"
                    placeholder="Total Copies"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2 min-w-max'>Available Copies: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="Number"
                    name="available_copies"
                    placeholder="Available Copies"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2 min-w-max'>Rental Fee: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="Number"
                    name="rental_fee"
                    placeholder="Rental Fee Per Day"
                    required
                  />
                </div>
                <div className="mb-6 flex">
                <label htmlFor="title" className='text-center mt-2 min-w-max'>Late Fee: </label>
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0  border-b-2  transition-transform ease-in-out ml-4"
                    type="Number"
                    name="let_fee"
                    placeholder="Let Fee Per Day Default is 2 Birr"
                  />
                </div>
                <div className="flex item-center justify-center bg-yellow-400 mb-4 p-1 hover:bg-yellow-500">
                  <button type="submit">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default UploadBook