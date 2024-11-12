import React from 'react';
import '../styles/styles.css';

const FAQ = () => {
  const faqData = [
    {
      question: "How do I exchange a book?",
      answer: "To exchange a book, simply browse the books available for exchange in our platform, and if you find one you're interested in, click on the book to make an exchange request with the owner."
    },
    {
      question: "Do I need to create an account to participate?",
      answer: "Yes, you must create an account to exchange books. This helps us track your exchanges and ensure smooth communication with other users."
    },
    {
      question: "Is there a fee to exchange books?",
      answer: "No, our book exchange platform is completely free. We believe in sharing books without any cost involved."
    },
    {
      question: "Can I exchange books with users from other locations?",
      answer: "Yes, you can exchange books with users from any location. However, please check if the user is willing to ship the book to your area."
    },
    {
      question: "How do I list my book for exchange?",
      answer: "You can list your book by going to the 'Add Book' section of the platform. There, you can provide details about the book and set up the exchange preferences."
    },
    {
      question: "What happens if a book is damaged during shipping?",
      answer: "If a book is damaged during shipping, we recommend contacting the other user and reaching a mutual solution. You can also report issues to our support team for assistance."
    },
    {
      question: "Can I get my book back after an exchange?",
      answer: "Once a book is exchanged, it is typically considered part of the exchange. However, you can always communicate with the user and see if they are willing to trade the book back."
    }
  ];

  return (
    <div className="faq-container">
      <h1>Frequently Asked Questions</h1>
      {faqData.map((faq, index) => (
        <div key={index} className="faq-item">
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
