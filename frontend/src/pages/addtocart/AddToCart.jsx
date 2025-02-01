

import React, { useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import burger from '../../assets/burger.jpg'; // Import Burger image
import pizza from '../../assets/pizza.jpg'; // Import Pizza image
import pasta from '../../assets/pasta.jpg'; // Import Pasta image
import colarj from '../../assets/colarj.jpg'; // Import Cola image
import sandwhichrj from '../../assets/sandwhichrj.jpg'; // Import Sandwich image
import logocanteen from '../../assets/logocanteen.png'; // Logo image
import friesrj from '../../assets/friesrj.jpg'
const AddToCart = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);

  // Sample food items with imported images
  const foodItems = [
    { id: 1, name: 'Burger', price: 100, image: burger },
    { id: 2, name: 'Pizza', price: 200, image: pizza },
    { id: 3, name: 'Pasta', price: 150, image: pasta },
    { id: 4, name: 'Fries', price: 50, image: friesrj },
    { id: 5, name: 'Cola', price: 30, image: colarj },
    { id: 6, name: 'Sandwich', price: 80, image: sandwhichrj }
  ];

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // Add item to the cart
  const handleAddToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Increase quantity of an item in the cart
  const handleIncreaseQuantity = (id) => {
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  // Decrease quantity of an item in the cart
  const handleDecreaseQuantity = (id) => {
    setCart(cart.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ));
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Generate PDF of the menu
  const generateMenuPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');

    // Add Logo to the PDF
    doc.addImage(logocanteen, 'PNG', 70, 10, 70, 30); // Logo at the top center with larger size

    // Add title below the logo
    doc.setFontSize(18);
    doc.text('Weekly Menu', 105, 50, { align: 'center' });

    // Add Table with Menu items for the week
    const tableData = [
      ['Monday', 'Poha', 'Dal Chawal', 'Bhindi'],
      ['Tuesday', 'Upma', 'Pizza', 'Panner Butter Masala'],
      ['Wednesday', 'Idli', 'Kachori', 'Pav Bhaji'],
      ['Thursday', 'Sheera', 'Panipuri', 'Mutter Panner'],
      ['Friday', 'Dosa', 'Pasta', 'Gobi ki sabji'],
      ['Saturday', 'Utapa', 'Sandwich', 'Bagan ka Bharta'],
      ['Sunday', 'Mendu Vada', 'Pizza', 'Tamatar ki sabji']
    ];

    doc.autoTable({
      head: [['Day', 'Breakfast', 'Lunch', 'Dinner']],
      body: tableData,
      startY: 70,
      theme: 'grid',
      margin: { top: 10 },
      styles: {
        cellPadding: 2,
        fontSize: 10
      }
    });

    // Save the PDF
    doc.save('Menu.pdf');
  };

  // Generate PDF of the bill
  const generateBillPDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica', 'normal');

    // Add Logo to the PDF
    doc.addImage(logocanteen, 'PNG', 70, 10, 70, 30); // Logo at the top center with larger size

    // Add title for the bill
    doc.setFontSize(18);
    doc.text('Billing Receipt', 105, 50, { align: 'center' });

    // Add Table for the cart items
    const tableData = cart.map(item => [item.name, `INR ${item.price}`, item.quantity, `INR ${item.price * item.quantity}`]);

    doc.autoTable({
      head: [['Item', 'Price', 'Quantity', 'Total']],
      body: tableData,
      startY: 60,
      theme: 'grid',
      margin: { top: 10 },
      styles: {
        cellPadding: 2,
        fontSize: 10
      }
    });

    // Add Total Price at the bottom
    doc.setFontSize(12);
    doc.text(`Total: INR ${calculateTotal()}`, 105, doc.lastAutoTable.finalY + 10, { align: 'center' });

    // Save the bill PDF
    doc.save('Bill.pdf');
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Menu Download Button */}
      <div className="fixed bottom-8 right-4">
        <button
          onClick={generateMenuPDF}
          className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 transition-all"
        >
          Download Menu
        </button>
      </div>

      {/* Sidebar for Cart and Billing */}
      <div className="w-64 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Billing</h2>

        {/* Billing Summary */}
        <div className="space-y-2">
          {cart.length === 0 ? (
            <p className="text-center text-white">No items in the cart.</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between text-white text-sm mb-2">
                <div>{item.name} x{item.quantity}</div>
                <div>₹{item.price * item.quantity}</div>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="ml-4 text-white text-xs hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* Total Price */}
        <div className="mt-4 border-t pt-2">
          <h3 className="text-sm font-semibold">Total: ₹{calculateTotal()}</h3>
          <button
            onClick={generateBillPDF}
            className="mt-2 bg-white text-blue-600 py-1 px-4 rounded-full w-full hover:bg-gray-200 transition-all"
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="p-2 border rounded-full w-full border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search for food"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        {/* Food Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {foodItems.filter(item => item.name.toLowerCase().includes(searchTerm)).map(item => (
            <div key={item.id} className="border rounded-4xl p-4 bg-blue-50 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              {/* Image */}
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-3" />

              {/* Item Details */}
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-blue-600">{item.name}</h3>
                <p className="text-xl text-blue-500">₹{item.price}</p>
              </div>

              {/* Counter and Add/Remove Buttons */}
              <div className="flex justify-between items-center mt-4 text-sm">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleDecreaseQuantity(item.id)}
                    style={{ backgroundColor: '#1D4ED8', color: 'white', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background-color 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1E40AF'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1D4ED8'}
                  >
                    -
                  </button>
                  <span>{cart.find(cartItem => cartItem.id === item.id)?.quantity || 0}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(item.id)}
                    style={{ backgroundColor: '#1D4ED8', color: 'white', width: '2rem', height: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', transition: 'background-color 0.3s' }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1E40AF'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#1D4ED8'}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => handleAddToCart(item)}
                  style={{ backgroundColor: '#1D4ED8', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', transition: 'background-color 0.3s' }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#1E40AF'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#1D4ED8'}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
