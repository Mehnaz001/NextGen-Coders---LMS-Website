import React, { useEffect } from 'react'
import axios from 'axios'
import {serverUrl} from '../App'
import { useDispatch } from 'react-redux'
import { setReviewData } from '../redux/reviewSlice.js'

const getAllReviews = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        const allReviews = async() => {
            try {
                const res = await axios.get(serverUrl+'/api/review/allreviews',{withCredentials:true})
                dispatch(setReviewData(res.data))
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        allReviews();
    },[])
  
}

export default getAllReviews