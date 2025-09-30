import { NextResponse } from 'next/server'

export async function GET() {
    const homepageData = {
    tagline: "AI-Powered Recipe Generator",
    title: "Turn Your Ingredients Into Amazing Recipes",
    highlightedWord: "Ingredients",
    description: "No more food waste! Enter what you have and get personalized recipes instantly. Save money, eat better, and discover new favorites every day.",
    benefits: [
      "No Sign-up Required",
      "100% Free Forever",
      "Dietary Preferences",
    ],
    stats: [
      { icon: "users", label: "Happy Cooks", value: "50K+" },
      { icon: "leaf", label: "Meals Saved", value: "2M+" },
      { icon: "shoppingCart", label: "Avg Yearly Savings", value: "$500+" },
      { icon: "trendingUp", label: "User Rating", value: "4.9/5" },
    ],
    steps: [
      {
        number: 1,
        title: "Add Ingredients",
        description: "Simply type in what you have in your kitchen - fresh produce, pantry staples, or leftovers",
      },
      {
        number: 2,
        title: "AI Magic",
        description: "Our AI analyzes your ingredients and generates creative, delicious recipe combinations",
      },
      {
        number: 3,
        title: "Start Cooking",
        description: "Follow step-by-step instructions and enjoy your personalized, delicious meal",
      },
    ]
  }
  return NextResponse.json(homepageData);
}
