import { Advocate } from "../types";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export default function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  // Format phone number for display
  const formatPhoneNumber = (phoneNumber: number): string => {
    const phoneStr = phoneNumber.toString();
    // Format as (XXX) XXX-XXXX
    if (phoneStr.length === 10) {
      return `(${phoneStr.slice(0, 3)}) ${phoneStr.slice(3, 6)}-${phoneStr.slice(6)}`;
    }
    // Return as-is if not 10 digits
    return phoneStr;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              First Name
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              Last Name
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              City
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              Degree
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              Specialties
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              Experience
            </th>
            <th className="px-3 py-4 text-left font-semibold text-gray-600 border-b-2 border-gray-300">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => {
            return (
              <tr 
                key={advocate.id}
                className={`border-b border-gray-200 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <td className="px-3 py-4 font-medium text-gray-800">
                  {advocate.firstName}
                </td>
                <td className="px-3 py-4 font-medium text-gray-800">
                  {advocate.lastName}
                </td>
                <td className="px-3 py-4 text-gray-600">
                  {advocate.city}
                </td>
                <td className="px-3 py-4 text-gray-600">
                  {advocate.degree}
                </td>
                <td className="px-3 py-4 text-gray-600">
                  <div className="flex flex-wrap gap-1">
                    {advocate.specialties.map((s, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-4 text-gray-600">
                  {advocate.yearsOfExperience} years
                </td>
                <td className="px-3 py-4 text-gray-600 font-mono whitespace-nowrap">
                  {formatPhoneNumber(advocate.phoneNumber)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
