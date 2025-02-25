import { getAnalyticsOverview } from './actions/getAnalyticsOverview'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { FileText, Clock, TrendingUp } from 'lucide-react'

export default  function Analytics() {
  const { totalSummaries, averageLength, growthRate } =  getAnalyticsOverview()

  return (
    <div className="grid gap-4 md:grid-cols-3 ">
      <Card >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-14">
          <CardTitle className=" dark:text-white text-xl  ">Total Summaries</CardTitle>
          <FileText className="h-6 w-6  text-muted-foreground dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-400">{totalSummaries}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-14">
          <CardTitle className=" text-xl dark:text-white">Avg. Summary Length</CardTitle>
          <Clock className="h-6 w-6  text-muted-foreground dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-400">{averageLength} words</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-14">
          <CardTitle className=" text-xl dark:text-white">Monthly Growth</CardTitle>
          <TrendingUp className="h-6 w-6  text-muted-foreground dark:text-gray-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold dark:text-gray-400">{growthRate}%</div>
        </CardContent>
      </Card>
    </div>
  )
}

