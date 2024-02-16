import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { getChallengeDetail } from '../../services/Query'

function MyDetailPage() {
    const params = useParams()
    console.log(params.id)
    const chellangeDetailData = useQuery(
        ['chellangeDetailData', params.id], 
    ()=>{getChallengeDetail(params.id)},)
    console.log(chellangeDetailData)

    return (
        <div>
            {/* {chellangeDetailData&&chellangeDetailData.data.challengeId} */}
        </div>
    )
}

export default MyDetailPage