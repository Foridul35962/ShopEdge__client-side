import React, { useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const Carousel = () => {
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // For drag
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    const leftScroll = container.scrollLeft;
    const rightScrollable =
      container.scrollWidth > leftScroll + container.clientWidth;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  };

  // Fetch products
  useEffect(() => {
    const fetchedProduct = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/products/new-arrivals`
      );
      setProducts(res.data.data);
    };
    fetchedProduct();
  }, []);

  // Scroll button update
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollButtons);
    updateScrollButtons();

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
    };
  }, []);

  // 🟢 Mouse Drag Start
  const handleDragStart = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  // 🟢 Mouse Drag Move
  const handleDragMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();

    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // 🟢 Mouse Drag End
  const handleDragEnd = () => {
    isDragging.current = false;
  };

  // 🟢 Touch Support
  const handleTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;

    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;

    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div>
      <div className="flex flex-col gap-1.5 text-center">
        <h1 className="text-3xl font-bold">Explore New Arrivals</h1>
        <h3 className="text-sm">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrabe on the cutting edge of fashion
        </h3>
      </div>

      <div className="text-2xl flex gap-3 justify-end-safe pr-10 py-3">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={
            canScrollLeft
              ? "cursor-pointer hover:scale-105 active:scale-100 transform transition-all duration-300"
              : "text-gray-500 cursor-not-allowed"
          }
        >
          <FaArrowAltCircleLeft />
        </button>

        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={
            canScrollRight
              ? "cursor-pointer hover:scale-105 active:scale-100 transform transition-all duration-300"
              : "text-gray-500 cursor-not-allowed"
          }
        >
          <FaArrowAltCircleRight />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="container mx-auto flex overflow-x-scroll space-x-6 gap-3 py-2 cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {products.map((product, idx) => (
          <div key={idx} className="min-w-full sm:min-w-1/2 lg:min-w-1/3 relative">
            <img
              src={product.images[0].url}
              alt={product.images[0].altText}
              draggable="false"
              className="w-full rounded-lg object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-sm text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`} className="block">
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
