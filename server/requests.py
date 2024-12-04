from openai import OpenAI
from dotenv import load_dotenv
import os

def get_prediction(user_data, question):
    client = OpenAI(
        api_key=load_api_key())

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system",
             "content": "Acting as a fortune-teller that uses Chinese Ba-Zi system to make predictions. The user will provide their birthdate, location, gender, other optional details and their questions. Analyze and make prediction response to their question."},
            {
                "role": "user",
                "content": user_data + question
            }
        ]
    )

    response = completion.choices[0].message.content
    return response

# Load environment variables from .env file
load_dotenv()

def load_api_key():
    """
    Loads the API key from an environment variable.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise ValueError("OPENAI_API_KEY not found in environment variables.")
    return api_key
