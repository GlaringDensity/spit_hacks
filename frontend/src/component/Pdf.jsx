
import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import stamp from "../assets/stamp.png";

function Pdf() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    branch: "",
    year: "",
    toStation: "",
    fromStation: "",
    dob: "", // Added date of birth field
  });

  const [dateOption, setDateOption] = useState("1 month");
  const [uploadedImage, setUploadedImage] = useState(null);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Calculate dates
  const getCurrentDate = () => new Date().toLocaleDateString("en-GB");
  const getFromDate = () => {
    const monthsToAdd = dateOption === "1 month" ? 1 : 3;
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + monthsToAdd);
    return futureDate.toLocaleDateString("en-GB");
  };

  // Generate PDF
  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = 210; // A4 page width in mm
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("RailwaySlip.pdf");
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Railway Concession</h1>

      {/* Form Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "name", placeholder: "Enter your name" },
            { name: "phone", placeholder: "Enter your phone number", type: "tel" },
            { name: "address", placeholder: "Enter your address" },
            { name: "branch", placeholder: "Enter your branch" },
            { name: "year", placeholder: "Enter your year" },
            { name: "toStation", placeholder: "To (Station Name)" },
            { name: "fromStation", placeholder: "From (Station Name)" },
          ].map((input) => (
            <div key={input.name}>
              <label className="block text-sm font-medium text-gray-700">
                {input.placeholder}
              </label>
              <input
                type={input.type || "text"}
                name={input.name}
                placeholder={input.placeholder}
                value={formData[input.name]}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* Date of Birth Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration Option */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Concession Duration</label>
            <select
              value={dateOption}
              onChange={(e) => setDateOption(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="1 month">1 Month</option>
              <option value="3 months">3 Months</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload ID Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        </form>

        <button
          onClick={generatePDF}
          className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600"
        >
          Generate PDF
        </button>
      </div>

      {/* PDF Content Section */}
      <div
  id="pdf-content"
  className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full md:w-2/3 lg:w-1/2 relative border border-gray-300 flex flex-col items-center"
>
  <div className="flex flex-col items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800 text-center my-8">Railway Slip</h2>
    <img src={stamp} alt="Stamp" className="w-24 h-24 absolute top-4 right-4 object-cover rounded-lg" />
  </div>
  <table className="w-full border-collapse border border-gray-300 text-left">
    <tbody>
      {Object.keys(formData).map((key) => (
        <tr key={key} className="border-t border-gray-300">
          <th className="p-3 text-gray-800 font-semibold capitalize border-r border-gray-300">
            {key.replace(/([A-Z])/g, " $1")}:
          </th>
          <td className="p-3 text-gray-600">{formData[key]}</td>
        </tr>
      ))}
      <tr className="border-t border-gray-300">
        <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">Current Date:</th>
        <td className="p-3 text-gray-600">{getCurrentDate()}</td>
      </tr>
      <tr className="border-t border-gray-300">
        <th className="p-3 text-gray-800 font-semibold border-r border-gray-300">From Date:</th>
        <td className="p-3 text-gray-600">{getFromDate()}</td>
      </tr>
    </tbody>
  </table>
  {uploadedImage && (
    <div className="mt-6 w-full text-center">
      <h3 className="font-semibold text-gray-800 mb-4">Student ID:</h3>
      <img
        src={uploadedImage}
        alt="Uploaded"
        className="w-full max-w-xs h-auto object-cover rounded-lg mx-auto"
      />
    </div>
  )}
</div>

    </div>
  );
}

export default Pdf;