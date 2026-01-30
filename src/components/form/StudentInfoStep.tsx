export default function StudentInfoStep() {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">
        Student information
      </h3>

      {/* Full Name */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Full name
        </label>
        <input
          type="text"
          placeholder="Enter full name"
          className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Email address
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Phone number
        </label>
        <input
          type="tel"
          placeholder="+20 1xxxxxxxxx"
          className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Country */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          Country
        </label>
        <select className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none">
          <option>United Arab Emirates</option>
          <option>Egypt</option>
          <option>Austria</option>
          <option>United Kingdom</option>
        </select>
      </div>

      {/* City */}
      <div>
        <label className="mb-1 block text-sm text-gray-600">
          City
        </label>
        <input
          type="text"
          placeholder="Enter city"
          className="w-full rounded-md border border-gray-300 px-3 py-2  text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>
      {/* Address */}
<div>
  <label className="mb-1 block text-sm text-gray-600">
    Address
  </label>
  <input
    type="text"
    placeholder="Enter address"
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none"
  />
</div>

    </div>
  );
}
