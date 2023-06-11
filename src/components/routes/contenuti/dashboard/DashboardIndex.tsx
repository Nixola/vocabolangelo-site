import ParolangeloCountSpotlight from './ParolangeloCountSpotlight'
import CreatorCountSpotlight from './CreatorCountSpotlight'
import LeaderBoard from './LeaderBoard'
import {Main} from '../../../common/Main'
import MonthWords from './MonthWords'

export const DASHBOARD_ROUTE = '/dashboard'

export default function DashboardIndex() {
    return <Main>
        <ParolangeloCountSpotlight/>
        <CreatorCountSpotlight/>
        <MonthWords/>
        <LeaderBoard/>
    </Main>
}
