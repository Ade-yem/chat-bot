import Configuration from "openai";

export const configureOpenAI = () => {
  const config = new Configuration({
    apiKey: process.env.GPT_KEY, organization: process.env.ORG_ID,
  })
  return config;
}
