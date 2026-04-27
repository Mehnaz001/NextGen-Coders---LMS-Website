import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice.js'

const useGetAllReviews = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get(serverUrl + '/api/review/allreviews', { withCredentials: true })
                // ✅ Controller returns { reviews, pagination }
                dispatch(setReviewData(res.data.reviews))
            } catch (error) {
                console.log(error)
            }
        }
        fetchReviews();
    }, [])
}

export default useGetAllReviews