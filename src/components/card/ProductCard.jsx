

export default function ProductCard({ data }) {
  return (
    <div className="w-100 bg-gray-300 rounded-lg shadow-2xl p-5 flex flex-col gap-1.5 transition-all duration-300 ease-in hover:scale-105 ">
      {data?.images && (
        <img className="bg-gray-100 rounded-t-lg" src={data?.images} alt="" />
      )}
      <div className="font-bold italic underline">{data?.title}</div>
      <div className="text-md ">{data?.description}</div>

      <div className="flex flex-row gap-3 justify-center">
        <div className=""> Price: ${data?.price}</div>
        <div className=""> Quantity: {data?.stock}</div>
        <div className="">Discount: %{data?.discountPercentage}</div>
      </div>
      <div className="flex flex-row gap-3 justify-center">
        <div className=""> Category: {data?.category}</div>
        <div className=""> Brand: {data?.brand}</div>
      </div>

      <button
        className="bg-gray-300 p-2 w-full rounded-lg transition-all duration-300 ease-in cursor-pointer hover:scale-105 border-2 border-dashed border-blue-400 hover:bg-gray-200"
        onClick={() => data?.btnAddToCard?.(data)}
      >
        Product Detail
      </button>
    </div>
  );
}
