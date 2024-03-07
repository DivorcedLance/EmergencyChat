import requests
import json
from firebase_admin import credentials

service_account_file_location = 'References\\send-notification\\fir-notif-e0f99-firebase-adminsdk-poo90-15b6656bad.json'
project_id = "fir-notif-e0f99"

def generate_access_token(service_account_file):
    cred = credentials.Certificate(service_account_file)
    return cred.get_access_token().access_token

def send_notification(messagingToken, title, body, image):
    access_token = generate_access_token(service_account_file_location)
    url = f"https://fcm.googleapis.com/v1/projects/{project_id}/messages:send"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    data = {
        "message": {
            "token": messagingToken,
            "notification": {
                "title": title,
                "body": body,
                "image": image
            },
        }
    }
    response = requests.post(url, headers=headers, data=json.dumps(data))
    return response.text

# Ejemplo de uso
response = send_notification(
    messagingToken="dqhn7HZLFP5YUXA8wLVV6I:APA91bFM5Mv5Pf1RKwQVW-XbXNfIKtEjx392nKpijlycdzlpPCfUUteb_kiWG8NNXbCdFZfk1GVES719i6xnidgnlcRllTUbJ5TYnTchFgwJIXQAVQdkrAkRxYswtqfrh2-mgfeDMi7D",
    title="Notification Title",
    body="Notification Body",
    image="https://i.pinimg.com/736x/65/c7/92/65c79220900fd9748639ed6da44565a7.jpg"
)

print(response)