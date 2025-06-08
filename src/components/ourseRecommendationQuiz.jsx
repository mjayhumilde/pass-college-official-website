import { useState, useRef, useEffect } from "react";
import {
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  X,
} from "lucide-react";

export default function CourseRecommendationQuiz() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const modalRef = useRef(null);

  // Close clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Quiz questions - 20 question
  const questions = [
    {
      id: 1,
      text: "I enjoy working with numbers and financial data.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 2,
      text: "I am interested in how businesses operate and grow.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 3,
      text: "I enjoy solving problems with technology and computers.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 4,
      text: "I am passionate about justice and maintaining social order.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 5,
      text: "I enjoy teaching and helping others learn new things.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 6,
      text: "I am interested in travel and exploring different cultures.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 7,
      text: "I enjoy providing service and creating positive experiences for others.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 8,
      text: "I am detail-oriented and organized when managing information.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 9,
      text: "I enjoy analyzing trends and making strategic decisions.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 10,
      text: "I am comfortable learning programming languages and building software.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 11,
      text: "I am interested in understanding criminal behavior and legal procedures.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 12,
      text: "I enjoy creating lesson plans and educational content.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 13,
      text: "I would enjoy planning and coordinating tours, events or travel experiences.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 14,
      text: "I am interested in hotel operations and food service management.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 15,
      text: "I enjoy preparing financial statements and analyzing budgets.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 16,
      text: "I am good at negotiating and persuading others.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 17,
      text: "I enjoy solving complex logical problems and puzzles.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 18,
      text: "I am interested in physical training and maintaining security.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 19,
      text: "I enjoy working with children and helping them develop.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
    {
      id: 20,
      text: "I would enjoy presenting information about local attractions and history.",
      options: [
        { value: "strongly_agree", label: "Strongly Agree" },
        { value: "agree", label: "Agree" },
        { value: "neutral", label: "Neutral" },
        { value: "disagree", label: "Disagree" },
        { value: "strongly_disagree", label: "Strongly Disagree" },
      ],
    },
  ];

  // Course mappings for interest areas
  const courseMapping = {
    accountancy: "Bachelor of Science in Accountancy",
    business: "Bachelor of Science in Business Administration",
    computer_science: "Bachelor of Science in Computer Science",
    criminology: "Bachelor of Science in Criminology",
    education: "Bachelor of Science in Elementary Education",
    tourism: "Bachelor of Science in Tourism Management",
    hospitality: "Bachelor of Science in Hospitality Management",
  };

  // Handle option selection
  const handleOptionSelect = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Handle next question
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResult();
      setQuizCompleted(true);
    }
  };

  // Handle previous question
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Calculate quiz results
  const calculateResult = () => {
    // Initialize scores for each course
    const scores = {
      accountancy: 0,
      business: 0,
      computer_science: 0,
      criminology: 0,
      education: 0,
      tourism: 0,
      hospitality: 0,
    };

    // Score mapping for answers
    const scoreValues = {
      strongly_agree: 5,
      agree: 4,
      neutral: 3,
      disagree: 2,
      strongly_disagree: 1,
    };

    // Calculate scores based on questions and answers
    // Questions 1, 8, 15 relate to accountancy
    if (answers[1]) scores.accountancy += scoreValues[answers[1]];
    if (answers[8]) scores.accountancy += scoreValues[answers[8]];
    if (answers[15]) scores.accountancy += scoreValues[answers[15]];

    // Questions 2, 9, 16 relate to business administration
    if (answers[2]) scores.business += scoreValues[answers[2]];
    if (answers[9]) scores.business += scoreValues[answers[9]];
    if (answers[16]) scores.business += scoreValues[answers[16]];

    // Questions 3, 10, 17 relate to computer science
    if (answers[3]) scores.computer_science += scoreValues[answers[3]];
    if (answers[10]) scores.computer_science += scoreValues[answers[10]];
    if (answers[17]) scores.computer_science += scoreValues[answers[17]];

    // Questions 4, 11, 18 relate to criminology
    if (answers[4]) scores.criminology += scoreValues[answers[4]];
    if (answers[11]) scores.criminology += scoreValues[answers[11]];
    if (answers[18]) scores.criminology += scoreValues[answers[18]];

    // Questions 5, 12, 19 relate to education
    if (answers[5]) scores.education += scoreValues[answers[5]];
    if (answers[12]) scores.education += scoreValues[answers[12]];
    if (answers[19]) scores.education += scoreValues[answers[19]];

    // Questions 6, 13, 20 relate to tourism
    if (answers[6]) scores.tourism += scoreValues[answers[6]];
    if (answers[13]) scores.tourism += scoreValues[answers[13]];
    if (answers[20]) scores.tourism += scoreValues[answers[20]];

    // Questions 7, 14 relate to hospitality
    if (answers[7]) scores.hospitality += scoreValues[answers[7]];
    if (answers[14]) scores.hospitality += scoreValues[answers[14]];

    // Find the course with the highest score
    let maxScore = 0;
    let recommendedCourse = "";

    for (const [course, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        recommendedCourse = course;
      }
    }

    setResult(courseMapping[recommendedCourse]);
  };

  // Reset the quiz
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setQuizCompleted(false);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
    resetQuiz();
  };

  return (
    <div className="relative font-sans">
      <div
        onClick={() => setIsOpen(true)}
        className="absolute hidden p-1 font-bold text-center -left-44 bottom-2 bg-red-primary rounded-2xl text-red-50 hover:cursor-pointer"
      >
        recommendation quiz
      </div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-3 text-white transition-shadow rounded-full shadow-lg animate-bounce hover:shadow-xl hover:cursor-pointer"
        style={{ backgroundColor: "rgb(128 0 0)" }}
      >
        <HelpCircle size={24} />
      </button>

      {/* Quiz Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-opacity-50 bg-black/50">
          <div
            ref={modalRef}
            className="w-full max-w-lg overflow-hidden bg-white rounded-lg shadow-xl"
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between p-4 text-white"
              style={{ backgroundColor: "rgb(128 0 0)" }}
            >
              <h2 className="text-xl font-bold">Course Recommendation Quiz</h2>
              <button
                onClick={closeModal}
                className="text-white hover:cursor-pointer"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {!quizCompleted ? (
                <>
                  {/* Progress Bar */}
                  <div className="w-full h-2 mb-6 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${
                          ((currentQuestionIndex + 1) / questions.length) * 100
                        }%`,
                        backgroundColor: "rgb(128 0 0)",
                      }}
                    ></div>
                  </div>

                  {/* Question */}
                  <div className="mb-6">
                    <h3 className="mb-2 text-lg font-medium">
                      Question {currentQuestionIndex + 1} of {questions.length}
                    </h3>
                    <p className="text-gray-700">
                      {questions[currentQuestionIndex].text}
                    </p>
                  </div>

                  {/* Options */}
                  <div className="mb-6 space-y-3">
                    {questions[currentQuestionIndex].options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() =>
                          handleOptionSelect(
                            questions[currentQuestionIndex].id,
                            option.value
                          )
                        }
                        className={`w-full p-3 rounded-md border transition-colors flex items-center hover:cursor-pointer ${
                          answers[questions[currentQuestionIndex].id] ===
                          option.value
                            ? "text-white"
                            : "bg-white text-gray-700 border-gray-300"
                        }`}
                        style={
                          answers[questions[currentQuestionIndex].id] ===
                          option.value
                            ? {
                                backgroundColor: "rgb(128 0 0)",
                                borderColor: "rgb(128 0 0)",
                              }
                            : {
                                borderColor:
                                  answers[
                                    questions[currentQuestionIndex].id
                                  ] === option.value
                                    ? "rgb(128 0 0)"
                                    : "",
                              }
                        }
                      >
                        <span className="mr-2">
                          {answers[questions[currentQuestionIndex].id] ===
                          option.value ? (
                            <CheckCircle size={18} />
                          ) : (
                            <div className="w-4 h-4 border border-current rounded-full"></div>
                          )}
                        </span>
                        {option.label}
                      </button>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={handlePrevious}
                      disabled={currentQuestionIndex === 0}
                      className={`flex items-center font-bold justify-center rounded-full ${
                        currentQuestionIndex === 0
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:cursor-pointer"
                      } px-4 py-2 `}
                    >
                      <ChevronLeft size={16} className="mr-1" /> Previous
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!answers[questions[currentQuestionIndex].id]}
                      className={`flex items-center font-bold justify-center rounded-full ${
                        !answers[questions[currentQuestionIndex].id]
                          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                          : "text-white hover:bg-opacity-90 hover:cursor-pointer"
                      } px-4 py-2 `}
                      style={
                        !answers[questions[currentQuestionIndex].id]
                          ? {}
                          : { backgroundColor: "rgb(128 0 0)" }
                      }
                    >
                      {currentQuestionIndex < questions.length - 1
                        ? "Next"
                        : "Finish"}
                      <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </>
              ) : (
                // Results Screen
                <div className="py-8 text-center">
                  <div className="mb-6">
                    <div
                      className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-white rounded-full"
                      style={{ backgroundColor: "rgb(128 0 0)" }}
                    >
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="mb-2 text-2xl font-bold">Your Result</h3>
                    <p className="mb-6 text-gray-600">
                      Based on your responses, we recommend:
                    </p>
                    <div
                      className="p-4 mb-8 rounded-lg"
                      style={{
                        backgroundColor: "rgba(128, 0, 0, 0.1)",
                        borderColor: "rgb(128 0 0)",
                        borderWidth: "1px",
                      }}
                    >
                      <p
                        className="text-xl font-bold"
                        style={{ color: "rgb(128 0 0)" }}
                      >
                        {result}
                      </p>
                    </div>
                    <p className="mb-6 text-sm text-gray-600">
                      This recommendation is based on your interests and
                      aptitudes. We encourage you to explore this program
                      further and consult with academic advisors.
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="px-6 py-2 font-bold text-white transition-colors rounded-full hover:bg-opacity-90 hover:cursor-pointer"
                      style={{ backgroundColor: "rgb(128 0 0)" }}
                    >
                      Take Quiz Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
