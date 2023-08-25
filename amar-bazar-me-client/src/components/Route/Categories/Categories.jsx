import React from "react";
import { useNavigate } from "react-router-dom";
import { brandingData, categoriesData } from "../../../static/data";
import styles from "../../../styles/styles";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* branding */}
      <div className={`${styles.section} hidden sm:block`}>
        <div className={`branding my-12 grid grid-cols-2 xl:grid-cols-4 gap-6 w-full shadow-sm bg-white p-5 rounded-md`}>
          {
            brandingData && brandingData.map((i, index) => (
              <div className="flex items-center gap-1" key={index}>
                <span className="text-blue-400">{i.icon}</span>
                <div className="px-3">
                  <h3 className="font-bold text-base md:text-lg">{i.title}</h3>
                  <p className="text-sm md:text-base">{i.Description}</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {/* categories */}
      <div className={`${styles.section} bg-white p-6 rounded-lg mb-12 mt-5`} id="categories" >
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-[10px] lg:grid-cols-4 lg:gap-4 xl:grid-cols-5 xl:gap-6">
          {
            categoriesData &&
            categoriesData.map((i) => {
              const handleSubmit = (category) => {
                navigate(`/products?category=${category.title}`);
              };

              return (
                <div key={i.id}
                  className="w-full h-[100px] flex items-center justify-between cursor-pointer overflow-hidden bg-slate-200 p-3 rounded"
                  onClick={() => handleSubmit(i)}
                >
                  <h5 className={`text-[18px] leading-[1.3]`}>{i.title}</h5>
                  <img
                    src={i.image_Url}
                    className="w-[120px] object-cover"
                    alt="category thumbnail"
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    </>
  );
};

export default Categories;
