export interface Configurations {
  google_api_key?: string
  ai_model?: string
}

export const configurations: Configurations = {
    google_api_key: process.env.GOOGLE_API_KEY,
    ai_model: process.env.AI_MODEL
}