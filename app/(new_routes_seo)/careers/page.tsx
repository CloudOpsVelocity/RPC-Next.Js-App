"use client"

import React, { useEffect, useState } from 'react';
import { FaBriefcase, FaCode, FaDollarSign, FaMapMarkerAlt, FaUsers, FaLaptopCode, FaChartLine, FaHandshake, FaTimes } from 'react-icons/fa';
import { BsBuildingsFill } from 'react-icons/bs';
import { MdWork, MdBusinessCenter, MdEmail, MdPhone } from 'react-icons/md';
import { sendMail } from '@/app/utils/mail/send-mail';




function App() {

  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const jobOpenings: JobOpening[] = [
    {
      id: 1,
      title: 'Senior Sales Executive',
      department: 'Sales',
      location: 'New York, NY',
      type: 'Full-time',
      description: 'Drive business growth through strategic B2B sales initiatives and relationship building.',
      icon: <FaChartLine className="w-5 h-5" />
    },
    {
      id: 2,
      title: 'Account Manager',
      department: 'Sales',
      location: 'San Francisco, CA',
      type: 'Full-time',
      description: 'Manage and grow existing client relationships while identifying new opportunities.',
      icon: <FaHandshake className="w-5 h-5" />
    },
    {
      id: 3,
      title: 'Senior Frontend Developer',
      department: 'Tech',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain modern web applications using React and TypeScript.',
      icon: <FaLaptopCode className="w-5 h-5" />
    },
    {
      id: 4,
      title: 'Backend Engineer',
      department: 'Tech',
      location: 'Austin, TX',
      type: 'Full-time',
      description: 'Develop scalable backend services and APIs using Node.js and PostgreSQL.',
      icon: <FaCode className="w-5 h-5" />
    }
  ];

  const initialFormState: ApplicationForm = {
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    coverLetter: '',
    resumeUrl: '', // This now holds the URL for the resume
  };

  const [formData, setFormData] = useState<ApplicationForm>(initialFormState);


  interface JobOpening {
    id: number;
    title: string;
    department: 'Sales' | 'Tech';
    location: string;
    type: string;
    description: string;
    icon: React.ReactNode;
  }

  interface ApplicationForm {
    fullName: string;
    email: string;
    phone: string;
    experience: string;
    coverLetter: string;
    resumeUrl: string; // Resume URL instead of file
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation(); // Prevent event from bubbling up
        setSelectedJob(null);
      }
    };

    const handlePopState = () => {
      setSelectedJob(null);
    };

    if (selectedJob) {
      document.addEventListener("keydown", handleEscape, true); // Use capture phase
      window.addEventListener("popstate", handlePopState);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape, true); // Clean up with capture phase
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "unset";
    };
  }, [selectedJob]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Application submitted successfully!');
    setSelectedJob(null);
    setFormData(initialFormState);
  }; */
/* 


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const mailerData = {
      to_address: 'example@example.com',  // Put your recipient's email here
      subject: `Job Application for ${selectedJob?.title}`,  // Use job title in the subject
      message: `
        Name: ${formData.fullName}
        Email: ${formData.email}
        Phone: ${formData.phone}
        Experience: ${formData.experience}
        Cover Letter: ${formData.coverLetter}
        Resume URL: ${formData.resumeUrl}
        Job Title: ${selectedJob?.title}
        Job Location: ${selectedJob?.location}
      `
    };

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailerData),
      });
      alert(JSON.stringify(mailerData))
      const result = await response.json();

      if (response.ok) {
        setSuccess(result.message || 'Email sent successfully');
        setFormData(initialFormState); // Reset form
        setSelectedJob(null); // Close modal
      } else {
        setError(result.message || 'Failed to send email');
      }
    } catch (err) {
      alert("gkjashgkashglkhldks")

      console.error('Error:', err);
      setError('Error sending email');
    }

    setLoading(false);
  }; */
  const handleSubmit = async (mailerData:any) => {
    const result = await sendMail(mailerData);
  
    if (result.success) {
      console.log(result.message);  // "Email sent successfully"
    } else {
      console.log(result.message);  // Error message
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center h-[300px] mt-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-4">
                <MdWork className="w-10 h-10" />
                <h1 className="text-4xl font-bold">Join Our Team</h1>
              </div>
              <div className="flex items-center gap-2">
                <FaUsers className="w-6 h-6" />
                <p className="text-xl">Build the future with us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sales Openings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaDollarSign className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-800">Sales Openings</h2>
            </div>
            <div className="space-y-4">
              {jobOpenings
                .filter(job => job.department === 'Sales')
                .map(job => (
                  <div 
                    key={job.id} 
                    className="border rounded-lg p-4 hover:border-blue-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {job.icon}
                        <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center gap-1">
                        <MdBusinessCenter className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{job.description}</p>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Tech Openings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <FaCode className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-800">Tech Openings</h2>
            </div>
            <div className="space-y-4">
              {jobOpenings
                .filter(job => job.department === 'Tech')
                .map(job => (
                  <div 
                    key={job.id} 
                    className="border rounded-lg p-4 hover:border-purple-500 transition-colors cursor-pointer"
                    onClick={() => setSelectedJob(job)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {job.icon}
                        <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                      </div>
                      <span className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded flex items-center gap-1">
                        <BsBuildingsFill className="w-4 h-4" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{job.description}</p>
                    <div className="flex items-center text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Apply for {selectedJob.title}</h2>
                <p className="text-gray-600">{selectedJob.location} • {selectedJob.type}</p>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
      
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
      
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <MdPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
      
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience
                </label>
                <input
                  type="text"
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <div>
                <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Letter
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                />
              </div>
      
              <div>
                <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Resume (URL)
                </label>
                <input
                  type="url"
                  id="resumeUrl"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
      
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}

export default App;
