import firebase_admin
from firebase_admin import credentials
from firebase_admin import messaging

serviceAccountKeyPath = 'References\\send-notification\\fir-notif-e0f99-firebase-adminsdk-poo90-15b6656bad.json'

cred = credentials.Certificate(serviceAccountKeyPath)
firebase_admin.initialize_app(cred)

def subscribe_tokens_to_topic(tokens, topic):
    response = messaging.subscribe_to_topic(tokens, topic)
    print('Successfully subscribed tokens:', response.success_count)

def unsubscribe_tokens_from_topic(tokens, topic):
    response = messaging.unsubscribe_from_topic(tokens, topic)
    print('Successfully unsubscribed tokens:', response.success_count)

def send_notification_to_topic(topic, title, body, image='https://via.placeholder.com/150'):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body,
            image=image
        ),
        topic=topic,
    )
    response = messaging.send(message)
    print('Successfully sent message:', response)

if __name__ == '__main__':
    # Example of usage

    image_url = 'https://i.pinimg.com/736x/65/c7/92/65c79220900fd9748639ed6da44565a7.jpg'

    tokens = ['c7Qb3KC7wUFgkprovB6zZF:APA91bEUaeLa_aUKZJl6VLcAjmD-OsQBqGjg7F_w1YbUK1mScSpkFHgYhuA17iVRvD2FZUiy_Ed5rVkxQghdhWbo79mSu8DW1Z-_PeAM8PS7ZqjKYoaQ59reI2Z4Wo2RUuWkja7Sww5Z', 'dqhn7HZLFP5YUXA8wLVV6I:APA91bFM5Mv5Pf1RKwQVW-XbXNfIKtEjx392nKpijlycdzlpPCfUUteb_kiWG8NNXbCdFZfk1GVES719i6xnidgnlcRllTUbJ5TYnTchFgwJIXQAVQdkrAkRxYswtqfrh2-mgfeDMi7D',
    'ctYG5GmBgrUbetBkhHR7JY:APA91bHUXb4InYc8X_WqCxmml1AD8DAQbEmqRdSxlWC0H-pqlan6vsszKGfyqp9Oqbj6fjdqS3leSdyxBXzpNuV82YufwOqkYMmdxy28a-o7GwltX3jj9MS_Klfhsoo1IvyhWOXc3ODT',
    'crzUD7HJe9E9h7mAIL65C7:APA91bFB1m3XWn4DS0hL576tufQLQRwXBJ4Pt2xuo3_31Qx3SuMgPVDXx3oskXCvFH3-i-kCpdrEXTAtKtwYJ_jjdSOy-rx2dYBqFxNpB5jkZbZPiwKiX9wkiKsN-SXqlu19KIhzhnkA']
    topic = 'olivos'

    subscribe_tokens_to_topic(tokens, topic)
    send_notification_to_topic(topic, 'Hola', 'webon', image_url)
    unsubscribe_tokens_from_topic(tokens, topic)
