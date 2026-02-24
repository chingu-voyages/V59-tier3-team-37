# API Integration


## Role Mapping

The application maps role names to API topics:

| Display Name | Role Key | API Topic |
|--------------|----------|-----------|
| Frontend Developer | `frontend` | `JavaScript` |
| Backend Developer | `backend` | `REST APIs` |
| DevOps Developer | `devops` | `Docker` |
| Data Analyst | `data analyst` | `SQL` |

## API Request Structure

```javascript
{
  "topic": "JavaScript",           // Based on role mapping
  "numQuestions": 10,             // Number of questions to generate
  "numChoices": 4,                // Multiple choice options
  "difficulty": 7,                // Difficulty level (1-10)
  "lang": "en",                   // Language
  "questionType": "multiple-choice",
  "skillLevel": "intermediate",
  "jobRole": "Frontend Developer", // Display name
  "industry": "Software Development"
}
```
From Rapid API: https://rapidapi.com/bilgisamapi-bilgisamapi-default/api/generate-job-interview-questions-ai-quick-assess/playground/apiendpoint_7abfb41e-2912-4391-9ab2-254265d38ed8
(This is a limited API, display error 429 after reached the limit)