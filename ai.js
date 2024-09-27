const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI("AIzaSyAtCHPVILXQKBXiJ8rX5kQ25zpbaAUoF8I");

async function run(symptom) {
  if (!symptom) {
    throw new Error("Symptom is required");
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `I'm experiencing ${symptom}. What can I do ?`;
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Split the response into paragraphs
    const paragraphs = responseText.split("\n\n");

    // Find the index of the "Here's what I recommend:" paragraph
    const recommendIndex = paragraphs.findIndex(paragraph => paragraph.includes("Here's what I recommend:"));

    // Find the index of the "Remember, I am not a medical professional." paragraph
    const rememberIndex = paragraphs.findIndex(paragraph => paragraph.includes("Remember, I am not a medical professional."));

    // Extract the general advice paragraphs
    const adviceParagraphs = paragraphs.slice(recommendIndex + 1, rememberIndex);

    // Join the advice paragraphs into a single string
    const advice = adviceParagraphs.join("\n\n");

    // Remove the unnecessary text and the asterisks
    const response = advice.replace(/I understand you're experiencing .*?, and it's definitely concerning. However, I'm an AI and cannot provide medical advice. It's crucial to consult a healthcare professional for any health concerns./g, "").replace("*", "").replace("Here are some general tips that might help alleviate a headache:", "").trim();

    console.log(`Response: ${response}`);
    return response;
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

module.exports = run;