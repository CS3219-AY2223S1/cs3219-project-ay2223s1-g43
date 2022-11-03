import axios from "axios"

const LEARNING_SERVICE_URL = process.env.LEARNING_SERVICE_URL || 'http://localhost:8002'

export const learningPathwayService = axios.create({
  baseURL: LEARNING_SERVICE_URL,
  timeout: 5000
})
