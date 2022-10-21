import { isSameWeek } from "date-fns"
import { useEffect, useState } from "react"
import { learningPathwayAPI } from "../api/learningPathway"
import { useAuthContext } from "./auth/useAuthContext"

const useRecords = () => {
  const { userDetails } = useAuthContext()
  const [records, setRecords] = useState(null);
  const [diffMap, setDiffMap] = useState(null);
  const [freqMap, setFreqMap] = useState(null);

  const processRecords = (stats) => {
    const dMap = { "EASY": 0, "MEDIUM": 0, "HARD": 0 }
    const fMap = { "day": 0, "week": 0, "month": 0 }

    const today = new Date();

    stats = stats.map(r => {
      dMap[r.question_difficulty] += 1

      const recordDate = new Date(r.timestamp)

      if (today.getFullYear() === recordDate.getFullYear() &&
        today.getMonth() === recordDate.getMonth()) {
        if (isSameWeek(today, recordDate)) {
          if (today.getDate() === recordDate.getDate()) {
            fMap.day += 1
          }
          fMap.week += 1
        }
        fMap.month += 1
      }

      return r
    })

    setRecords(stats)
    setDiffMap(dMap)
    setFreqMap(fMap)

    return { records, dMap, fMap }
  }

  useEffect(() => {
    const getStats = async () => {
      const stats = await learningPathwayAPI.handleGetRecords(userDetails.userId);
      console.log(stats)
      processRecords(stats)
    }

    getStats();
  }, [])

  return { records, diffMap, freqMap }
}

export default useRecords;