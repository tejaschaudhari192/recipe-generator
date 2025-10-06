import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { getHomePageContent } from '@/lib/api';
import Link from 'next/link';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HomePageData {
  tagline: string;
  highlightedWord: string;
  description: string;
  benefits: string[];
  steps: Step[];
}

export default async function Home() {
  const data: HomePageData = await getHomePageContent();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-6xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{data.tagline}</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Turn Your{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              {data.highlightedWord}
            </span>
            <br />
            Into Amazing Recipes
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            {data.description}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4">
            {data.benefits.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-muted-foreground"
              >
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/chat">
              <Button size="lg" className="px-8 py-6 text-lg">
                Start Cooking Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
              Watch Demo
              <Clock className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-2">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to delicious meals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {data.steps.map((step, i) => {
              const colors = ['bg-orange-500', 'bg-pink-500', 'bg-purple-500'];
              return (
                <div key={i} className="text-center space-y-4">
                  <div
                    className={`w-16 h-16 ${colors[i]} rounded-full flex items-center justify-center mx-auto`}
                  >
                    <span className="text-white font-bold text-xl">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
