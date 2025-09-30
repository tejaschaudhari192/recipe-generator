'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  Sparkles, ArrowRight, Clock, CheckCircle,
  Users, Leaf, ShoppingCart, TrendingUp, LucideIcon
} from 'lucide-react'
import { getHomePageContent } from '@/lib/api'
import HomePageLoader from '@/components/home/HomePageLoader'
import { useRouter } from 'next/navigation'

// Define types for data structure
interface Benefit {
  title?: string
  description?: string
}

interface Stat {
  icon: keyof typeof iconMap
  value: string
  label: string
}

interface Step {
  number: number
  title: string
  description: string
}

interface HomePageData {
  tagline: string
  highlightedWord: string
  description: string
  benefits: string[]
  stats: Stat[]
  steps: Step[]
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  leaf: Leaf,
  shoppingCart: ShoppingCart,
  trendingUp: TrendingUp,
}

export default function Home() {
  const [data, setData] = useState<HomePageData | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const json = await getHomePageContent()
      setData(json)
    }

    fetchData()
  }, [])

  if (!data) return <HomePageLoader />

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">{data.tagline}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Turn Your{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                {data.highlightedWord}
              </span>
              <br />
              Into Amazing Recipes
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {data.description}
            </p>

            {/* Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              {data.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={() => router.push('/chat')}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all"
              >
                Start Cooking Now <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 rounded-full text-lg border-2 hover:bg-gray-50"
              >
                Watch Demo <Clock className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto">
              {data.stats.map((stat, i) => {
                const Icon = iconMap[stat.icon]
                return (
                  <div key={i} className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Icon className="w-5 h-5 text-orange-500" />
                      <span className="font-bold text-2xl">{stat.value}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to delicious meals</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {data.steps.map((step, i) => {
              const colors = ['bg-orange-500', 'bg-pink-500', 'bg-purple-500']
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div
                    className={`w-16 h-16 ${colors[i]} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <span className="text-white font-bold text-xl">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
