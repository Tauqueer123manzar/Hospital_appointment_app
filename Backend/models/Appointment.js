const Appointment=[
    {
        "_id": "appointment_id_1",
        "doctor": {
          "name": "Dr. John Doe",
          "department": "Cardiology",
          "image": "https://example.com/doctor1.jpg"
        },
        "date": "2024-09-30",
        "time": "10:00 AM",
        "description": "Follow-up for heart check-up",
        "visited": true
      },
      {
        "_id": "appointment_id_2",
        "doctor": {
          "name": "Dr. Jane Smith",
          "department": "Dermatology",
          "image": "https://example.com/doctor2.jpg"
        },
        "date": "2024-10-05",
        "time": "12:00 PM",
        "description": "",
        "visited": false
      }
]
module.exports=Appointment