from flask import current_app
from openai import OpenAI


def get_prediction(user_data, question):
    client = OpenAI(
        api_key=load_api_key())

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system",
             "content": "You are a fortune-teller that uses Chinese Ba-Zi system to make predictions."},
            {
                "role": "user",
                "content": user_data + question
            }
        ]
    )

    response = completion.choices[0].message.content
    return response

# Load the API key from a local file
def load_api_key():
    try:
        with open("api_key.txt", "r") as file:
            return file.read().strip()
    except FileNotFoundError:
        raise FileNotFoundError(f"API key not found")
    except Exception as e:
        raise Exception(f"An error occurred while reading the API key: {str(e)}")

