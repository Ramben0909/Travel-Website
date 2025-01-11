import { useState } from 'react';
import { ShoppingCart, Plus, Minus, Star } from 'lucide-react';
import Navbar from '../component/Navbar';

// Sample travel essentials data
const travelEssentials = [
  {
    id: 1,
    name: 'Compact Travel Backpack',
    price: 49.99,
    description: 'Lightweight, waterproof backpack perfect for day trips',
    rating: 4.7,
    image: '/api/placeholder/300/300',
    category: 'Bags',
    features: ['Water-resistant', 'Multiple compartments', '20L capacity']
  },
  {
    id: 2,
    name: 'Universal Travel Adapter',
    price: 24.99,
    description: 'All-in-one international power adapter',
    rating: 4.8,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    features: ['Works in 150+ countries', 'Multiple USB ports', 'Compact design']
  },
  {
    id: 3,
    name: 'Noise-Cancelling Wireless Earbuds',
    price: 79.99,
    description: 'Premium earbuds with long battery life',
    rating: 4.6,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    features: ['30-hour battery', 'Active noise cancellation', 'Bluetooth 5.0']
  },
  {
    id: 4,
    name: 'Compact First Aid Kit',
    price: 34.99,
    description: 'Essential medical supplies for travelers',
    rating: 4.5,
    image: '/api/placeholder/300/300',
    category: 'Safety',
    features: ['Includes 100+ items', 'Compact and lightweight', 'FDA approved']
  },
  {
    id: 5,
    name: 'Quick-Dry Travel Towel',
    price: 19.99,
    description: 'Microfiber towel that dries in minutes',
    rating: 4.6,
    image: '/api/placeholder/300/300',
    category: 'Accessories',
    features: ['Ultra-lightweight', 'Compact', 'Quick-drying material']
  }
];

const TravelEssentialsShop = () => {
  // Cart state management
  const [cart, setCart] = useState([]);
  
  // Filter and category state
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = ['All', ...new Set(travelEssentials.map(item => item.category))];

  // Add to cart functionality
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? {...cartItem, quantity: cartItem.quantity + 1}
          : cartItem
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
  };

  // Remove from cart functionality
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Update cart item quantity
  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? {...item, quantity: newQuantity}
          : item
      ));
    }
  };

  // Filter products
  const filteredProducts = travelEssentials.filter(item => 
    (selectedCategory === 'All' || item.category === selectedCategory) &&
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total cart value
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Travel Essentials Shop</h1>
      
      {/* Search and Filter Section */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <input 
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Products Section */}
        <div className="md:col-span-2 space-y-4">
          {filteredProducts.map(item => (
            <div 
              key={item.id} 
              className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Star className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                  <div className="mt-1">
                    {item.features.map((feature, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-100 px-2 py-1 rounded mr-2"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                <button 
                  onClick={() => addToCart(item)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
                >
                  <ShoppingCart className="mr-2 w-4 h-4" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Section */}
        <div className="border rounded-lg p-4">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart ({cart.length})</h2>
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Your cart is empty
            </div>
          ) : (
            <>
              {cart.map(item => (
                <div 
                  key={item.id} 
                  className="flex justify-between items-center border-b py-2"
                >
                  <div className="flex items-center space-x-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 p-1 rounded"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 p-1 rounded"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="mt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  className="w-full bg-green-500 text-white py-2 rounded mt-4 hover:bg-green-600"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default TravelEssentialsShop;