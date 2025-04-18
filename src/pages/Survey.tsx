
import React, { useState } from "react";
import { FiArrowRight, FiCheck, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { GlassCard } from "@/components/GlassCard";

type Challenge = "Procrastination" | "Distractions" | "Setbacks" | "Creative Block";

const Survey = () => {
  const navigate = useNavigate();
  const { setSelectedTheme } = useApp();
  const [formData, setFormData] = useState({
    challenge: "Procrastination" as Challenge,
    goal: "",
    timeCommitment: "30"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      // Validate form data
      if (!formData.goal.trim()) {
        throw new Error("Please fill out all fields");
      }
      
      // Map challenge to theme
      const themeMap = {
        "Procrastination": "Discipline",
        "Distractions": "Focus",
        "Setbacks": "Resilience",
        "Creative Block": "Wildcards"
      };
      
      const theme = themeMap[formData.challenge] as "Discipline" | "Focus" | "Resilience" | "Wildcards";
      
      // Save selected theme
      setSelectedTheme(theme);
      
      // Simulate API call to generate roadmap with a loading animation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to quests page
      navigate("/quests");
    } catch (error) {
      console.error("Error submitting survey:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  
  const goToNextStep = () => {
    setStep(prev => prev + 1);
  };
  
  const goToPrevStep = () => {
    setStep(prev => prev - 1);
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-6">What's your biggest challenge?</h2>
            <div className="space-y-4">
              {["Procrastination", "Distractions", "Setbacks", "Creative Block"].map((challenge) => (
                <div 
                  key={challenge}
                  onClick={() => setFormData(prev => ({ ...prev, challenge: challenge as Challenge }))}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-300 cursor-pointer
                    ${formData.challenge === challenge ? 
                      'bg-[#222222] border border-[#444444] shadow-lg' : 
                      'bg-[#121212] border border-[#333333] hover:border-[#444444]'}
                  `}
                >
                  <span className="font-medium text-white">{challenge}</span>
                  {formData.challenge === challenge && <FiCheck className="text-white" />}
                </div>
              ))}
            </div>
            <button 
              type="button" 
              className="w-full mt-8 py-4 bg-white text-black rounded-xl flex items-center justify-center gap-2 font-semibold text-lg transition-all hover:bg-[#EEEEEE] active:scale-[0.98]"
              onClick={goToNextStep}
            >
              Continue <FiArrowRight />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-2">Your Goal</h2>
            <p className="text-[#AAAAAA] text-center text-sm mb-6">What do you want to achieve with Solivrah?</p>
            <textarea
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              placeholder="e.g., Build consistent habits, Improve focus, Overcome procrastination..."
              className="w-full p-4 rounded-xl text-white bg-[#121212] border border-[#333333] min-h-[150px] resize-none focus:border-[#444444] outline-none transition-all duration-300"
            />
            <div className="flex gap-3 mt-8">
              <button 
                type="button" 
                className="flex-1 py-3.5 bg-[#222222] text-white rounded-xl flex items-center justify-center gap-2 border border-[#333333] transition-all hover:bg-[#333333] active:scale-[0.98]"
                onClick={goToPrevStep}
              >
                <FiArrowLeft /> Back
              </button>
              <button 
                type="button" 
                className="flex-1 py-3.5 bg-white text-black rounded-xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-[#EEEEEE] active:scale-[0.98]"
                onClick={goToNextStep}
              >
                Continue <FiArrowRight />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold text-center mb-2">Time Commitment</h2>
            <p className="text-[#AAAAAA] text-center text-sm mb-6">How much time can you dedicate daily?</p>
            
            <div className="mb-8">
              <div className="text-center mb-3">
                <span className="text-3xl font-bold text-white">{formData.timeCommitment} minutes/day</span>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#AAAAAA]">5 min</span>
                <span className="text-sm text-[#AAAAAA]">60 min</span>
              </div>
              
              <input
                type="range"
                name="timeCommitment"
                min="5"
                max="60"
                step="5"
                value={formData.timeCommitment}
                onChange={handleChange}
                className="w-full accent-white"
              />
              
              <div className="flex justify-between mt-2">
                <span className="text-xs text-[#AAAAAA]">Minimal</span>
                <span className="text-xs text-[#AAAAAA]">Recommended</span>
                <span className="text-xs text-[#AAAAAA]">Dedicated</span>
              </div>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button 
                type="button" 
                className="flex-1 py-3.5 bg-[#222222] text-white rounded-xl flex items-center justify-center gap-2 border border-[#333333] transition-all hover:bg-[#333333] active:scale-[0.98]"
                onClick={goToPrevStep}
              >
                <FiArrowLeft /> Back
              </button>
              <button 
                type="submit" 
                className="flex-1 py-4 bg-white text-black rounded-xl flex items-center justify-center gap-2 font-medium transition-all hover:bg-[#EEEEEE] active:scale-[0.98]"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Creating...</span>
                  </div>
                ) : (
                  <>Generate Roadmap <FiArrowRight /></>
                )}
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-black pb-6 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#333333]/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#444444]/10 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="p-6 space-y-8 z-10 relative max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-white animate-fade-in mt-8">Let's Get Started</h1>
        
        <GlassCard variant="dark" className="animate-pop-in">
          {renderStep()}
        </GlassCard>
        
        {error && (
          <div className="text-red-500 text-center p-3 bg-[#121212] border border-red-500/20 rounded-xl animate-shake">
            {error}
          </div>
        )}
        
        <div className="flex justify-center space-x-3 mt-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step === i ? 'bg-white scale-125' : 'bg-[#333333]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Survey;
