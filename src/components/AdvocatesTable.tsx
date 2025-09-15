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
    <div style={{ 
      backgroundColor: "white",
      borderRadius: "8px",
      border: "1px solid #e9ecef",
      overflow: "hidden",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      overflowX: "auto"
    }}>
      <table style={{ 
        width: "100%", 
        minWidth: "800px",
        borderCollapse: "collapse",
        fontSize: "14px"
      }}>
        <thead>
          <tr style={{ backgroundColor: "#f8f9fa" }}>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              First Name
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              Last Name
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              City
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              Degree
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              Specialties
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              Experience
            </th>
            <th style={{ 
              padding: "16px 12px", 
              textAlign: "left", 
              fontWeight: "600",
              color: "#495057",
              borderBottom: "2px solid #dee2e6"
            }}>
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate, index) => {
            return (
              <tr 
                key={advocate.id}
                style={{ 
                  backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa",
                  borderBottom: "1px solid #e9ecef"
                }}
              >
                <td style={{ 
                  padding: "16px 12px", 
                  fontWeight: "500",
                  color: "#2c3e50"
                }}>
                  {advocate.firstName}
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  fontWeight: "500",
                  color: "#2c3e50"
                }}>
                  {advocate.lastName}
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  color: "#495057"
                }}>
                  {advocate.city}
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  color: "#495057"
                }}>
                  {advocate.degree}
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  color: "#495057"
                }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {advocate.specialties.map((s, index) => (
                      <span 
                        key={index}
                        style={{
                          backgroundColor: "#e3f2fd",
                          color: "#1565c0",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontSize: "12px",
                          fontWeight: "500"
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  color: "#495057"
                }}>
                  {advocate.yearsOfExperience} years
                </td>
                <td style={{ 
                  padding: "16px 12px", 
                  color: "#495057",
                  fontFamily: "monospace",
                  whiteSpace: "nowrap"
                }}>
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
