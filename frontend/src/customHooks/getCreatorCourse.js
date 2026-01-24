import React, { useEffect } from 'react'
import { setCreatorCourseData } from '../redux/courseSlice'
import { useDispatch, useSelector } from 'react-redux'
import {serverUrl} from '../App'
import axios from 'axios'

const getCreatorCourse = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)
    useEffect(()=>{
        const creatorCourses = async () => {
            try {
                const result = await axios.get(serverUrl + '/api/course/getcreator', {withCredentials:true})
                console.log(result.data)
                dispatch(setCreatorCourseData(result.data))
            } catch (error) {
                console.log(error)
            }
        }
        creatorCourses()
    },[userData])
  
}

export default getCreatorCourse
