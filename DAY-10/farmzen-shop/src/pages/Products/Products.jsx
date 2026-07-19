import React, { useState, useEffect } from "react";
import "./Products.css";
import { useParams } from "react-router-dom";


/* ✅ PRODUCTS DATA */
export const productsData = [
  { id: 1, name: "Tomato", price: 30, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1x9wphnYwygSq0BbZ2L-paSIgsVJJFvOpqPNX7r9fPjYrzbj77GlfVpWnDNSqEwlnLIQjRhuk7dQ-5EPTd8wghS3w1Dxt1SA17_04dA&s=10" },
  { id: 2, name: "Potato", price: 25, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSITZ4BrOv-V1T_Yl8EJEB3bGIXGnJ0kOEGbqvOwbaMd2QCSGbNSFD2Hd2hARWSgi3HCG9VQiSHfF-8Q70m9LyDZJ-jqAappGlNOMrpNQ&s=10" },
  { id: 3, name: "Onion", price: 35, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbc2tayt4wqIMD1jS7qWhWOLkfTtbl0tt_bx_t-z2mcb90lTqg" },
  { id: 4, name: "Carrot", price: 40, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXL4Zy2F6MCTUIrh7fp448R6bKdHBk_SFgy1Xyycz8_f_PX2uHKnlMZch7jI0XDhG4Gj_jtmAR0RgJDrcevOLH_Db7TqDRUD91M9UcwA&s=10" },
  { id: 5, name: "Cabbage", price: 45, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh7U7B2DmMYhJquDv78c3y1Fbe2nUwRrg7OS6Ywc8f6r6oSK066qRXID9a2SFM4oBRRANi4DdaJwEwYR-e1RYD0yhV85ZAw3uwhZ0Qiw&s=10" },
  { id: 6, name: "Spinach", price: 20, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG_kyh8yGv-OUUD9ZtSrx8tEpwuzB9nei8bhp7BbaYDbI6GTigOMJi3A2nQL-t-5LglRadhfX2_bUYfcfOJLhuTfD9s6BQjgjoxFeLs-M&s=10" },
  { id: 7, name: "Cauliflower", price: 50, category: "Vegetables", image: "https://m.media-amazon.com/images/I/91EdPVzD99L.jpg" },
  { id: 8, name: "Broccoli", price: 80, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAJ2TpARDEJSQFrTZIPVNyXFK4_ibGwYPp_J5W3FzQfQ&s=10" },
  { id: 9, name: "Capsicum", price: 60, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHoGXvCWVt_meLvtp3jVAwk0evBdKpfyyy26Y_LpgyKA&s=10" },
  { id: 10, name: "Beetroot", price: 30, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuIfqH9mWUo_z3Ijx9zGwFzbnIfLfqnTv3bWPlcNNPRw&s=10" },
  { id: 11, name: "Brinjal", price: 35, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0XgZZbHbW1oQJK5qHW2xU9ES0LTGn4pa9Fg2YZdNxTw&s=10" },
  { id: 12, name: "Radish", price: 25, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ-BWer3A_1tYT2-tI9jXx-QCA8iHvqDJywvFKouuSBA&s=10" },
  { id: 13, name: "Drumstick", price: 70, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFlSKfyvNtM2u08AcKn5LNFw3zY36VaJ0OZpdSlM-I0A&s" },
  { id: 14, name: "Pumpkin", price: 40, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQge_9YlTpLnFRZGZDxbZ-FDHY5UEvOM1-WuJ9IhyfIEA&s=10" },
  { id: 15, name: "Cucumber", price: 30, category: "Vegetables", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHgWtXzTpxU5n8VOesvwgyH3C0NRs0MWN2iyDvtI7lgw&s" },
  { id: 16, name: "Apple", price: 120, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcIB-W2n5nsWUwzndyiZhc6w1DWkQiiI5fGP0hv9-Ug&s=10" },
  { id: 17, name: "Banana", price: 50, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKDFFxMlyIbyga2yvJpDkqCBD1sVJHzRY4c-hMLMggEQ&s=10" },
  { id: 18, name: "Orange", price: 80, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShTr8xrhM84E_4RvOR48aB_o4Depv7oK2f7GWpv1_bUw&s=10" },
  { id: 19, name: "Mango", price: 150, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2HGhdyMySaxcTlACSo7-bDFk8WVUXaH1raChHF-Swug&s=10" },
  { id: 20, name: "Pineapple", price: 90, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdxvWGH-IZkd2phZYXdMpfci7dsXjYGVJrav-FMckHSw&s=10" },
  { id: 21, name: "Watermelon", price: 60, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgEwmSbiZ99zVvQzztoNG4_ys9ea-2l1ektGyOyTW8aA&s=10" },
  { id: 22, name: "Papaya", price: 70, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_m0QAwTO4aREZcjrYztptSdb0sMMwZvZtniWyPqw2Xg&s=10" },
  { id: 23, name: "Grapes", price: 90, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN7Bf4R9m-L59pFX4rD4RCEfXiryW8aumoRaTChq68Pw&s=10" },
  { id: 24, name: "Strawberry", price: 110, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1j2DjxvzrkxB7icTTYA7bFklgZjTtlkIRAWnXClOg4Q&s=10" },
  { id: 25, name: "Guava", price: 60, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK3MP5mCQcPM9qhHuGpjNrV_5MTMJEquSgDdg07ekjQQ&s=10" },
  { id: 26, name: "Pomegranate", price: 130, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmQU132EVnohePw_Lu_Cp6WoXbbz6cir8xXEWgNov7QA&s=10" },
  { id: 27, name: "Kiwi", price: 140, category: "Fruits", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNz4CUHLW3U-vK-aNxkVMxfgFvSudryE9MTvG2mtjBqw&s=10" },
  { id: 28, name: "Milk", price: 50, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNzBCnJRvh_28WMrXp_FRceSjbu7a4bF5myuF83ei2nw&s=10" },
  { id: 29, name: "Curd", price: 40, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBKZUpdomHTtYBEM9G97u3r0tPsXFgPYEm8x4NIYAJSw&s=10" },
  { id: 30, name: "Butter", price: 60, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe3J3dpRdzLw7LPxP-lXsgWbZ_V_vD40hIEVQkL2DTJw&s=10" },
  { id: 31, name: "Cheese", price: 120, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHfePbh4wfJN2w0rJSGP5QQddWhYjAmTJwxgKOc8sYWQ&s=10" },
  { id: 32, name: "Paneer", price: 90, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmm4-ord417xfrI0CSUYFV-AK5ZY8_JpzKyVT9C25gvQ&s=10" },
  { id: 33, name: "Ghee", price: 200, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqGKs7DV4FIIzifkmRK0USgcGVG9y-SA33ZX_4E06MMg&s=10" },
  { id: 34, name: "Buttermilk", price: 30, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkaPzbS-auHogJA4KdNx49Lxj0Aulc5Yi9mDXRNHQXLg&s=10" },
  { id: 35, name: "Cream", price: 70, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSufgGIkMf0yOF4iae8fV96TC3u28Gw6k2PtacAilChvA&s=10" },
  { id: 36, name: "Ice Cream", price: 100, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgtf4GnEP-BdgyhWo4Qptn_HutdFpiCvKKQW6zX3Md1g&s=10" },
  { id: 37, name: "Flavoured Milk", price: 60, category: "Dairy", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ8kdzE_gTw0stt6gNVC2MDqs4OVLJp0SQkAKodk4JNQ&s=10" }
];


const Products = () => {

  const { category } = useParams();   // 🔥 GET URL PARAM
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    if (category) {
      const data = productsData.filter(
        (item) => item.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(data);
    } else {
      setFilteredProducts(productsData);
    }
  }, [category]);

  return (
    <div className="products">

      <h1>{category ? category.toUpperCase() : "ALL PRODUCTS"}</h1>

      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} alt={item.name} />
              <h2>{item.name}</h2>
              <p>₹{item.price}</p>
            </div>
          ))
        ) : (
          <h2>No products found 😢</h2>
        )}
      </div>

    </div>
  );
};

export default Products;