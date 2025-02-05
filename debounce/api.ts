import axios from "axios"
export const getSuggestions = (value: string): Promise<{products: any[]}> => {
  return axios.get(`https://dummyjson.com/products/search?q=${value}`).then(res => {
    return res.data;
  })
}