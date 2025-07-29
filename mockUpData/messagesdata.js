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
    driver_id: 1,
    profilePic: images.profileImage1,
    name: "Marvin McKinney",
    email: "marvinmckinney@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver",
    phone: "+231776000000",
    rating: "4.80",
    latitude: 6.318530,
    longitude: -10.807472,
    driverCar: {
      image:images.truck, 
      cartype: "SEDAN",
      price: 4.50
    }
  },
  {
    driver_id: 2,
    profilePic: images.profileImage2,
    name: "Jessica Smith",
    email: "jessicasmith@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver",
    phone: "+231776000000",
    rating: "3.80",
    latitude: 6.249000,
    longitude: -10.348621,
    driverCar: {
      image: images.daco,
      cartype: "SUV",
      price: 5.00,
    }
  },
  {
    driver_id: 3,
    profilePic: images.profileImage3,
    name: "Amber Wilkes",
    email: "amberwilkes@gmail.com",
    location: "Montserrado, Monrovia, Liberia",
    role: "Driver",
    rating: "5.00",
    latitude: 6.319855,
    longitude:-10.805817,
    driverCar: {
      image: images.top,
      cartype: "SEDAN",
      price: 3.75
    }
  },
  {
  driver_id: 4,
  profilePic: images.profileImage1,
  name: "David Mensah",
  email: "davidmensah@gmail.com",
  location: "Bong County, Liberia",
  role: "Driver",
  rating: "2.85",
  latitude:6.313450,
  longitude: -10.808136,
  driverCar: {
    image:images.top, 
    cartype: "SUV",
  }
},
{
  driver_id: 5,
  profilePic: images.profileImage4,
  name: "Grace Johnson",
  email: "gracejohnson@gmail.com",
  location: "Nimba County, Liberia",
  role: "Driver",
  rating: "4.92",
  latitude:6.264532,
  longitude:-10.703967,
  driverCar: {
    image:images.truck, 
    cartype: "SUV",
  }
},
{
  driver_id: 6,
  profilePic: images.profileImage4,
  name: "Samuel Conteh",
  email: "samuelconteh@gmail.com",
  location: "Lofa County, Liberia",
  role: "Driver",
  rating: "3.78",
  latitude:6.287819,
  longitude:-10.769834,
  driverCar: {
    image:images.daco, 
    cartype: "SUV",
  }
}

];



export const trips = [
  {
    ride_id: "trip_001",
    origin_address: "100 Broad St, Monrovia, Liberia",
    destination_address: "University of Liberia, Monrovia",
    origin_latitude: 6.3006,
    origin_longitude: -10.7969,
    destination_latitude: 6.3103,
    destination_longitude: -10.8012,
    ride_time: "2025-07-10T09:30:00Z",
    fare_price: 6.75,
    payment_status: "paid",
    driver_id: 1,
    user_id: "user_001",
    created_at: "2025-07-10T09:00:00Z",
    driver: {
      driver_id: 1,
      profilePic: images.profileImage1,
      name: "Marvin McKinney",
      email: "marvinmckinney@gmail.com",
      location: "Montserrado, Monrovia, Liberia",
      role: "Driver",
      phone: "+231776000000",
      rating: "4.80"
    }
  },
  {
    ride_id: "trip_002",
    origin_address: "ELWA Junction, Paynesville, Liberia",
    destination_address: "Red Light Market, Liberia",
    origin_latitude: 6.3100,
    origin_longitude: -10.6780,
    destination_latitude: 6.3324,
    destination_longitude: -10.6891,
    ride_time: "2025-07-11T14:15:00Z",
    fare_price: 4.00,
    payment_status: "unpaid",
    driver_id: 2,
    user_id: "user_002",
    created_at: "2025-07-11T14:00:00Z",
    driver: {
      driver_id: 2,
      profilePic: images.profileImage2,
      name: "Jessica Smith",
      email: "jessicasmith@gmail.com",
      location: "Montserrado, Monrovia, Liberia",
      role: "Driver",
      phone: "+231776000000",
      rating: "3.80"
    }
  },
  {
    ride_id: "trip_003",
    origin_address: "Sinkor 19th Street, Monrovia, Liberia",
    destination_address: "JFK Medical Center, Monrovia",
    origin_latitude: 6.2961,
    origin_longitude: -10.7792,
    destination_latitude: 6.2994,
    destination_longitude: -10.7817,
    ride_time: "2025-07-12T11:45:00Z",
    fare_price: 5.50,
    payment_status: "paid",
    driver_id: 3,
    user_id: "user_003",
    created_at: "2025-07-12T11:30:00Z",
    driver: {
      driver_id: 3,
      profilePic: images.profileImage3,
      name: "Amber Wilkes",
      email: "amberwilkes@gmail.com",
      location: "Montserrado, Monrovia, Liberia",
      role: "Driver",
      rating: "5.00"
    }
  },
  {
    ride_id: "trip_004",
    origin_address: "Camp Johnson Rd, Monrovia, Liberia",
    destination_address: "City Hall, Tubman Blvd, Liberia",
    origin_latitude: 6.3095,
    origin_longitude: -10.7970,
    destination_latitude: 6.3109,
    destination_longitude: -10.7899,
    ride_time: "2025-07-13T08:00:00Z",
    fare_price: 3.25,
    payment_status: "paid",
    driver_id: 1,
    user_id: "user_004",
    created_at: "2025-07-13T07:40:00Z",
    driver: {
      driver_id: 1,
      profilePic: images.profileImage1,
      name: "Marvin McKinney",
      email: "marvinmckinney@gmail.com",
      location: "Montserrado, Monrovia, Liberia",
      role: "Driver",
      phone: "+231776000000",
      rating: "4.80"
    }
  },
  {
    ride_id: "trip_005",
    origin_address: "SKD Blvd, Paynesville, Liberia",
    destination_address: "Monrovia Mall, Tubman Blvd, Liberia",
    origin_latitude: 6.2951,
    origin_longitude: -10.7120,
    destination_latitude: 6.3124,
    destination_longitude: -10.7935,
    ride_time: "2025-07-14T17:20:00Z",
    fare_price: 6.00,
    payment_status: "unpaid",
    driver_id: 2,
    user_id: "user_005",
    created_at: "2025-07-14T17:00:00Z",
    driver: {
      driver_id: 2,
      profilePic: images.profileImage2,
      name: "Jessica Smith",
      email: "jessicasmith@gmail.com",
      location: "Montserrado, Monrovia, Liberia",
      role: "Driver",
      phone: "+231776000000",
      rating: "3.80"
    }
  }
];



