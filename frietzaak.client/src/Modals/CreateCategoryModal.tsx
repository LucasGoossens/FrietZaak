function CreateCategoryModal({ onClose }) {

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        fetch("https://localhost:7167/menu/category/create", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: formData.get("name")
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                onClose()
            })
            .catch(error => {
                console.log("Error", error);
            });
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

export default CreateCategoryModal;