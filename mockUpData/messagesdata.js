import images from "../constant/images"

export const userMessage = [
  {
    name: "Marvin McKinney",
    proPic: images.profileImage1,
    time: "11:11",
    messages: [
      "Contrary to popular belief, Lorem Ipsum is not simply random text.",
      "It has roots in classical Latin literature.",
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered       alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
    ]
  },
  {
    name: "Jessica Smith",
    proPic: images.profileImage2,
    time: "01:11",
    messages: ["It is a long established fact."]
  },
  {
    name: "Amber Wilkes",
    proPic: images.profileImage3,
    time: "01:11",
    messages: ["I'm waiting for your ride."]
  }
];


export const callData = [
  {
    name: "Marvin McKinny",
    date: "May 12",
    time: "09:10",
    type: "incoming",
    proPic: images.profileImage1,
    phone: "+231776000000" 
  },
  {
    name: "Jessica Smith",
    date: "May 12",
    time: "11:10",
    type: "outgoing",
    proPic: images.profileImage2,
  },
  {
    name: "Marvin McKinny",
    date: "May 12",
    time: "11:10",
    type: "outgoing",
    proPic: images.profileImage3,
  },
  {
    name: "Sandra Wills",
    date: "May 12",
    time: "11:10",
    type: "outgoing",
    proPic: images.profileImage4,
  },
];



export const convo = [
  {
    conversationId: "marvin_jessica", // your unique ID logic
    participants: ["marvin_uid", "jessica_uid"],
    lastUpdated: "2025-07-07T11:11:00Z",
    lastMessage: "There are many variations of passages of Lorem Ipsum available...",
    messages: [
      {
        text: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
        isSender: true,
        senderId: "marvin_uid",
        time: "2025-07-07T11:08:00Z"
      },
      {
        text: "It has roots in classical Latin literature.",
        isSender: true,
        senderId: "marvin_uid",
        time: "2025-07-07T11:09:00Z"
      },
      {
        text: "There are many variations of passages of Lorem Ipsum available...",
        isSender: false,
        senderId: "jessica_uid",
        time: "2025-07-07T11:11:00Z"
      }
    ]
  },

  {
    conversationId: "jessica_you",
    participants: ["jessica_uid", "your_uid"],
    lastUpdated: "2025-07-07T01:11:00Z",
    lastMessage: "It is a long established fact.",
    messages: [
      {
        text: "It is a long established fact.",
        isSender: true,
        senderId: "jessica_uid",
        time: "2025-07-07T01:11:00Z"
      }
    ]
  },

  {
    conversationId: "jessica_driver",
    participants: ["jessica_uid", "driver_uid"],
    lastUpdated: "2025-07-07T01:11:00Z",
    lastMessage: "I'm waiting for your ride.",
    messages: [
      {
        text: "I'm waiting for your ride.",
        isSender: true,
        senderId: "jessica_uid",
        time: "2025-07-07T01:11:00Z"
      }
    ]
  }
];

export const driversDetails = [
  {
    profilePic: images.profileImage1,
    name: "Marvin McKinney",
    email: "marvinmckinney@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver",
    phone: "+231776000000" 

  },
  {
    profilePic: images.profileImage2,
    name: "Jessica Smith",
    email: "jessicasmith@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver",
    phone: "+231776000000" 

  },
  {
    profilePic: images.profileImage3,
    name: "Amber Wilkes",
    email: "amberwilkes@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver"
  }
]

