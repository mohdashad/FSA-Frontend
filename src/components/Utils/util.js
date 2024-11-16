
import axios from 'axios';

export const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};


export const updateBook = async (bookId,updatedBook) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/books?id=${bookId}`,updatedBook);
        if(response){
            return response.data
        }
        
    } catch (error) {
        console.error('Error listing book:', error);
        return error;
    }
  };


