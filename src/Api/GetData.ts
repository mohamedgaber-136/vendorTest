import axios from "axios";
const apiUrl = import.meta.env.VITE_API_BASE_URL;

// Type definitions for function parameters and data
type SetData<T> = (data: T) => void;
type SetLoading = (loading: boolean) => void;
type SetMessage = (message: string) => void;
type RefetchData = () => void;

// Define a generic response type if needed, adjust according to API response
interface ApiResponse<T> {
  data: T;
}

// Get Products Data function
export const GetProductsData = async <T>(
  setData: SetData<T>,
  type: string
): Promise<void> => {
  try {
    const response = await axios.get<ApiResponse<T>>(`${apiUrl}${type}`);
    setData(response.data.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Delete Products Data function
export const DeleteProductsData = async (
  type: string,
  id: string,
  setLoading: SetLoading,
  setMessage: SetMessage,
  refetchData: RefetchData
): Promise<void> => {
  setLoading(true);
  try {
    await axios.delete(`${apiUrl}${type}/${id}`);
    setMessage("تم المسح بنجاح");
  } catch (error) {
    console.error("Error deleting data:", error);
    setMessage("Error sending data");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setMessage("");
      refetchData();
    }, 2000);
  }
};

// Send Products Data function
export const SendProductsData = async (
  type: string,
  newObj: Record<string, any>,
  setLoading: SetLoading,
  setMessage: SetMessage,
  refetchData: RefetchData
): Promise<void> => {
  setLoading(true);
  try {
    await axios.post(`${apiUrl}${type}`, newObj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setMessage("تم الارسال بنجاح");
  } catch (error) {
    console.error("Error sending data:", error);
    setMessage("Error sending data");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setMessage("");
      refetchData();
    }, 2000);
  }
};

// Update Product function
export const UpdateProduct = async (
  type: string,
  id: string,
  newObj: Record<string, any>,
  setLoading: SetLoading,
  setMessage: SetMessage,
  refetchData: RefetchData
): Promise<void> => {
  setLoading(true);
  const obj = { ...newObj, _method: "PUT" };
  try {
    await axios.post(`${apiUrl}${type}/${id}`, obj, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    setMessage("تم الارسال بنجاح");
  } catch (error) {
    console.error("Error updating data:", error);
    setMessage("Error sending data");
  } finally {
    setLoading(false);
    setTimeout(() => {
      setMessage("");
      refetchData();
    }, 2000);
  }
};
