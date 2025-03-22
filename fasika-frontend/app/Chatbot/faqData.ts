const faqData = [
  {
    "question": "How do I apply for admission?",
    "answer": "You can apply online through our admissions portal."
  },
  {
    "question": "What documents are required?",
    "answer": "You need a birth certificate, immunization card, and passport photos."
  },
  {
    "question": "What is the admission process?",
    "answer": "The process includes application submission, child assessment, and parent-teacher meeting."
  },
  {
    "question": "What are your operating hours?",
    "answer": "Our daycare is open from 7:00 AM to 6:00 PM, Monday through Friday."
  },
  {
    "question": "What ages do you accept?",
    "answer": "We accept children from 6 months to 5 years old."
  },
  {
    "question": "Do you provide meals and snacks?",
    "answer": "Yes, we provide healthy meals and snacks throughout the day, following nutritional guidelines."
  },
  {
    "question": "What is your staff-to-child ratio?",
    "answer": "We maintain a low staff-to-child ratio of 1:4 to ensure personalized care and attention."
  },
  {
    "question": "Do you offer part-time or drop-in care?",
    "answer": "Yes, we offer both part-time and drop-in care options. Please contact us for availability."
  },
  {
    "question": "What safety measures do you have in place?",
    "answer": "We have secure entry systems, CCTV monitoring, and trained staff certified in CPR and first aid."
  },
  {
    "question": "What is your sick child policy?",
    "answer": "Children with fever, vomiting, or contagious illnesses must stay home until they are symptom-free for 24 hours."
  },
  {
    "question": "Do you administer medication?",
    "answer": "Yes, we can administer medication with a signed consent form and clear instructions from the parent."
  },
  {
    "question": "Are your staff trained in first aid?",
    "answer": "Yes, all our staff members are trained in first aid and CPR."
  },
  {
    "question": "What is your daily schedule like?",
    "answer": "Our daily schedule includes free play, structured learning activities, outdoor play, nap time, and meal times."
  },
  {
    "question": "Do you follow a specific curriculum?",
    "answer": "Yes, we follow a play-based learning curriculum that focuses on social, emotional, and cognitive development."
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
    "question": "How do I enroll my child?",
    "answer": "You can enroll your child by filling out our online enrollment form or visiting us in person."
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
    "answer": "A late fee of $10 per 15 minutes will be charged for pickups after 6:00 PM."
  },
  {
    "question": "Do you allow visitors during the day?",
    "answer": "Parents are welcome to visit during operating hours, but all visitors must check in at the front desk."
  },
  {
    "question": "What is your holiday schedule?",
    "answer": "We are closed on major holidays, including New Year's Day, Thanksgiving, and Christmas."
  },
  {
    "question": "Do you accommodate children with special needs?",
    "answer": "Yes, we work with families to accommodate children with special needs. Please contact us to discuss your child's requirements."
  },
  {
    "question": "Do you have a speech therapist on staff?",
    "answer": "We do not have a speech therapist on staff, but we can provide referrals to local specialists."
  },
  {
    "question": "Can parents participate in activities?",
    "answer": "Yes, we encourage parents to participate in special events and activities throughout the year."
  },
  {
    "question": "How do you communicate with parents about their child's progress?",
    "answer": "We provide daily updates through our app and hold parent-teacher conferences twice a year."
  },
  {
    "question": "Do you offer parent workshops or resources?",
    "answer": "Yes, we offer workshops on topics like child development, nutrition, and positive parenting."
  },
  {
    "question": "Do you provide transportation?",
    "answer": "No, we do not provide transportation at this time."
  },
  {
    "question": "Can I tour your facility before enrolling?",
    "answer": "Yes, we welcome tours! Please schedule an appointment with us."
  },
  {
    "question": "What should my child bring to daycare?",
    "answer": "Please bring a change of clothes, diapers (if applicable), and any comfort items like a blanket or stuffed animal."
  },
  {
    "question": "Do you celebrate birthdays?",
    "answer": "Yes, we celebrate birthdays with a small party during snack time. Parents are welcome to bring treats."
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
    "answer": "We use positive reinforcement and redirection to guide children's behavior in a constructive way."
  },
  {
    "question": "Do you have a nap or rest time?",
    "answer": "Yes, we have a designated nap or rest time to ensure children get adequate rest during the day."
  },
  {
    "question": "How do you handle potty training?",
    "answer": "We work closely with parents to support potty training and follow their preferred methods."
  },
  {
    "question": "Do you offer extracurricular activities?",
    "answer": "Yes, we offer extracurricular activities such as music, dance, and sports."
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
    "question": "Do you have a parent advisory board?",
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