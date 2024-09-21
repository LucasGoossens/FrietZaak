function UpdateMenuItemModal({ onClose, id, name, description, price }) {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch(`https://localhost:7167/menu/item/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                name: formData.get("name"),
                description: formData.get("description"),
                price: formData.get("price")
            })
        })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));

    }


    return (

        <>
            <div onClick={onClose} className="fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-black/70 ">
                <div onClick={(e) => e.stopPropagation()} className="fixed w-1/3 h-1/2 bg-slate-100 shadow-lg rounded text-black z-50">
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                defaultValue={name}
                                className="mt-1 block w-full p-2 border border-black rounded-md shadow-sm bg-slate-300"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                defaultValue={description}
                                className="mt-1 block w-full p-2 border border-black rounded-md shadow-sm bg-slate-300"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                defaultValue={price}
                                className="mt-1 block w-full p-2 border border-black rounded-md shadow-sm bg-slate-300"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateMenuItemModal;