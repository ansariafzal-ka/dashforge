const { GoogleGenerativeAI } = require("@google/generative-ai");

const GEMENI_API_KEY = process.env.GEMENI_API_KEY
const genAI = new GoogleGenerativeAI(GEMENI_API_KEY);

async function getResponse(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}

module.exports = getResponse;
