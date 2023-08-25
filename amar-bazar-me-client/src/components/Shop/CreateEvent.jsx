import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";

const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [stock, setStock] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate.toISOString.slice(0, 10);
  };

  const handleEndDateChange = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };

  const today = new Date().toISOString().slice(0, 10);

  const minEndDate = startDate ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10) : "";

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      navigate("/dashboard_events");
      window.location.reload();
      toast.success("Event created successfully!");
    }
  }, [dispatch, error, success]);

  const handleImageChange = async (e) => {
    const image = new FormData();
    image.append('image', e.target.files[0]);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_STORAGE_KEY}`;
    const response = await fetch(
      url,
      { method: "post", body: image }
    );
    const imgData = await response.json();
    const imgURL = imgData.data.url.toString();

    setImages((old) => [...old, imgURL]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = new FormData();

    images.forEach((image) => { newForm.append("images", image) });

    const data = {
      name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      images,
      shopId: seller._id,
      start_Date: startDate?.toISOString(),
      Finish_Date: endDate?.toISOString(),
    };

    dispatch(createevent(data));
    navigate("/dashboard_events");
    window.location.reload();
  };

  return (
    <div className="w-[90%] 800px:w-[70%] 1000px:w-[50%] bg-white shadow rounded-md m-8 p-2 overflow-y-scroll">
      <h5 className="text-[30px] text-center mb-3">Create Event</h5>
      {/* create event form */}
      <form onSubmit={handleSubmit} className="space-y-3 px-2">
        <div>
          <label className="pb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your event product name..."
          />
        </div>

        <div>
          <label className="pb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="8"
            type="text"
            name="description"
            value={description}
            className="mt-1 appearance-none block w-full px-3 py-2 h-32 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your event product description..."
          ></textarea>
        </div>

        <div>
          <label className="pb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-1 border h-[40px] rounded-md px-3"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {
              categoriesData && categoriesData.map((i) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))
            }
          </select>
        </div>

        <div>
          <label className="pb-1">Tags</label>
          <input
            type="text"
            name="tags"
            value={tags}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter your event product tags..."
          />
        </div>

        <div>
          <label className="pb-1">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your event product price..."
          />
        </div>

        <div>
          <label className="pb-1">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={discountPrice}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your event product price with discount..."
          />
        </div>

        <div>
          <label className="pb-1">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="price"
            value={stock}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your event product stock..."
          />
        </div>

        <div>
          <label className="pb-1">
            Event Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : ""}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={handleStartDateChange}
            min={today}
            placeholder="Enter your event product stock..."
          />
        </div>

        <div>
          <label className="pb-1">
            Event End Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name="price"
            id="start-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : ""}
            className="mt-1 appearance-none block w-full px-3 h-[40px] border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            onChange={handleEndDateChange}
            min={minEndDate}
            placeholder="Enter your event product stock..."
          />
        </div>

        <div>
          <label className="pb-1">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            multiple
            onChange={handleImageChange}
          />
          <div className="w-full flex items-center flex-wrap">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={28} className="my-3 cursor-pointer" color="#555" />
            </label>
            {
              images && images.map((i) => (
                <img
                  src={i}
                  key={i}
                  alt=""
                  className="h-[120px] w-[120px] object-cover m-2"
                />
              ))
            }
          </div>
          <div>
            <input
              type="submit"
              value="Create"
              className="mt-2 cursor-pointer appearance-none text-center block w-full px-3 h-[40px] border border-gray-300 rounded-md bg-blue-400 hover:bg-blue-500 placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-500 sm:text-sm md:text-base"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
