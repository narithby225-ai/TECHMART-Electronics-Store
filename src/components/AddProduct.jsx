import React, { useState } from 'react';
import { Plus, X, Image as ImageIcon, Save, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../data/products';

export default function AddProduct({ onClose, onSave, darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptops',
    subcategory: '',
    price: '',
    originalPrice: '',
    rating: '4.5',
    reviewsCount: '0',
    badge: 'New',
    inStock: true,
    stockCount: '0',
    image: '',
    description: '',
    specs: {
      'Spec 1': '',
      'Spec 2': '',
      'Spec 3': ''
    }
  });

  const [errors, setErrors] = useState({});
  const [specCount, setSpecCount] = useState(3);

  const badges = ['New', 'Sale', 'Best Seller', 'Top Rated', 'Limited', 'Hot Deal', 'Popular'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSpecChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [key]: value
      }
    }));
  };

  const handleSpecKeyChange = (oldKey, newKey) => {
    if (oldKey === newKey) return;
    const newSpecs = { ...formData.specs };
    newSpecs[newKey] = newSpecs[oldKey];
    delete newSpecs[oldKey];
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  const addSpec = () => {
    setSpecCount(prev => prev + 1);
    setFormData(prev => ({
      ...prev,
      specs: {
        ...prev.specs,
        [`Spec ${specCount + 1}`]: ''
      }
    }));
  };

  const removeSpec = (key) => {
    const newSpecs = { ...formData.specs };
    delete newSpecs[key];
    setFormData(prev => ({ ...prev, specs: newSpecs }));
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.subcategory.trim()) newErrors.subcategory = 'Subcategory is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (formData.stockCount < 0) newErrors.stockCount = 'Stock count cannot be negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    // Generate new product object
    const newProduct = {
      id: `prod-${Date.now()}`,
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : parseFloat(formData.price),
      rating: parseFloat(formData.rating),
      reviewsCount: parseInt(formData.reviewsCount) || 0,
      badge: formData.badge,
      inStock: formData.inStock,
      stockCount: parseInt(formData.stockCount) || 0,
      image: formData.image,
      description: formData.description,
      specs: Object.fromEntries(
        Object.entries(formData.specs).filter(([key, value]) => key && value)
      )
    };

    onSave(newProduct);
    onClose();
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Plus className="w-6 h-6 text-cyan-400" />
            Add New Product
          </h2>
          <p className="text-sm text-slate-400 mt-1">Fill in the product details below</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h3 className="font-bold mb-4 text-cyan-400">Basic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border outline-none transition ${
                  errors.name 
                    ? 'border-rose-500 focus:border-rose-500' 
                    : darkMode 
                    ? 'bg-slate-900 border-slate-700 focus:border-cyan-500' 
                    : 'bg-white border-slate-300 focus:border-blue-500'
                }`}
                placeholder="e.g., MacBook Pro 14 M3"
              />
              {errors.name && <p className="text-rose-400 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
              >
                {CATEGORIES.filter(cat => cat !== 'All Categories').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Subcategory *</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border outline-none ${
                  errors.subcategory ? 'border-rose-500' : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
                placeholder="e.g., Premium Laptops"
              />
              {errors.subcategory && <p className="text-rose-400 text-xs mt-1">{errors.subcategory}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 rounded-lg border outline-none ${
                  errors.price ? 'border-rose-500' : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
                placeholder="999.99"
              />
              {errors.price && <p className="text-rose-400 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Price ($)</label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 rounded-lg border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                placeholder="1299.99"
              />
              <p className="text-xs text-slate-400 mt-1">Leave empty if no discount</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Badge</label>
              <select
                name="badge"
                value={formData.badge}
                onChange={handleChange}
                className={`w-full px-4 py-2 rounded-lg border outline-none ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
              >
                {badges.map(badge => (
                  <option key={badge} value={badge}>{badge}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Stock Count *</label>
              <input
                type="number"
                name="stockCount"
                value={formData.stockCount}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-2 rounded-lg border outline-none ${
                  errors.stockCount ? 'border-rose-500' : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
                placeholder="50"
              />
              {errors.stockCount && <p className="text-rose-400 text-xs mt-1">{errors.stockCount}</p>}
            </div>

            <div className="flex items-center gap-3 pt-6">
              <input
                type="checkbox"
                name="inStock"
                checked={formData.inStock}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-cyan-500"
                id="inStock"
              />
              <label htmlFor="inStock" className="text-sm font-medium cursor-pointer">In Stock</label>
            </div>
          </div>
        </div>

        {/* Image & Description */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <h3 className="font-bold mb-4 text-cyan-400">Media & Description</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image URL *</label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-2 rounded-lg border outline-none ${
                    errors.image ? 'border-rose-500' : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                  }`}
                  placeholder="https://images.unsplash.com/..."
                />
                <button
                  type="button"
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition flex items-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                </button>
              </div>
              {errors.image && <p className="text-rose-400 text-xs mt-1">{errors.image}</p>}
              <p className="text-xs text-slate-400 mt-1">Use Unsplash or any image URL</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-2 rounded-lg border outline-none resize-none ${
                  errors.description ? 'border-rose-500' : darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'
                }`}
                placeholder="Detailed product description..."
              />
              {errors.description && <p className="text-rose-400 text-xs mt-1">{errors.description}</p>}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className={`p-4 rounded-xl border ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50 border-slate-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-cyan-400">Specifications</h3>
            <button
              type="button"
              onClick={addSpec}
              className="px-3 py-1.5 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 rounded-lg text-xs font-semibold transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Spec
            </button>
          </div>

          <div className="space-y-3">
            {Object.entries(formData.specs).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <input
                  type="text"
                  value={key}
                  onChange={(e) => handleSpecKeyChange(key, e.target.value)}
                  className={`w-1/3 px-3 py-2 rounded-lg border outline-none text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                  placeholder="Spec name"
                />
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleSpecChange(key, e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border outline-none text-sm ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-300'}`}
                  placeholder="Spec value"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(key)}
                  className="p-2 text-rose-400 hover:bg-rose-500/20 rounded-lg transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 justify-end pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Product
          </button>
        </div>
      </form>
    </div>
  );
}
