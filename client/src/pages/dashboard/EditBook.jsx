import React from 'react'

const handleChange = () => {

}

const handleSubmit = () => {

}

function EditBook() {
    return (
        <div className="contianer bg-grey-900 h-screen w-full ">
          <div className="internal__contianer flex items-center justify-center  h-screen">
            <div className="rightSide__container border ml-42 p-12 min-h-92 min-w-92 shadow-xl">
              <h1 className="text-2xl font-bold text-yellow-400">Edit Book</h1>
    
              <form onSubmit={handleSubmit}>
                <div className="mb-6 mt-12 border-b-2 hover:border-yellow-400 transition-transform ease-in-out">
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0 "
                    type="text"
                    name="title"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="mb-6 border-b-2 flex gap-2 hover:border-yellow-400">
                  <input
                    onChange={handleChange}
                    className=" py-2 pl-1 outline-0"
                    type="text"
                    name="author"
                    placeholder="Author"
                    required
                  />
                  <input
                    onChange={handleChange}
                    className=" py-2 pl-1 outline-0 no__outline"
                    type="Date"
                    name="publication_Year"
                    placeholder="Publication Year"
                    required
                  />
                </div>
                <div className="mb-6 border-b-2 hover:border-yellow-400">
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0"
                    type="Number"
                    name="copies"
                    placeholder="Total Copies"
                    required
                  />
                </div>
                <div className="mb-6 border-b-2 hover:border-yellow-400">
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0"
                    type="Number"
                    name="available_copies"
                    placeholder="Available Copies"
                    required
                  />
                </div>
                <div className="mb-12 border-b-2 hover:border-yellow-400">
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0"
                    type="Number"
                    name="rental_fee"
                    placeholder="Rental Fee Per Day"
                    required
                  />
                </div>
                <div className="mb-12 border-b-2 hover:border-yellow-400">
                  <input
                    onChange={handleChange}
                    className="w-full py-2 pl-1 outline-0"
                    type="Number"
                    name="let_fee"
                    placeholder="Let Fee Per Day Default is 2 Birr"
                  />
                </div>
                <div className="flex item-center justify-center bg-yellow-400 mb-4 p-1 hover:bg-yellow-500">
                  <button type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
}

export default EditBook