import axios from "axios";

const USER_SERVICE_URL = process.env.REACT_APP_ENV_USER_SERVICE_URL || 'http://localhost:8000'

export const userService = axios.create({
  withCredentials: true,
  baseURL: USER_SERVICE_URL,
  timeout: 5000
})

const QUESTION_SERVICE_URL = process.env.REACT_APP_ENV_QUESTION_SERVICE_URL || 'http://localhost:8003'

export const questionService = axios.create({
  baseURL: QUESTION_SERVICE_URL,
  timeout: 5000
})

const LEARNING_SERVICE_URL = process.env.REACT_APP_ENV_LEARNING_SERVICE_URL || 'http://localhost:8002'

export const learningPathwayService = axios.create({
  baseURL: LEARNING_SERVICE_URL,
  timeout: 5000
})
