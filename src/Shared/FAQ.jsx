import { FaQuestionCircle, FaHeartbeat, FaUserShield } from "react-icons/fa";
import { MdBloodtype, MdOutlinePrivacyTip } from "react-icons/md";
import { Link } from "react-router";

const faqs = [
  {
    id: 1,
    icon: <MdBloodtype />,
    question: "Who can donate blood?",
    answer:
      "Most healthy adults aged between 18 and 60 years can donate blood. You should be in good health, weigh at least 50 kg, and meet basic medical requirements.",
  },
  {
    id: 2,
    icon: <FaHeartbeat />,
    question: "How often can I donate blood?",
    answer:
      "A healthy person can donate blood every 3 to 4 months. This allows your body enough time to restore blood levels safely.",
  },
  {
    id: 3,
    icon: <FaUserShield />,
    question: "Is blood donation safe?",
    answer:
      "Yes. Blood donation is completely safe. All equipment used is sterile and disposable, and donors are medically screened before donation.",
  },
  {
    id: 4,
    icon: <MdOutlinePrivacyTip />,
    question: "How is my personal information protected?",
    answer:
      "We take data privacy seriously. Your personal information is securely stored and shared only when necessary for donation-related purposes.",
  },
  {
    id: 5,
    icon: <FaQuestionCircle />,
    question: "What should I do before donating blood?",
    answer:
      "Eat a healthy meal, stay hydrated, get enough sleep, and avoid smoking or alcohol before donating blood.",
  },
  {
    id: 6,
    icon: <FaQuestionCircle />,
    question: "What happens after I donate blood?",
    answer:
      "After donation, you’ll rest briefly, receive refreshments, and be advised to avoid heavy activity for the next 24 hours.",
  },
];

const FAQ = () => {
  return (
    <section className="relative py-28 px-6 lg:px-28 bg-base-100 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-20 max-w-3xl mx-auto">
        <div className="text-primary font-semibold tracking-[3px] uppercase mb-4">
          FAQ
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-base-300 mb-6">
          Frequently Asked Questions
        </h2>
        <p className="text-accent text-lg">
          Find answers to common questions about blood donation, safety, and how
          Red Care works.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="collapse collapse-arrow bg-base-200 border border-base-300 rounded-xl"
          >
            <input type="checkbox" />

            <div className="collapse-title flex items-center gap-4 text-lg font-semibold text-base-300">
              <span className="text-primary text-xl">
                {faq.icon}
              </span>
              {faq.question}
            </div>

            <div className="collapse-content text-accent leading-relaxed">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="text-center mt-20 text-accent">
        <p>
          Still have questions?{" "}
          <Link to='/contact' className="text-primary font-semibold cursor-pointer hover:underline">
            Contact our support team
          </Link>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
