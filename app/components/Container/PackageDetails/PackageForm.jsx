import SingleSelectDropdown from "@/app/common/SingleSelectDropdown";
import { submitEnquiry } from "@/app/store/slice/enquirySlice";
import { getPackages } from "@/app/store/slice/packageSlice";
import { ChevronDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormState = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  numberOfPersons: "",
  date: "",
  plan: "",
  message: "",
};

const PackageForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.enquiry);
  const [form, setForm] = useState(initialFormState);
  const { packages } = useSelector((state) => state.packages);

  useEffect(() => {
    dispatch(getPackages());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: `${form.firstName} ${form.lastName}`.trim(),
      date: form.date,
      email: form.email,
      phone: form.mobile,
      numberOfPersons:
        form.numberOfPersons === "family" ? 4 : Number(form.numberOfPersons),
      packageId: form.plan,
      message: form.message,
    };
    setForm(initialFormState);
    dispatch(submitEnquiry(payload));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Enter Your First Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-none transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Enter Your Last Name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-none transition"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-none transition"
              required
            />
          </div>{" "}
          <div>
            <label className="block text-sm text-gray-500 mb-1">
              Travel Date
            </label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-500 mb-1">
            Mobile number
          </label>
          <input
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="+91"
            className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-none transition"
            required
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="relative">
            <label className="block text-sm text-gray-500 mb-1">Person</label>
            <select
              name="numberOfPersons"
              value={form.numberOfPersons}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 appearance-none  outline-none transition"
              required
            >
              <option value="">Select</option>
              <option value="1">1 Person</option>
              <option value="2">2 Persons</option>
              <option value="3">3 Persons</option>
              <option value="4">4 Persons</option>
              <option value="family">Family</option>
            </select>

            <ChevronDown
              size={18}
              className="absolute right-4 top-[42px] text-gray-500 pointer-events-none"
            />
          </div>
          <div className="relative">
            <SingleSelectDropdown
              label="Plan"
              options={packages}
              value={form.plan}
              labelKey="packageName"
              onChange={(id) => setForm((prev) => ({ ...prev, plan: id }))}
              placeholder="Select Plan"
              searchable
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Note</label>
          <textarea
            rows="4"
            name="message"
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-3  outline-none transition"
            placeholder="Enter your message"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 transition text-white font-semibold py-4 sm:py-5 rounded-full text-sm disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Claim Your Free Spot"}
        </button>
      </form>
    </>
  );
};

export default PackageForm;
