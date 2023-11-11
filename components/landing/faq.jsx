import React from 'react';

const FAQ = ({ faqData }) => {
    return (
        <div className="max-w-screen-lg ml-40 mt-44 p-4">
            <p className="text-4xl text-center font-semibold mb-8 text-emerald-900">FAQs</p>
            <ul>
                {faqData.map((item, index) => (
                    <li key={index} className="mb-8 text-2xl">
                        <span className="font-semibold">{item.question}</span>
                        <p className="text-gray-700">{item.answer}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FAQ;
