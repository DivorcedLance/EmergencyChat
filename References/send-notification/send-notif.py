import requests
import json
from firebase_admin import credentials

serviceAccountKeyJson = 'fir-notif-e0f99-firebase-adminsdk-poo90-15b6656bad.json'
project_id = "fir-notif-e0f99"

def generate_access_token(service_account_file):
    cred = credentials.Certificate(service_account_file)
    return cred.get_access_token().access_token

access_token = generate_access_token(serviceAccountKeyJson)

url = f"https://fcm.googleapis.com/v1/projects/{project_id}/messages:send"
headers = {
    "Authorization": f"Bearer {access_token}",
    "Content-Type": "application/json"
}

data = {
    "message": {
        "token": "cOqYoXM1jZH_M84Ac9zQez:APA91bH3UX07JmZEf784VpkTla0GPsEVIshXr8HKzG7CHVfjdoeQTcwT4mZDdAAJwVTRnlfX0n-xYVCOw2gjp4CJMTAAnW8Vxk8eyZmykEdzMkFR09_EBo-fF4gyR6twHWF3RoYP882h",
        "notification": {
            "title": "Hola",
            "body": "webon",
            "image": "https://i.pinimg.com/736x/65/c7/92/65c79220900fd9748639ed6da44565a7.jpg"
        }
    }
}

response = requests.post(url, headers=headers, data=json.dumps(data))

print(response.text)

