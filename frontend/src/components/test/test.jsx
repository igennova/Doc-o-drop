import React from "react";


/* Don't forget to download the CSS file too 
OR remove the following line if you're already using Tailwind */



export const MyPlugin = () => {
  return (
    <div id="webcrumbs"> 
                	<div className="min-h-screen bg-black text-primary-50 rounded-lg shadow-md p-6">  <div className="max-w-[1280px] mx-auto">
    	    <header className="flex flex-wrap justify-between items-center mb-6">
    	      <div className="flex items-center space-x-4">
    	        <h1 className="font-title text-2xl text-lime-500">SHARGE</h1>
    	        <nav className="hidden sm:flex space-x-4 text-neutral-200">
    	          <a href="#" className="hover:text-primary-50">POWER BANKS</a>
    	          <a href="#" className="hover:text-primary-50">CHARGERS</a>
    	          <a href="#" className="hover:text-primary-50">SHARGE DISK</a>
    	          <a href="#" className="hover:text-primary-50">CABLES</a>
    	          <a href="#" className="hover:text-primary-50">ACCESSORIES</a>
    	          <a href="#" className="hover:text-primary-50">TRACK ORDER</a>
    	        </nav>
    	      </div>
    	      <div className="flex items-center space-x-4">
    	        <i className="material-symbols-outlined text-2xl">search</i>
    	        <i className="material-symbols-outlined text-2xl">person</i>
    	      </div>
    	    </header>
    	    <div className="flex flex-wrap lg:flex-nowrap gap-6">
    	      <div className="basis-full lg:basis-1/2 flex flex-col items-center space-y-4">
    	        <img
    	          src="https://tools-api.webcrumbs.org/image-placeholder/300/300/products/1"
    	          alt="product"
    	          className="w-[300px] h-[300px] object-contain"
    	        />
    	        <div className="flex space-x-4">
    	          <img
    	            src="https://tools-api.webcrumbs.org/image-placeholder/80/80/products/2"
    	            alt="thumbnail"
    	            className="w-[80px] h-[80px] object-contain rounded-md"
    	          />
    	          <img
    	            src="https://tools-api.webcrumbs.org/image-placeholder/80/80/products/3"
    	            alt="thumbnail"
    	            className="w-[80px] h-[80px] object-contain rounded-md"
    	          />
    	          <img
    	            src="https://tools-api.webcrumbs.org/image-placeholder/80/80/products/4"
    	            alt="thumbnail"
    	            className="w-[80px] h-[80px] object-contain rounded-md"
    	          />
    	        </div>
    	      </div>
    	
    	      <div className="w-full lg:basis-1/2 p-6 space-y-6 flex flex-col">
    	        <h1 className="font-title text-4xl">100W Pro</h1>
    	        <div className="text-lg">
    	          <span className="font-semibold">Rs. 3,999.00 </span>
    	          <span className="line-through text-neutral-500">Rs. 4,999.00</span>
    	          <span className="ml-2 text-lime-500 bg-neutral-800 px-2 py-1 rounded-md">Save 20%</span>
    	        </div>
    	        <p className="text-sm text-neutral-300 flex items-center">
    	          <i className="material-symbols-outlined text-lime-500 mr-1">verified</i>
    	          PayPal Buy now, pay later.
    	        </p>
    	        <ul className="text-sm list-disc pl-4 text-neutral-200 space-y-1">
    	          <li>100W max output.</li>
    	          <li>Travel-friendly design.</li>
    	          <li>3C1A outputs.</li>
    	          <li>Multiple-device compatibility.</li>
    	        </ul>
    	        <p className="text-neutral-400 text-sm">Delivery within 6 to 8 Business Days.</p>
    	        <div className="flex items-center space-x-4">
    	          <p className="text-neutral-300 text-sm">Quantity:</p>
    	          <div className="flex items-center space-x-2">
    	            <button className="w-[40px] h-[40px] bg-neutral-800 text-primary-50 rounded-md">-</button>
    	            <span className="text-neutral-50">1</span>
    	            <button className="w-[40px] h-[40px] bg-neutral-800 text-primary-50 rounded-md">+</button>
    	          </div>
    	        </div>
    	        <div className="flex flex-wrap gap-4">
    	          <button className="flex-1 bg-white text-primary-950 rounded-md h-[50px]">
    	            Add to cart
    	          </button>
    	          <button className="flex-1 bg-lime-500 text-neutral-950 rounded-md h-[50px]">
    	            Buy it now
    	          </button>
    	        </div>
    	        <div className="flex flex-wrap gap-8 text-sm text-neutral-400 border-t border-neutral-700 pt-4 mt-4">
    	          <div className="flex items-center space-x-2">
    	            <i className="material-symbols-outlined text-lg">support</i>
    	            <span>Lifetime Customer Support</span>
    	          </div>
    	          <div className="flex items-center space-x-2">
    	            <i className="material-symbols-outlined text-lg">verified</i>
    	            <span>12-month warranty</span>
    	          </div>
    	        </div>
    	      </div>
    	    </div>
    	  </div>
    	</div> 
                </div>
  )
}

