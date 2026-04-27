import { useEffect } from 'react'
import { setCreatorCourseData } from '../redux/courseSlice'
import { useDispatch } from 'react-redux'
import { serverUrl } from '../App'
import axios from 'axios'

// ✅ Accepts isEducator flag to conditionally fetch
const useGetCreatorCourse = (isEducator = false) => {
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isEducator) return  // ✅ Skip fetch for non-educators

        const fetchCreatorCourses = async () => {
            try {
                const result = await axios.get(serverUrl + '/api/course/getcreator', { withCredentials: true })
                dispatch(setCreatorCourseData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchCreatorCourses()
    }, [isEducator])  // ✅ Re-run if role changes
}

export default useGetCreatorCourse