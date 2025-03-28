const faqData = [
  {
    "question": "How do I enroll my child?",
    "answer": "You can enroll your child by filling out our online enrollment form or visiting us in person."
  },
  {
    "question": "What documents are required?",
    "answer": "You need a birth certificate, immunization card, and 4 passport size photos of the child and one photo of each parent"
  },
  {
    "question": "What is the admission process?",
    "answer": "The process includes application submission, child assessment, and parent-teacher meeting."
  },
  {
    "question": "What are your operating hours?",
    "answer": "the school’s  working hour is from 7:30 AM to  4:00 PM, Monday through Friday, while that of the daycare is from 6:30 AM to 6:30 PM Monday through Friday and 6:30 AM 12:30 PM on Saturdays."
  },
  {
    "question": "What ages do you accept?",
    "answer": "We accept children from 6 months to 4 years old for the daycare and 4 years to 6 years for the preschool"
  },
  {
    "question": "Do you provide meals and snacks?",
    "answer": "No, we don’t provide meals"
  },
  {
    "question": "What is your staff-to-child ratio?",
    "answer": "In the Daycare we maintain a low staff-to-child ratio of 1:4 to ensure personalized care and attention. For infants and special needs children it is 1:1. In the Preschool the teacher student ratio is 1:11 "
  },
  {
    "question": "Do you offer part-time or drop-in care?",
    "answer": "Yes, we offer both part-time and drop-in care options. Please contact us for availability."
  },
  {
    "question": "What safety measures do you have in place?",
    "answer": "We have secure entry systems, CCTV monitoring. We have clinical nurses who would provide first aid services and check children’s tempreture and other symptoms when they suspect some kind of health problem."
  },
  {
    "question": "What is your sick child policy?",
    "answer": "Children with fever, vomiting, or contagious illnesses must stay home until they are symptom-free for 24 hours."
  },
  {
    "question": "Do you administer medication?",
    "answer": "Yes, we do administer medication with a signed consent form and clear instructions from the parent. There is a medication authorization form that would be filled and signed by parents/guardians."
  },
  {
    "question": "Are your staff trained in first aid?",
    "answer": "Yes, all our staff members are trained in first aid, despite the fact that there is a clinical nurse in every branch"
  },
  {
    "question": "What is your daily schedule like?",
    "answer": "Our daily schedule includes free play, structured learning activities, outdoor play, nap time, and meal times."
  },
  {
    "question": "Do you follow a specific curriculum?",
    "answer": "Yes, we follow a play-based learning curriculum that focuses on social, emotional, and cognitive development, which is supplemented by Montessori Method ."
  },
  {
    "question": "Do you offer outdoor playtime?",
    "answer": "Yes, we have a secure outdoor play area where children can play and explore daily."
  },
  {
    "question": "Do you provide art and music activities?",
    "answer": "Yes, we incorporate art, music, and creative activities into our daily program."
  },
  {
    "question": "What is the cost of daycare?",
    "answer": "Our fees vary depending on the age of the child and the program selected. Please contact us for detailed pricing."
  },
  {
    "question": "Do you offer sibling discounts?",
    "answer": "Yes, we offer a 10% discount for siblings."
  },
  {
    "question": "Is there a waiting list?",
    "answer": "We do have a waiting list for certain age groups. Please contact us to check availability."
  },
  {
    "question": "What is your late pickup policy?",
    "answer": "At the Daycare,  late fee of Birr 100 per 30 minutes will be charged for pickups after 6:30 PM.The same amount is paid for late pickup (after 4:00 PM) of children from the Preschool. "
  },
  {
    "question": "Do you allow visitors during the day?",
    "answer": "Parents are welcome to visit during operating hours, but all visitors must check in at the front desk."
  },
  {
    "question": "What is your holiday schedule?",
    "answer": "We are closed on major religious holidays, including  Christmas, Easter Eid Alfetir, Eid Aladha, etc. and non-religious holidays such as  New Year, Commemoration of Battle of Adwa, etc"
  },
  {
    "question": "Do you accommodate (accept) children with special needs?",
    "answer": "Yes, we work with families to accommodate children with special needs. Please contact us to discuss your child's requirements."
  },
  {
    "question": "Do you have a speech therapist on staff?",
    "answer": "Yes, we have speech therapists at all branches of the daycare and in the preschool."
  },
  {
    "question": "Can parents participate in activities?",
    "answer": "Yes, we encourage parents to participate in special events and activities throughout the year."
  },
  {
    "question": "How do you communicate with parents about their child's progress?",
    "answer": "We provide daily updates through communication book, and our telegram chanel. We also hold parent-teacher conferences twice a year.."
  },
  {
    "question": "Do you offer parent workshops or resources?",
    "answer": "Yes, we offer workshops on topics like child development, nutrition, and positive parenting."
  },
  {
    "question": "Do you provide transportation?",
    "answer": "Yes, we do provide transportation, but have only one bus and it does not cover all locations. Please call and discuss the possibility of getting the service ahead of time."
  },
  {
    "question": "Can I tour your facility before enrolling?",
    "answer": "Yes, we welcome tours! Please schedule an appointment with us."
  },
  {
    "question": "What should my child bring to daycare?",
    "answer": "Please bring a change of clothes, diapers and wipes (if applicable), any comfort items like a blanket, bed sheets,  and slippers (if applicable)."
  },
  {
    "question": "Do you celebrate birthdays?",
    "answer": "Yes, we celebrate birthdays upon parents’ request. Please to the school management for details."
  },
  {
    "question": "What is your policy on screen time?",
    "answer": "We limit screen time to educational programs and only for short periods."
  },
  {
    "question": "How do you support early childhood development?",
    "answer": "We focus on play-based learning, social interaction, and age-appropriate activities to support your child's growth."
  },
  {
    "question": "What is your approach to discipline?",
    "answer": "We use positive reinforcement and redirection to guide children's behavior in a constructive way.Corporal punishment and verbal abuse is absolutely prohibited. Any Fasika staff found exercising this will be punished even be fired."
  },
  {
    "question": "Do you have a nap or rest time?",
    "answer": "Yes, we have a designated nap or rest time to ensure children get adequate rest during the day."
  },
  {
    "question": "How do you handle potty training?",
    "answer": "Yes, It will take only a couple of weeks for our experienced staff to train children, They of course work closely with parents to support potty training."
  },
  
  {
    "question": "How do you handle allergies and dietary restrictions?",
    "answer": "We accommodate allergies and dietary restrictions with customized meal plans and strict safety protocols."
  },
  {
    "question": "Do you have a secure entry system?",
    "answer": "Yes, we use a secure entry system to ensure only authorized individuals can access the facility."
  },
  {
    "question": "Is your facility monitored by CCTV?",
    "answer": "Yes, our facility is monitored by CCTV for added security."
  },
  {
    "question": "What is your emergency evacuation plan?",
    "answer": "We have a detailed emergency evacuation plan and conduct regular drills to ensure everyone's safety."
  },
  {
    "question": "Do you conduct background checks on staff?",
    "answer": "Yes, all staff members undergo thorough background checks before hiring."
  },
  {
    "question": "How do you ensure child safety during outdoor play?",
    "answer": "We have a secure outdoor play area and always supervise children during outdoor activities."
  },
  {
    "question": "Do you offer language or bilingual programs?",
    "answer": "Yes, we offer language programs to introduce children to new languages in a fun and engaging way."
  },
  {
    "question": "Do you have a parents’ committee?",
    "answer": "Yes, we have a parent advisory board to involve parents in decision-making and improvements."
  },
  {
    "question": "How do you handle parent feedback?",
    "answer": "We value parent feedback and use it to improve our programs and services."
  },
  {
    "question": "Can I volunteer at the daycare?",
    "answer": "Yes, we welcome parent volunteers and have a structured volunteer program."
  },
  {
    "question": "Do you have a lost and found policy?",
    "answer": "Yes, we have a lost and found area where parents can retrieve misplaced items."
  },
  {
    "question": "What is your policy on sunscreen and insect repellent?",
    "answer": "We apply sunscreen and insect repellent with parental consent and follow safety guidelines."
  },
  {
    "question": "Do you have a lost and found?",
    "answer": "Yes, we have a lost and found area where parents can retrieve misplaced items."
  },
  {
    "question": "How do you handle weather-related closures?",
    "answer": "We follow local guidelines and notify parents in advance of any weather-related closures."
  },
  {
    "question": "Do you offer summer programs or camps?",
    "answer": "Yes, we offer summer programs and camps with fun and educational activities."
  },
  {
    "question": "What is your policy on pets in the facility?",
    "answer": "We do not allow pets in the facility for safety and hygiene reasons."
  },
  {
    "question": "Do you have a parent handbook?",
    "answer": "Yes, we provide a parent handbook with detailed information about our policies and procedures."
  },
  {
    "question": "How do you handle transitions to kindergarten?",
    "answer": "We prepare children for kindergarten through age-appropriate activities and skill-building."
  },
  {
    "question": "What makes your daycare unique?",
    "answer": "Our daycare stands out for its play-based curriculum, experienced staff, and focus on individualized care."
  }
];

export default faqData;