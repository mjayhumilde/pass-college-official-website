import { useState } from "react";

export default function NewsletterSubscription() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (email && email.includes("@")) {
      setIsSubmitted(true);
      //  send the email to backend
      console.log("Subscribing email:", email);

      // Reset after 3 seconds for demo purposes
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail("");
      }, 3000);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-red-primary mb-2">
          Subscribe to our Newsletter!
        </h2>
        <p className="text-gray-600">
          Stay updated with our latest news and exclusive offers.
        </p>
      </div>

      {isSubmitted ? (
        <div className="text-center py-4">
          <div className="text-green-600 font-semibold mb-2">
            ✓ Thank you for subscribing!
          </div>
          <p className="text-gray-600 text-sm">You'll hear from us soon.</p>
        </div>
      ) : (
        <div className="sm:flex gap-3 space-y-3 justify-center items-center">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="block mb-5 sm:mb-0 w-full py-2 pl-10 pr-3 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm text-red-primary focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm"
          />
          <button
            onClick={handleSubmit}
            className=" w-full sm:w-auto px-6 py-3 text-white font-bold rounded-full transition-all duration-200 hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 bg-red-primary hover:cursor-pointer"
          >
            Subscribe
          </button>
        </div>
      )}
    </div>
  );
}
