import { useEffect } from 'react'
import axios from 'axios'
import { serverUrl } from '../App'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

const useGetCurrentUser = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + '/api/user/getcurrentuser', { withCredentials: true })
                // ✅ Controller returns { ...userData, enrolledCourses, pagination }
                dispatch(setUserData(result.data))
            } catch (error) {
                const status = error.response?.status;
                if (status && status !== 400 && status !== 401) {
                    console.error(error);
                }
                dispatch(setUserData(null))
            }
        }
        fetchUser();
    }, [])
}

export default useGetCurrentUser