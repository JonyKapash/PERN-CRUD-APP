import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
const BASE_URL = "http://localhost:3000";

export const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  currentProduct: null,

  // form state
  formData: {
    name: "",
    price: "",
    image: "",
  },

  setFormData: (data) => set({ formData: data }),
  resetFormData: () => set({ formData: { name: "", price: "", image: "" } }),

  addProduct: async (e) => {
    e.preventDefault();
    set({ loading: true });
    try {
      const { formData } = get();
      await axios.post(`${BASE_URL}/api/products`, formData);
      get().resetFormData();
      get().fetchProducts();
      document.getElementById("add_product_modal").close();
    } catch (error) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
      toast.success("Product added successfully");
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      set({ products: response.data.data, error: null });
    } catch (error) {
      if (error.status == 429) {
        set({ error: "Rate limit exceeded", products: [] });
      } else {
        set({ error: error.message, products: [] });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      set((prev) => ({
        products: prev.products.filter((product) => product.id !== id),
        error: null,
      }));
      toast.success("Product deleted successfully");
    } catch (error) {
      set({ error: error.message });
      toast.error("Failed to delete product");
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data,
        formData: response.data.data, // update form data with fetched product
        error: null,
      });
    } catch (error) {
      toast.error("Failed to fetch product");
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get();
      const response = await axios.put(
        `${BASE_URL}/api/products/${id}`,
        formData
      );
      set({ currentProduct: response.data.data });
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
