"use client"

import { useState, useEffect } from "react"
import { AudioCard } from "@/components/audio-card"
import { CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Users, Phone, CheckCircle, Activity, Zap, Target, Heart } from "lucide-react"

interface AnalyticsData {
  totalCalls: number
  successRate: number
  avgDuration: number
  sentiment: number
  responseTime: number
  activeAgents: number
  callsToday: number[]
  sentimentData: { positive: number; neutral: number; negative: number }
  topIntents: Array<{ intent: string; count: number; percentage: number }>
}

export function ConversationAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalCalls: 12847,
    successRate: 94.2,
    avgDuration: 3.4,
    sentiment: 87.3,
    responseTime: 450,
    activeAgents: 23,
    callsToday: [45, 52, 48, 61, 55, 67, 59, 73, 68, 82, 76, 89],
    sentimentData: { positive: 73, neutral: 19, negative: 8 },
    topIntents: [
      { intent: "Appointment Booking", count: 3421, percentage: 26.6 },
      { intent: "Customer Support", count: 2876, percentage: 22.4 },
      { intent: "Product Inquiry", count: 2103, percentage: 16.4 },
      { intent: "Billing Question", count: 1847, percentage: 14.4 },
      { intent: "Technical Support", count: 1234, percentage: 9.6 },
    ],
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        ...prev,
        totalCalls: prev.totalCalls + Math.floor(Math.random() * 3),
        successRate: Math.min(100, Math.max(90, prev.successRate + (Math.random() - 0.5) * 2)),
        avgDuration: Math.max(2, prev.avgDuration + (Math.random() - 0.5) * 0.2),
        sentiment: Math.min(100, Math.max(70, prev.sentiment + (Math.random() - 0.5) * 3)),
        responseTime: Math.max(200, prev.responseTime + (Math.random() - 0.5) * 50),
        activeAgents: Math.max(15, Math.min(30, prev.activeAgents + Math.floor((Math.random() - 0.5) * 3))),
        callsToday: prev.callsToday.map((val) => Math.max(0, val + Math.floor((Math.random() - 0.5) * 10))),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const maxCalls = Math.max(...analytics.callsToday)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h3 className="text-3xl font-bold text-gray-900">Real-Time Conversation Analytics</h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor your AI agents' performance with live metrics, sentiment analysis, and conversation insights
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {[
          {
            icon: <Phone className="w-6 h-6" />,
            label: "Total Calls",
            value: analytics.totalCalls.toLocaleString(),
            change: "+12%",
            color: "from-blue-500 to-cyan-500",
            bgColor: "from-blue-50 to-cyan-50",
          },
          {
            icon: <CheckCircle className="w-6 h-6" />,
            label: "Success Rate",
            value: `${analytics.successRate.toFixed(1)}%`,
            change: "+2.3%",
            color: "from-green-500 to-emerald-500",
            bgColor: "from-green-50 to-emerald-50",
          },
          {
            icon: <Clock className="w-6 h-6" />,
            label: "Avg Duration",
            value: `${analytics.avgDuration.toFixed(1)}m`,
            change: "-0.2m",
            color: "from-purple-500 to-pink-500",
            bgColor: "from-purple-50 to-pink-50",
          },
          {
            icon: <Heart className="w-6 h-6" />,
            label: "Sentiment",
            value: `${analytics.sentiment.toFixed(1)}%`,
            change: "+5.1%",
            color: "from-orange-500 to-red-500",
            bgColor: "from-orange-50 to-red-50",
          },
          {
            icon: <Zap className="w-6 h-6" />,
            label: "Response Time",
            value: `${Math.round(analytics.responseTime)}ms`,
            change: "-15ms",
            color: "from-yellow-500 to-orange-500",
            bgColor: "from-yellow-50 to-orange-50",
          },
          {
            icon: <Users className="w-6 h-6" />,
            label: "Active Agents",
            value: analytics.activeAgents.toString(),
            change: "+3",
            color: "from-indigo-500 to-purple-500",
            bgColor: "from-indigo-50 to-purple-50",
          },
        ].map((metric, index) => (
          <AudioCard
            key={index}
            className={`border-0 shadow-lg bg-gradient-to-br ${metric.bgColor} hover-lift cursor-pointer group overflow-hidden`}
            enableHoverSound={true}
            enableClickSound={true}
          >
            <CardContent className="p-6 relative">
              <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className={`w-16 h-16 bg-gradient-to-br ${metric.color} rounded-full`}></div>
              </div>
              <div
                className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}
              >
                {metric.icon}
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className="text-sm text-gray-600">{metric.label}</div>
                <div
                  className={`text-xs font-medium ${metric.change.startsWith("+") ? "text-green-600" : metric.change.startsWith("-") && metric.label !== "Avg Duration" && metric.label !== "Response Time" ? "text-red-600" : "text-green-600"}`}
                >
                  {metric.change} from yesterday
                </div>
              </div>
            </CardContent>
          </AudioCard>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Call Volume Chart */}
        <AudioCard className="border-0 shadow-xl bg-white hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Call Volume Today</h4>
                <p className="text-gray-600">Hourly breakdown of incoming calls</p>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Live</span>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-end justify-between h-32 gap-2">
                {analytics.callsToday.map((calls, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-lg transition-all duration-1000 hover:from-blue-600 hover:to-cyan-500 cursor-pointer group relative"
                      style={{ height: `${(calls / maxCalls) * 100}%`, minHeight: "8px" }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {calls}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">{index + 9}:00</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>9 AM</span>
                <span>3 PM</span>
                <span>8 PM</span>
              </div>
            </div>
          </CardContent>
        </AudioCard>

        {/* Sentiment Analysis */}
        <AudioCard className="border-0 shadow-xl bg-white hover-lift">
          <CardContent className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900">Sentiment Analysis</h4>
                <p className="text-gray-600">Customer emotion breakdown</p>
              </div>
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>

            <div className="space-y-6">
              {/* Sentiment Donut Chart */}
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="8"
                    strokeDasharray={`${analytics.sentimentData.positive * 2.51} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="8"
                    strokeDasharray={`${analytics.sentimentData.neutral * 2.51} 251`}
                    strokeDashoffset={`-${analytics.sentimentData.positive * 2.51}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${analytics.sentimentData.negative * 2.51} 251`}
                    strokeDashoffset={`-${(analytics.sentimentData.positive + analytics.sentimentData.neutral) * 2.51}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{analytics.sentimentData.positive}%</div>
                    <div className="text-sm text-gray-600">Positive</div>
                  </div>
                </div>
              </div>

              {/* Sentiment Legend */}
              <div className="space-y-3">
                {[
                  { label: "Positive", value: analytics.sentimentData.positive, color: "bg-green-500" },
                  { label: "Neutral", value: analytics.sentimentData.neutral, color: "bg-yellow-500" },
                  { label: "Negative", value: analytics.sentimentData.negative, color: "bg-red-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </AudioCard>
      </div>

      {/* Top Intents */}
      <AudioCard className="border-0 shadow-xl bg-white hover-lift">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-xl font-bold text-gray-900">Top Conversation Intents</h4>
              <p className="text-gray-600">Most common reasons for customer calls</p>
            </div>
            <Target className="w-6 h-6 text-purple-600" />
          </div>

          <div className="space-y-4">
            {analytics.topIntents.map((intent, index) => (
              <div key={index} className="group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{intent.intent}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{intent.count.toLocaleString()}</span>
                    <span className="text-sm font-bold text-gray-900">{intent.percentage}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 group-hover:from-purple-600 group-hover:to-pink-600"
                    style={{ width: `${intent.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </AudioCard>
    </div>
  )
}
